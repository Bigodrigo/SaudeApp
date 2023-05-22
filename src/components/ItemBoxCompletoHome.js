import { Box, Text, Center, Input, Icon, Flex, View, FlatList, ChevronRightIcon, Spinner, IconButton, } from 'native-base'

import { ItemsBox } from '../components/ItemsBox';
import { ServiceItems } from '../components/ServiceItems';

import React, { useEffect, useContext, useRef } from 'react'




export function ItemBoxCompletoHome(props) {
    const data = props.data;
    const title = props.title;
    const horizontal = props.horizontal;
    const w = props.w;
    const numColumns = props.numColumns;
    const columnWrapperStyle = props.columnWrapperStyle;
    const navigation = props.navigation
    const opacity1 = props.opacity1
    const opacity2 = props.opacity2
  

    
    return (
        <ItemsBox title={title} >
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
                        w={w}
                        />
                )}
                keyExtractor={(item, index) => index.toString()}
                horizontal={horizontal}
                numColumns={numColumns}
                columnWrapperStyle={columnWrapperStyle}
                showsHorizontalScrollIndicator={false}
            />
            <ChevronRightIcon  opacity={opacity1 ? opacity1 : 0  } style={{ position: 'absolute', alignSelf: 'flex-end', top: -20, right: 5 }} />
            <ChevronRightIcon opacity={opacity2 ? opacity2 : 0  } style={{ position: 'absolute', alignSelf: 'flex-end', top: -20, right: 0 }} />
        </ItemsBox>
    )
}