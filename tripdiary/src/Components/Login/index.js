import React, {Component} from 'react';
import './login.css';
import ScriptTag from 'react-script-tag';
import firebase from '../conexaodb.js'; 

class Login extends Component { 

  constructor(props) {
    super(props);
    this.state = {
      user: null, 
      nome:'',
      sobrenome:'',
      email: '',
      senha: '',
      emailCadastro: '',
      senhaCadastro: '',
      loading:false,
      btnPressionado: ''
    };
     
  this.logar = this.logar.bind(this);
  this.cadastrar = this.cadastrar.bind(this); 

  firebase.auth().signOut();

  firebase.auth().onAuthStateChanged((user) => {
    if(user && this.state.btnPressionado === 'cadastro'){

        console.log('ENTREI AQUI NESSA BOST');
        console.log(this.state.btnPressionado);
        console.log(this.state.nome)
        console.log(this.state.sobrenome)

        firebase.database().ref('usuarios').child(user.uid).set({
            nome: this.state.nome,
            sobrenome: this.state.sobrenome
        });
        
        this.setState({user:user});
            firebase.database().ref('usuarios').child(user.uid).on('value', (snapshot) => {
            this.setState({nome:snapshot.val().nome, sobrenome:snapshot.val().sobrenome})
        });
    }
  });

}
  
cadastrar(e){
    this.state.btnPressionado = 'cadastro';

    firebase.auth().createUserWithEmailAndPassword(this.state.emailCadastro, this.state.senhaCadastro)
    .then((success)=>{
        alert('Usuário cadastrado com sucesso!');
    })
    .catch((error) => {
      if(error.code === 'auth/invalid-email'){
        alert('Email inválido!');
      }
     else if(error.code === 'auth/weak-password'){
          alert('Senha fraca!'); 
      }
      else if(error.code === 'auth/email-already-in-use'){
          alert('Email já cadastrado'); 
      }
      else{
          alert(error.code);
      }

      
    })
    e.preventDefault();
}


logar(e){

    this.state.btnPressionado = 'logar';

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha)
    .then(()=>{
        this.props.history.replace("../feed");
    })
    .catch((error) =>  {
      if(error.code === 'auth/wrong-password'){
          alert('Senha Incorreta'); 
      }
      else if(error.code === 'auth/invalid-email'){
        alert('Email inválido!');
      }
      else{
          alert(error.code);
      }
    })
 
    e.preventDefault();
    
}

 
  render() {
    return (
      <center>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="/"><i class="icon ion-md-paper-plane"></i> Trip Diary</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                  <li class="nav-item">
                      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                          Cadastre-se
                      </button>
                      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered" role="document">
                              <div class="modal-content">
                                  <div class="modal-header">
                                      <h5 class="modal-title" id="exampleModalCenterTitle">Cadastre-se</h5>
                                      <button type="button" class="close" data-dismiss="modal" aria-label="close">
                                          <span aria-hidden="true">&times;</span>
                                      </button>
                                  </div>
                                  <div class="modal-body">
                                      <form class="px-4 py-3">
                                          <div class="form-group row">
                                              <label for="nome" class="col-sm-2 col-form-label">Nome</label>
                                              <div class="col-sm-10">
                                                  <input type="text" class="form-control" id="nome" placeholder="Digite seu nome..." onChange={(e)=> this.setState({nome:e.target.value})} />
                                              </div>
                                          </div>
                                          <div class="form-group row">
                                              <label for="sobrenome" class="col-sm-2 col-form-label">Sobrenome</label>
                                              <div class="col-sm-10">
                                                  <input type="text" class="form-control" id="sobrenome" placeholder="Digite seu sobrenome..." onChange={(e)=> this.setState({sobrenome:e.target.value})} />
                                              </div>
                                          </div>
                                          <div class="form-group row">
                                              <label for="emailCadastro" class="col-sm-2 col-form-label">Email</label>
                                              <div class="col-sm-10">
                                                  <input type="email" class="form-control" id="emailCadastro" placeholder="email@email.com" onChange={(e)=> this.setState({emailCadastro:e.target.value})} />
                                              </div>
                                          </div>
                                          <div class="form-group row">
                                              <label for="senhaCadastro" class="col-sm-2 col-form-label">Senha</label>
                                              <div class="col-sm-10">
                                                  <input type="password" class="form-control" id="senhaCadastro" placeholder="Nova senha" onChange={(e)=> this.setState({senhaCadastro:e.target.value})}/>
                                              </div>
                                          </div>
                                      </form>
                                  </div>
                                  <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                      <button type="button" class="btn btn-primary" onClick={this.cadastrar}>Cadastre-se</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </li>
              </ul>
          </div>
      </nav>
      <div className="Login">
          <div class="card bg-light cardLogin">
              <form class="form">
               <link href="https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css" rel="stylesheet"/>
                  <div class="illustration"><i class="icon ion-md-paper-plane"></i></div>
                  <input type="email" class="form-control form-control-sm col-md-8" placeholder="E-mail" onChange={ (e)=> this.setState({email:e.target.value}) }/>
                  <br></br>
                  <input type="password" class="form-control form-control-sm col-md-8" placeholder="Senha" onChange={ (e)=> this.setState({senha:e.target.value}) }/>
                  <br></br>
                  <br></br>
                  <button type="button" class="btn btn-primary" onClick={this.logar}>Login</button>
              </form>
          </div>
          <ScriptTag isHydrating={true} type="text/javascript" src="login.js" />
      </div>
  </center>
    );

  }
}
export default Login;

