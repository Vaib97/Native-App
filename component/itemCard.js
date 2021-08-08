import React,{PureComponent} from 'react';
import {Platform, StyleSheet, FlatList, Text, View, TouchableOpacity, Image} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native'





function ItemCard ({item}) {
    const navigation = useNavigation(); 
    
    
        return(
            <TouchableOpacity style={{justifyContent:'center',alignItems:'center',margin:20}} onPress={() => navigation.navigate('Detail',item)}>
                <Image style={styles.img} source={{uri:item.image}} />
                <Text style={styles.item}>{item.suit}</Text>
            </TouchableOpacity>
        );
    
    
}

const styles=StyleSheet.create({
    item:{
        padding:16,
        borderColor:'#bbb',
        borderRadius:10,
        borderStyle:'dashed',
        borderWidth:1,
    },
    img:{
        flex:1,
        height:150,
        width:100,
        alignContent:'center'

    },
});
export default ItemCard;