// As rotas são os caminhos de navegação, aonde nós acessamos as telas e abrimos no App, temos q abrir o login primeiro e dps home e outros!
// Nesse momento para não precisar ficar fazendo o login toda h, estamos direcionados para a Home page, essa pasta será atualizada antes da entrega final!
import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import AppStack from './AppStack'
import AuthStack from './AuthStack'
import notifee from '@notifee/react-native'

export default function Routes() {
    const { authData, userUid } = useContext(AuthContext)

    notifee.onForegroundEvent(async (event) => {
        console.log('Foreground Event')
        const userid = event.detail.notification.data.userid
        const messageid = event.detail.notification.data.messageid
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

    return (
        authData ? <AppStack /> : <AuthStack />
    )
}