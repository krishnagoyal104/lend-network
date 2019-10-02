import React from 'react';
import { Result, Button } from 'antd';

const ErrorView = (props) => {

	return(
    <div id="error_view">
  		<Result
      status="warning"
      title="You encountered an error."
      extra={
        <Button type="primary" key="console" onClick={() => window.location.reload()}>
          Reload
        </Button>
      }
    />
  </div>
	);
}

export default ErrorView;