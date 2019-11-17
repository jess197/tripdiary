import React, {Component} from 'react';
import firebase from '../conexaodb.js';

class Feed extends Component{

  constructor(props){ 
    super(props);

    this.state = {
        user:null,
        nome: '',
        sobrenome:'',
        loading: true
    }; 

    firebase.auth().onAuthStateChanged((user) => {
        if(user){
          this.setState({user:user});
            firebase.database().ref('usuarios').child(user.uid).on('value', (snapshot) => {
            this.setState({loading:false, nome:snapshot.val().nome, sobrenome:snapshot.val().sobrenome})
            
        });
        }
      });
  }

  render(){

    return (
      <div>
        <h1>Burk teamo</h1>
      </div>
    ); 
  }


}

export default Feed;