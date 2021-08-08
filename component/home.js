import React, { Component } from 'react';
import {StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Text, View,Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Header from '../component/header';
import ItemCard from '../component/itemCard';


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      searchText:'',
      filteredData: [],
      fetching_Status: false,
    };
    this.page=0
  }
  componentDidMount() {
    this.page = this.page + 10;
    return fetch('https://deckofcardsapi.com/api/deck/new/draw/?count='+this.page)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            data: responseJson.cards
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  fetch_more_data_from_server =()=>
  {        
      this.page = this.page + 10;
 
      this.setState({ fetching_Status: true }, () =>
      {
              fetch('https://deckofcardsapi.com/api/deck/new/draw/?count='+this.page)
              .then((response) => response.json())
              .then((responseJson) =>
              {
                  this.setState({ data: [ ...this.state.data, ...responseJson.cards ], fetching_Status: false });
              })
              .catch((error) =>
              {
                  console.error(error);
              });
         
      });
  }
  search = (searchText) => {
    this.setState({searchText: searchText});
  
    let filteredData = this.state.data.filter(function (item) {
      return item.suit.includes(searchText);
    });
  
    this.setState({filteredData: filteredData});
  };
  
  FlatListItemSeparator =()=> {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  Render_Footer=()=>
  {
    return (
        <View style = { styles.footerStyle }>
 
            <TouchableOpacity 
                activeOpacity = { 0.7 } 
                style = { styles.TouchableOpacity_style }
                onPress = { this.fetch_more_data_from_server } 
                >
 
                <Text style = { styles.TouchableOpacity_Inside_Text }>Load More Data From Server</Text>
                {
                    ( this.state.fetching_Status )
                    ?
                        <ActivityIndicator color = "#fff" style = {{ marginLeft: 6 }} />
                    :
                        null
                }
 
            </TouchableOpacity> 
 
        </View>
    )
  }
  
  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={styles.container}>
          <Header/>
        <View style={styles.content}>
        <SearchBar
                round={true}
                lightTheme={true}
                placeholder="Search..."
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this.search}
                value={this.state.searchText}
           />
          <View style={styles.list} >
         {isLoading ? <ActivityIndicator/> : (
         
          
           <FlatList 
            data={this.state.searchText!=='' ? this.state.filteredData : this.state.data}
            keyExtractor={(item)=>item.code.toString() + new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString()}
            ItemSeparatorComponent = {this.FlatListItemSeparator}
            renderItem={({ item }) => (
                  <ItemCard item={item}/>
            )}
            ListFooterComponent = { this.Render_Footer }
           />
         
       
        
      )}
         </View>
       </View>
      </View>
     
    );
  }
};
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
  },
  content:{
    padding:40,
  },
  lsit:{
    flex:1,
    margin:20,
  },
  MainContainer:
  {
    flex: 1,
    justifyContent: 'center',
    margin: 5,
    paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
  },
 
  footerStyle:
  {
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderTopColor: '#009688',
    marginBottom:200,
  },
 
  TouchableOpacity_style:
  {
    padding: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F44336',
    borderRadius: 5,
  },
 
  TouchableOpacity_Inside_Text:
  {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18
  },
 
  flatList_items:
  {
    fontSize: 20,
    color: '#000',
    padding: 10
  }
});