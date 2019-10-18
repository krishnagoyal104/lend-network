import React from 'react';
import {Spin, Icon} from 'antd';

const Loader = (props) => {

	const antIcon = <Icon type="sync" style={{ fontSize: props.size ? props.size : 60 }} spin />;

	return(
		<div id="loader" style={props.height && {height: '100%'}}>
			<Spin indicator={antIcon} />
		</div>
	);

}

export default Loader;