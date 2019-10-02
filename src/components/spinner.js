import React from 'react';
import {PulseLoader} from 'react-spinners';

const Spinner = () => {
	return(
			<PulseLoader
	      className="spinner"
	      widthUnit={"20px"}
	      sizeUnit={"1px"}
	      size={1}
	      color={'#007ee5'}
	      loading={true}
	    />
	);
}

export default Spinner;