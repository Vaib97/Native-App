import React,{PureComponent} from 'react';
import {StyleSheet, FlatList, Text, View, TouchableOpacity, Image} from 'react-native';


function Detail({route}) {
   const {image,suit,value}=route.params;
        return(
            <View style={{justifyContent:'center',alignItems:'center'}}>
           <Text style={styles.item}>{suit}</Text>
           <Text style={styles.item}>{value}</Text>
           <Image style={{width:'77%',height:'80%'}} source={{uri:image}} />
           </View>
        );
    
    
}

const styles=StyleSheet.create({
    item:{
        padding:16,
        marginTop:16,
        backgroundColor:'pink',
        borderColor:'#bbb',
        borderRadius:10,
        borderStyle:'dashed',
        borderWidth:1,
    }
});
export default Detail;