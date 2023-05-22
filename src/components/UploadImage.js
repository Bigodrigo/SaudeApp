import { View, Avatar} from 'native-base'
import { TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

export function UploadImage({ selectedImage, placeholderImageSource, onPress, ...rest }) {
  const imageSource =
    selectedImage !== null ? { uri: selectedImage } : {uri: placeholderImageSource}

  return (
    <View position="relative" overflow="hidden" {...rest}>
      <Avatar source={imageSource} size="lg"/>
      <TouchableOpacity
        onPress={onPress}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 1,
          paddingTop: 0
        }}
      >
        <Avatar.Badge bg="#DB4D37" size={6} style={{ marginBottom: 1, borderWidth: 0, alignItems: 'center', justifyContent: 'center' }}>
          <FontAwesome name="camera" size={11} color="white" position="absolute"/>
        </Avatar.Badge>
      </TouchableOpacity>
    </View>
  )
}