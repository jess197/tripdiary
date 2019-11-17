import React, {Component} from 'react'; 
import {storage} from './conexaodb.js'; 
import firebase from  './conexaodb.js';


class ImageUpload extends Component {
    constructor(props){
        super(props); 
        this.state = {
            image: null,
            url: '',  
            progress: 0
        };
        
        this.handleChange = this.handleChange.bind(this); 
        this.handleUpload = this.handleUpload.bind(this); 

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

            let imagem = firebase.database().ref('images'); 
            let chave = imagem.push().key;
            imagem.child(chave).set({nomeImagem: this.state.url});
          })
        });

    }

    render(){
        return(
            <div>
              <progress value={this.state.progress} max="100"/>
              <br></br>
              <input type="file" onChange={this.handleChange}/>
              <button onClick={this.handleUpload}>Upload</button>
              <br></br>
              <img src={this.state.url} alt="Uploaded images" height="300" width="400"/>
            </div>
        );        
    }
 }

 export default ImageUpload; 