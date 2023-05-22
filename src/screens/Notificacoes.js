import React, { useContext } from 'react'
import { Notification } from '../components/Notification';
import { FlatList, View, Text, ScrollView } from 'native-base'
import { AuthContext } from '../contexts/AuthContext.js';
import notifications from '../JSON/notifications.json'
import { NotificationStatic } from '../components/NotificationStatic';

export default function Notificacoes() {
    const {notificacoes} = useContext(AuthContext);
    
    return (
        <>
            <View backgroundColor='#DB4D37' height={55} alignItems='center' paddingY={2} flexDirection='row' borderBottomRadius={15} justifyContent='center'>
                <Text fontSize={20} color='white'>Notificações</Text>
            </View>
            <View bg="white" w="100%" flex={1} alignItems="center">
                {notificacoes.length > 0 ? 
                <ScrollView
                width="100%"
                contentContainerStyle={{
                    alignItems: 'center',
                }}
                showsVerticalScrollIndicator={false}>
                {notificacoes.map((item)=> (
                    <Notification key={item.id} data={item} />
                ))} 
                </ScrollView>
                : 
                <FlatList
                width="100%"
                contentContainerStyle={{
                    alignItems: 'center',
                }}
                data={notifications}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <NotificationStatic key={item._id} title={item.title} description={item.description} />
                )} />
                }
                
            </View>
        </>
    )
}