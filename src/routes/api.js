//Esta página é importante em um projeto que tenha autenticação por webtoken
//Neste protótipo ela não é utilizada, mas pode ser aproveitada em outros projetos

import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as RootNavigation from './RootNavigation';

export async function getApiTokenStorage() {
    try {
      const data = await AsyncStorage.getItem('@apitoken:key');
      return data;
    } catch (error) {
      console.error(error);
      throw error; // Rejeita a promessa novamente para que possa ser tratada posteriormente
    }
  }
  

export async function getApiToken() {
    try {
        //let reqdata = Informação Sigilosa
        const response = await axios({
            method: 'POST',
            //url: Informação Sigilosa
            data: (reqdata),
        })
        return response.data
    } catch (error) {
        console.error(error)
        return Promise.reject(error)
    }
}

const apiFetch = axios.create({})

apiFetch.interceptors.request.use(async (config) => {
    const token = await getApiTokenStorage().catch((e) => console.error(e))
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

apiFetch.interceptors.response.use(
    response => {
        return response
    }, error => {
        if (error.response.status = 401) {
            RootNavigation.navigate('Error401')
        } else if (error.response.status = 403) {
            RootNavigation.navigate('Error401')
        }
        return Promise.reject(error)
    })




