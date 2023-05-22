import { Avatar } from 'native-base';

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
    const imageSource = selectedImage !== null ? { uri: selectedImage } : placeholderImageSource; 
  
    return <Avatar source={imageSource}  />;
  }