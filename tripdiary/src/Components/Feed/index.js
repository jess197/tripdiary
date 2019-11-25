import React, {Component} from 'react';
import firebase from '../conexaodb.js';
import {storage} from '../conexaodb.js';
import './feed.css'; 
import BarNav from '../navbar.js'; 
import Post from './post.js'; 
import Botao from '../botao.js';

class Feed extends Component{

  constructor(props){ 
    super(props);
    this.state = {
        user: null,
        nome: '',
        sobrenome:'',
        loading: true,
        lista: [],
        image: null,
        url: '',
        progress: 0
    }; 

    this.sair = this.sair.bind(this);
    // this.criarPost = this.criarPost.bind(this);
    this.handleUpload = this.handleUpload.bind(this); 
    this.handleChange = this.handleChange.bind(this);  

    firebase.auth().onAuthStateChanged((user) => {
        if(user){
          this.setState({user:user});
            firebase.database().ref('usuarios').child(user.uid).on('value', (snapshot) => {
            this.setState({loading:false, nome:snapshot.val().nome, sobrenome:snapshot.val().sobrenome})
            
          });
        }
      });

      // const postsRef = firebase.database().ref('posts');
      // const usersRef = firebase.database().ref('usuarios');
      // postsRef.on('value', snapshot => {
      //     let currentComponent = this;
      //     let posts = snapshot.val();
      //     let listapost = [];
      //     for (let post in posts) {
      //       usersRef.child(posts[post].usuId).once('value').then(function(snapshot) {
      //         const username = snapshot.val().nome;
      //         listapost.push({
      //             id: post,
      //             uid: posts[post].usuId,
      //             comment: posts[post].comment,
      //             usuNome: username
      //         });
      //         console.log(listapost)
      //         currentComponent.setState({
      //           lista: listapost
      //         });
      //       })
      //     }
      // });

      
      const postsRef = firebase.database().ref('posts');
      postsRef.on('value', snapshot => {
          let currentComponent = this;
          let posts = snapshot.val();
          let listapost = [];
          for (let post in posts) {
              const username = snapshot.val().nome;
              listapost.push({
                  id: post,
                  usuId: posts[post].usuId,
                  comment: posts[post].comment,
                  usuNome: posts[post].usuNome,
                  urlImg: posts[post].urlImg
              });
              currentComponent.setState({
                lista: listapost
              });
          }
      });

    }

  sair(e){
    firebase.auth().signOut();
    this.props.history.replace("../");  
    e.preventDefault(e);
  }

    handleChange = e => {
      if(e.target.files[0]){
          const image = e.target.files[0];
          this.setState(() => ({image}));
      }
  }

  handleUpload = () => {
    const {image} = this.state;
    const uploadTask =  storage.ref(`images/${image.name}`).put(image);

    uploadTask.on('state_changed',
    (snapshot) => {
       //progress function 
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
        this.setState({progress});
    },
    (error) => {
        // error function 
        console.log(error);
    },
    () => {
      // complete function 
      storage.ref('images').child(image.name).getDownloadURL().then(url => {
        console.log(url); 
        this.setState({url});

        let posts = firebase.database().ref('posts');
        let chave = posts.push().key; 
      
        console.log(this.state.url)
    
        posts.child(chave).child('comment').set( this.state.comment);
        posts.child(chave).child('usuId').set( this.state.user.uid);
        posts.child(chave).child('usuNome').set( this.state.nome);
        posts.child(chave).child('urlImg').set( this.state.url);
      })
    });

}


  render(){
    return(
      <div>
        <BarNav usuNome={this.state.nome} EventoClickBotao={this.sair} nomeBotao="Sair" nomeBotao2="Meu Perfil"></BarNav>
        <center>
          <div class="form-group">
          <link href="https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css" rel="stylesheet"/>
            <textarea class="inputPost"  placeholder="Para onde você foi ou quer viajar?" onChange={ (e)=> this.setState({comment:e.target.value})} />
            <br></br>
            <input type="file" onChange={this.handleChange}/>
            <Botao classe="btn btn-primary botaoPost" click={this.handleUpload} nome="Postar" ></Botao>
          </div>
        </center>
        {this.state.lista.map((child) => {
          return(
            <div>
              <center>
              <Post url={child.urlImg} user={child.usuNome} comment={child.comment}></Post>
              </center>
            </div>
          )
        })}
      </div>
    );
  }
}

export default Feed;