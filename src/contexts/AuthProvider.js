// O Context consegue manter as informações acessíveis em toda a aplicação, n é necessário 2 páginas como Context e Provider!!
// Podemos juntar em uma página ou uma pasta q acesse as infos do usuário!!
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState } from "react"
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState()
    const [userUid, setUserUid] = useState()
    const [userNome, setUserNome] = useState()
    const [userEmail, setUserEmail] = useState()
    const [sexo, setSexo] = useState()
    const [empresa, setEmpresa] = useState()
    const [telefone, setTelefone] = useState()
    const [endereço, setEndereço] = useState()
    const [cep, setCep] = useState()
    const [userMatricula, setUserMatricula] = useState()
    const [userTelefone, setUserTelefone] = useState()
    const [apitoken, setApitoken] = useState()
    const [familia, setFamilia] = useState([]);
    const [notificacoes, setNotificacoes] = useState([]);

    async function deleteApiTokenStorage() {
        await AsyncStorage.removeItem('@apitoken:key').catch(console.error)
    }

    function logout() {
        setAuthData(false)
        // deleteApiTokenStorage().then(() => {
        //     setAuthData(false)
        // }).catch((e) => {
        //     console.error(e)
        // })
    }

    return (
        <AuthContext.Provider
            value={{
                authData, setAuthData,
                userUid, setUserUid,
                userNome, setUserNome,
                userEmail, setUserEmail,
                sexo, setSexo,
                empresa, setEmpresa,
                telefone, setTelefone,
                endereço, setEndereço,
                cep, setCep,
                userMatricula, setUserMatricula,
                userTelefone, setUserTelefone,
                apitoken, setApitoken,
                familia, setFamilia,
                notificacoes, setNotificacoes,
                logout,            
            }}
        >
            {children}
        </AuthContext.Provider >
    )
}