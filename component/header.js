import React from 'react';
import {StyleSheet, FlatList, Text, View} from 'react-native';

export default function Header(){
    return (
        <View style={styles.header}>
            <Text style={styles.text}>My App</Text>
        </View>
    )
}
const styles=StyleSheet.create({
    header:{
        height:80,
        padding:30,
        backgroundColor:'coral',
    },
    text:{
        textAlign:'center',
        color:'#fff',
        fontSize:20,
        fontWeight:'bold',
    },
});