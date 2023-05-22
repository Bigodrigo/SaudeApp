import { FlatList, ChevronRightIcon } from 'native-base'
import { ItemsBox } from './ItemsBox';
import { ServiceItems } from '../components/ServiceItems';
import { useNavigation } from '@react-navigation/native';

export default function FlatListItemsBox( props) {
    const title = props.title
    const data = props.data
    const horizontal = props.horizontal
    const numColumns = props.numColumns
    const opacity1 = props.opacity1
    const opacity2 = props.opacity2
    const columnWrapperStyle = props.columnWrapperStyle
    const height = props.height
    const borderRadius = props.borderRadius
    const navigation = useNavigation();

    return(
    <ItemsBox title={title} height={height} borderRadius={borderRadius}>
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <ServiceItems
                    title={item.name}
                    iconFamily={item.iconFamily}
                    iconName={item.icon}
                    navigation={navigation}
                    navlink={item.navlink}
                    iconSize={item.iconSize}
                    headingSize={item.headingSize}
                    aspectRatioValue={item.aspectRatio}
                />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal={horizontal}
            numColumns={numColumns}
            columnWrapperStyle={columnWrapperStyle}
            showsHorizontalScrollIndicator={false}
        />
        <ChevronRightIcon opacity={opacity1} style={{ position: 'absolute', alignSelf: 'flex-end', top: -20, right: 5 }} />
        <ChevronRightIcon opacity={opacity2} style={{ position: 'absolute', alignSelf: 'flex-end', top: -20, right: 0 }} />
    </ItemsBox>
    )
}
