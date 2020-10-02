import React from 'react';
import { StyleSheet, Text,
         View,TextInput,TouchableOpacity,
        KeyboardAvoidingView,FlatList, Alert,
    ListItem} from 'react-native';
import * as firebase from 'firebase';
import db from '../config';

class ExchangeScreen extends React.Component{
    constructor(){
        super();
        this.state={
           itemName:'',
           description:'',
        }
    }
    createUniqueId(){
        return Math.random().toString(36).substring(7);
      }

    
   addItem=(itemName,description)=>{
    var username = this.state.username
    db.collection('exchange_requests').add({
        "username": userName,
        "itemName": itemName,
        "description": description,
        

    })
    this.setState({
        itemName : '',
        description : ''
    })
    return Alert.alert('item ready to sell','',
    [
        {text : 'ok', onPress: ()=>{this.props.navigation.navigate('homeScreen')
    }}
    ]
    );
   }
   addBarters(){
    db.collection('users').where('email_id','==',this.state.recieverId).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        this.setState({
          exchangerName    : doc.data().first_name,
          exchangerContact : doc.data().contact,
          exchangerAddress : doc.data().address,
        })
      })
    });

    db.collection('requested_books').where('request_id','==',this.state.requestId).get()
    .then(snapshot=>{
      snapshot.forEach(doc => {
        this.setState({recieverRequestDocId:doc.id})
     })
  })}

  addNotification=()=>{
    var message = this.state.userName + " has shown interest in exchanging the item"
    db.collection("all_notifications").add({
      "targeted_user_id"    : this.state.recieverId,
      "donor_id"            : this.state.userId,
      "request_id"          : this.state.requestId,
      "item_name"           : this.state.itemName,
      "date"                : firebase.firestore.FieldValue.serverTimestamp(),
      "notification_status" : "unread",
      "message"             : message
    })
  }



   renderItem=({item,i})=>{
return(
    <ListItem>
        key={i}
        title={item.item_name}
        subtitle={item.description}
        rightElement={
            <TouchableOpacity onPress={()=>{this.addBarters(),this.addNotifications()}}><Text>exchange</Text></TouchableOpacity>
        }
    </ListItem>
)
   }

    render(){
        return(
            <View>
                <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addItem(this.state.itemName,this.state.description),this.createUniqueId()}}>
                    <Text style={styles.text}>add item </Text>
                </TouchableOpacity>

                <FlatList>
                KeyExtractor={this.KeyExtractor}
                data={this.state.all_Requests}
                renderItem ={ this.renderItem}
                </FlatList>
                </View>
        );
    }
}
const styles=StyleSheet.create({
    Button:{
        width:100,
        height:50,
        alignSelf:'center',
        marginTop:10
    },
   
    text:{
        fontSize:18,
        fontStyle:'italic',
        fontWeight:'bold'
       
    }
})
export default ExchangeScreen;
