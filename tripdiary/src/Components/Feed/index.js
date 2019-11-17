import React, {Component} from 'react';
import firebase from '../conexaodb.js';
import './feed.css'; 

class Feed extends Component{

  constructor(props){ 
    super(props);
    this.state = {
        user: null,
        nome: '',
        sobrenome:'',
        loading: true
    }; 

    this.sair = this.sair.bind(this);

    firebase.auth().onAuthStateChanged((user) => {
        if(user){
          this.setState({user:user});
            firebase.database().ref('usuarios').child(user.uid).on('value', (snapshot) => {
            this.setState({loading:false, nome:snapshot.val().nome, sobrenome:snapshot.val().sobrenome})
            
        });
        }
      });
  }

  sair(e){
    firebase.auth().signOut();
    this.props.history.replace("../");  
    e.preventDefault(e);
  }

  render(){

    return (
      <div>
          <link href="https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css" rel="stylesheet"/>
         <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="/"><i class="icon ion-md-paper-plane"></i> Trip Diary</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                  <li class="nav-item">
                      <div class="button-sair">
                      <button type="button" class="btn btn-primary" onClick={this.sair}>
                         Sair
                      </button>
                      </div>
                  </li>
              </ul>
          </div>
      </nav>
      </div>
    ); 
  }


}

export default Feed;