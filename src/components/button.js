import React from 'react';

const Button = (props) => {

	const {height, width} = props;

	return(
		<div id="button" style={{height: height ? height : '45px', width: width ? width : '150px'}}
		onClick={props.handler}>
			<span id="button_text">{props.name}</span>
		</div>
	);
}

export default Button;