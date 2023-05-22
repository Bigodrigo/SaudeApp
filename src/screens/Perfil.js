import React, { useContext, useState, useEffect } from 'react'
import { Button, Icon, Box, Text, FlatList, View, Actionsheet, useDisclose, ScrollView } from 'native-base';
import { AuthContext } from '../contexts/AuthContext';
import Users from '../JSON/users.json'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserData } from '../components/UserData';
import { UserPlanData } from '../components/UserPlanData';
import { formataCartao, formataNome, formataNomeCartao } from '../helpers/utils';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContext } from '@react-navigation/native';
import { UploadImage } from '../components/UploadImage';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import firestore from "@react-native-firebase/firestore";
import { useRoute } from "@react-navigation/native";


export default function Perfil() {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();

  const navigation = useContext(NavigationContext);
  const cartao = '12.34567890.12.3' //formataCartao(userMatricula, '##.########.##.#')
  const { logout, userNome, userEmail, sexo, telefone, endereço, cep, setUserMatricula, familia, setFamilia, setSexo, setEmpresa, setTelefone, setEndereço, setCep} = useContext(AuthContext);

  /////////////// SELECIONAR UMA IMAGEM //////////////////////////
  const [showImageSelectionOptions, setShowImageSelectionOptions] =
    useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageFirebaseCloudName, setImageFirebaseCloudName] = useState('')
  const [imageFirebaseDownloadUrl, setImageFirebaseDownloadUrl] = useState('')
  const pickImageFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1
    })
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      setShowImageSelectionOptions(false)
      console.log(result.assets[0])
      uploadImage()
    }
  }
  const pickImageFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1
    })
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      setShowImageSelectionOptions(false)
      console.log(result.assets[0].uri)
      uploadImage()
    }
  }
  const pickImage = async () => {
    setShowImageSelectionOptions(true)
  }
  const cancelImageSelection = async () => {
    setShowImageSelectionOptions(false)
  }

  /////////////////// FAZER UPLOAD DA IMAGEM/////////////////////
  const uploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onload = function () {
        resolve(xhr.response)
      }
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'))
      }
      xhr.responseType = 'blob'
      xhr.open('GET', selectedImage, true)
      xhr.send(null)
    })
    setImageFirebaseCloudName(selectedImage.split('/')[11])
    const storageRef = ref(storage, `avatars/${imageFirebaseCloudName}`)
    const uploadTask = uploadBytesResumable(storageRef, blob, {
      contentType: 'image/png'
    })
    uploadTask.on(
      'state_changed',
      snapshot => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
        }
      },
      error => {
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break
          case 'storage/canceled':
            // User canceled the upload
            break
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setImageFirebaseDownloadUrl(downloadURL)
          console.log('File available at', downloadURL, imageFirebaseCloudName)
        })
      }
    )
  }
  //////////////////////////////////////////////////////////////
  const
    placeholderImageSource =
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=8'

  return (
    <Box>
      <View backgroundColor='#DB4D37' height={55} alignItems='center' paddingY={2} flexDirection='row' borderBottomRadius={15} justifyContent='center'>
        <Text fontSize={20} color='white'>Perfil</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        w="100%"
        h="100%"
        p={4}
      >
        <Box
          flexDirection="row"
          w="97%"
          h="10%"
          alignSelf="center"
          shadow={3}
          bg="#fff"
          borderRadius={50}
          p="3"
          alignItems="center"
          mt={3}
          mb={3}
        >
          {/*  /////////////////////////////////////////// */}
          <UploadImage
            selectedImage={selectedImage}
            placeholderImageSource={placeholderImageSource}
            marginRight={5}
            onPress={() => {
              onOpen();
              console.log('abriu modal')
            }}
          />
          {/*  /////////////////////////////////////////// */}
          
          <Box flexDirection="column">
            <Text fontSize={18} color="gray.600" fontWeight="bold">{userNome}</Text>
            <Text fontSize={14} color="gray.600" fontWeight="bold">{cartao}</Text>
          </Box>

          {/* Modal das opçoes!! */}
          <Actionsheet isOpen={isOpen} onClose={onClose} >
            <Actionsheet.Content>
              <Actionsheet.Item  onPress={pickImageFromLibrary} leftIcon={<Icon mt={1}  as={<MaterialCommunityIcons  name="image-album" />}/>}> Selecionar imagem da Galeria</Actionsheet.Item>
              <Actionsheet.Item onPress={pickImageFromCamera} leftIcon={<Icon mt={1} as={<MaterialCommunityIcons name="camera" />}/>}>Abrir a câmera</Actionsheet.Item>
              <Actionsheet.Item leftIcon={<Icon mt={1} as={<MaterialCommunityIcons name="book-cancel" />}/>} onPress={() => {
                cancelImageSelection();
                onClose();
              }}>
              Cancelar</Actionsheet.Item>
            </Actionsheet.Content>
          </Actionsheet>

        </Box>

        <Box flexDirection="column" alignItems='center' bgColor='white' shadow={5} m={1} borderRadius={25} >
          <FlatList
            data={Users}
            vertical
            keyExtractor={(item, index) => index.toString()}
            listKey={(item) => item.toString()}
            renderItem={({ item }) => (
              <UserData
                title={'Dados Cadastrais:'}
                email={userEmail}
                gender={sexo}
                company={item.personalData.company}
                phone={telefone}
                adress={endereço}
                zipcode={cep}
              />
            )}
            width='100%'
          />
          <Button
            m={2} rounded={100} px={4} bg="#DB4D37" leftIcon={<Icon as={Ionicons} name="create-outline" size={18} />} width='35%' shadow={2} alignSelf="flex-end"
            _pressed={{ backgroundColor: '#DB4D37', opacity: 0.5 }}
            onPress={() => navigation.navigate('EditarDados')}
          >
            <Text color="white" fontWeight="bold">Editar dados</Text>
          </Button>
        </Box>
        <Box mt={5} mb={5} flexDirection="column" alignItems='center' bgColor='white' shadow={5} m={1} borderRadius={25} >
          <FlatList
            data={Users}
            vertical
            keyExtractor={(item, index) => index.toString()}
            listKey={(item) => item.toString()}
            renderItem={({ item }) => (
              <UserPlanData
                title={'Dados do Plano:'}
                title2={'Grupo Familiar'}
                planclass={item.planData.planclass}
                category={item.planData.category}
                carencia={item.planData.carencia}
                familyGroup={item.familyGroup}
              />
            )}
            width='100%'
          />
        </Box>

        <Button w='97%' alignSelf='center' mt='3' bg="#DB4D37" mb='20' borderRadius={15} shadow={2} _pressed={{ backgroundColor: '#DB4D37', opacity: 0.5 }} onPress={() => logout()} leftIcon={<Icon as={Ionicons} name="exit" size="lg" />}>
          Sair
        </Button>
      </ScrollView>

    </Box>
  )
}