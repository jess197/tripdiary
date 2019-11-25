import React from 'react'; 
const Botao = (props) => {
	return(
		<button class={props.classe} onClick={props.click}>{props.nome}</button>
	);
}

export default Botao;