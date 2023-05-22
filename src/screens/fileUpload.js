//Aqui parece um possível componente, talvez retirar da pasta de screens
import { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Alert } from "react-native";
import { storage } from '../../firebase';



export const UploadFile = (blobFile, fileName , isUploadCompleted) => {
    
    if (!blobFile) return;
    
    
    const storageRef = ref(storage, `myDocs/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, blobFile);
    
    uploadTask.on(        
        "state_changed", null ,
        (error) => console.log(error),
        () => {            
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                
                console.log("File available at", downloadURL);
                Alert.alert("Informações enviadas")
                isUploadCompleted(true)
                
                return downloadURL
                
            });

        }
    );

}