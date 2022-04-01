import React from 'react'

function Alert(props) {
  if ( props.status !== -1 ){
    const a = ['Incorrect password or Username','Route not allowed','Path doesn\'t exist'];
    return (
      <div className="alert alert-danger pt-2 text-center" role="alert">
        {props.status}
      </div>  
    )
  }
  else {
    return(
      <noscript></noscript>
    );
  }
  Alert.defaultProps = {
    status : -1
  }
}

export default Alert