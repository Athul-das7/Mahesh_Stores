import React from 'react'

function Alert(props) {
  console.log("this",props.status)
  if ( props.status !== -1 && props.status !== undefined ){
    const a = ['Incorrect password or Username','Logged Out!!!','Unauthorized Access'];
    return (
      <div className="alert alert-danger pt-2 text-center" role="alert">
        {a[props.status]}
      </div>  
    )
  }
  else {
    return(
      <noscript></noscript>
    );
  }
}

export default Alert