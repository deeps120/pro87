import React from 'react';
import { Text, View, Alert ,TextInput,TouchableOpacity} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class SettingsScreen extends React.Component{
    constructor(){
        super()
        this.state={
            firstName:'',
            lastName:'',
            contacts:'',
            address:'',
            emailId:'',
            docId:'',
            userId          : firebase.auth().currentUser.email,
            userName        : ""
        }
    }
      
       

    getUserDetails=()=>{
        var user = firebase.auth().currentUser;
        var email = user.email;
        db.collection('users').where('email_id','==',email).get()
        .then(snapshot=>{
            var data= doc.data()
            this.setState({
                emailId:data.email_id ,
                firstName:data.first_name,
                lastName:data.last_name,
                contact:data.contact,
                address:data.address,
                docId:doc.id
            })
        })
    }
    updateUserDetails=()=>{
        db.collection('users').doc(this.state.docId)
        .update({
            'first_name':this.state.firstName,
            'last_name':this.state.lastName,
            'contacts':this.state.contacts,
            'address':this.state.address
        })
        Alert.alert('profile updated!!')
    }
    componentDidMount(){
        this.getUserDetails()
    }
    render(){
        <MyHeader title='settings' navigation={this.props.navigation}/>
        return(
            <View>
                <TextInput
                placeholder={'first name'}
                maxLength={8}
                onChangeText={(text)=>{
                    this.setState({
                        firstName:text
                    })
                }}
                value={this.state.firstName}
                >
                    
                </TextInput>
                <TextInput
                placeholder={'last name'}
                maxLength={8}
                onChangeText={(text)=>{
                    this.setState({
                        lastName:text
                    })
                }}
                value={this.state.lastName}
                >
                    
                </TextInput>
                <TextInput
                placeholder={'contact'}
                maxLength={10}
                keyboardType={'numeric'}
                onChangeText={(text)=>{
                    this.setState({
                        contact:text
                    })
                }}
                value={this.state.contact}
                >
                    
                </TextInput>
                <TextInput
                placeholder={'address'}
                multiline={true}
                onChangeText={(text)=>{
                    this.setState({
                        address:text
                    })
                }}
                value={this.state.address}
                >
                </TextInput>
                <TouchableOpacity 
                onPress={()=>{this.updateUserDetails()}}>
                    <Text>
                        save
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}