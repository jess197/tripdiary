import React from 'react'; 
import Botao from './botao.js';
import './navbar.css';


const BarNav = (props) => {
    return (
        <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="/">  
                <i class="icon ion-md-paper-plane"></i> Trip Diary
            </a>
            <span class="navbar-text">{props.usuNome}</span>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <div>
                        <Botao classe="btn btn-primary botaoSair" click={props.EventoClickBotao} nome={props.nomeBotao}></Botao>
                        <Botao classe="btn btn-outline-primary botaoPerfil" click={props.EventoClickBotao} nome={props.nomeBotao2}></Botao>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    );
}
export default BarNav;