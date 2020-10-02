import React from 'react';
import { StyleSheet, Text, View,ScrollView,TouchableOpacity } from 'react-native';
import db from '../config';

export default class MyBartersScreen extends React.Component{
    constructor(){
        super()
        this.state = {
          BarterId : firebase.auth().currentUser.email,
          donorName : "",
          IsBarterRequestActive:"",
          allBarters:[],
          itemName:"",
          requesteditemName: "",
          itemStatus:"",
          userDocId: '',
          docId :''
        }
    }
    allBarters =()=>{
        this.requestRef = db.collection("all_barters").where("barter_id" ,'==', this.state.barterId)
        .onSnapshot((snapshot)=>{
          var allBarters = []
          snapshot.docs.map((doc) =>{
            var barter = doc.data()
            barter["doc_id"] = doc.id
            allbarters.push(barter)
          });
          this.setState({
            allBarters : allBarters
          });
        })
      }

      getIsBarterRequestActive(){
        db.collection('users')
        .where('email_id','==',this.state.userId)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.setState({
              IsBarterRequestActive:doc.data().IsBarterRequestActive,
              userDocId : doc.id
            })
          })
        })
      }
      
      getBarterRequest =()=>{
        
      var barterRequest =  db.collection('requested_items')
        .where('user_id','==',this.state.userId)
        .get()
        .then((snapshot)=>{
          snapshot.forEach((doc)=>{
            if(doc.data().item_status !== "received"){
              this.setState({
                exchangeId : doc.data().exchange_id,
                requesteditemName: doc.data().item_name,
                itemStatus:doc.data().item_status,
                docId     : doc.id
              })
            }
          })
      })}

      updateBookRequestStatus=()=>{
        db.collection('requested_items').doc(this.state.docId)
        .update({
          item_status : 'recieved'
        })
      
       
        db.collection('users').where('email_id','==',this.state.userId).get()
        .then((snapshot)=>{
          snapshot.forEach((doc) => {
            
            db.collection('users').doc(doc.id).update({
              IsBarterRequestActive: false
            })
          })
        })
      
      }
      
    render(){
      if(this.state.IsBarterRequestActive === true){
        return(
  
          <View>
            <View >
            <Text>item Name</Text>
            <Text>{this.state.requestedItemName}</Text>
            </View>
            <View >
            <Text> item Status </Text>
  
            <Text>{this.state.itemStatus}</Text>
            </View>
  
            <TouchableOpacity 
            onPress={()=>{
              this.sendNotification()
              this.updateBarterRequestStatus();
            }}>
            <Text>I recieved the item </Text>
            </TouchableOpacity>
          </View>
        )
      }
      else
      {
      return(
        // Form screen
          <View style={{flex:1}}>
            <MyHeader title="Request item" navigation ={this.props.navigation}/>
  
            <ScrollView>
              <KeyboardAvoidingView >
                <TextInput
                 
                  placeholder={"enter item name"}
                  onChangeText={(text)=>{
                      this.setState({
                          itemName:text
                      })
                  }}
                  value={this.state.itemName}
                />

                <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{ this.addRequest(this.state.itemName);
                  }}
                  >
                  <Text>Request</Text>
                </TouchableOpacity>
  
              </KeyboardAvoidingView>
              </ScrollView>
          </View>
      )
    }
  }
  }
         



    
