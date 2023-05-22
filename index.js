import { registerRootComponent } from 'expo';

import App from './App';
import notifee from '@notifee/react-native'
import messaging from '@react-native-firebase/messaging'

async function onMessageReceived(message) {
    notifee.displayNotification(JSON.parse(message.data.notifee))
}

messaging().onMessage(onMessageReceived)
messaging().setBackgroundMessageHandler(onMessageReceived)

notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
}).then(() => {
    console.log('Canal criado com sucesso.')
}).catch((error) => {
    console.error(error)
})

notifee.onBackgroundEvent(async (event) => {
    console.log('Background Event')
    const userid = event.detail.notification.data.userid
    const messageid = event.detail.notification.data.messageid
    //Importante! Aqui temos um problema! Quando acontece no background, talvez precise do APK instalado!!!
    if (event.type == 2 && event.detail.notification.android.actions[0].pressAction.id === 'reply') {
        fetch(`https://saude-api.vercel.app/api/update-notification/${userid}`, {
            method: 'PUT',
            body: JSON.stringify({
                resposta: event.detail.input,
                messageid: messageid,
                userid: userid
            }),
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            }
        }).then(response => {
            console.log('Resposta enviada para API com sucesso!')
        }).catch((error) => {
            console.error(error)
        })
    }
})

registerRootComponent(App);