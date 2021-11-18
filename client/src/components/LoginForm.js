import React from "react";
import { graphql } from "react-apollo";
import { Navigate } from 'react-router-dom'

import AuthForm from "./AuthForm";
import loginUser from "../queries/loginUser";
import currentUser from "../queries/currentUser";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {errors: []};
  }

  // UNSAFE_componentWillUpdate(nextProps) {
  //   if(!this.props.data.user && nextProps.data.user) {
  //     console.log("Redirect to dashboard");
  //   }
  // }

  onSubmit = ({email, password}) => {        
    this.props.mutate({
      variables: {email, password},
      refetchQueries: [ {query:currentUser} ]
    }).catch((err)=>{
      const re = /^[^"]*"([^"]+).*$/;
      const errors = err.graphQLErrors.map( ({message}) => {
        return message.replace(re,"$1") || message;
      });
      this.setState({errors: errors});
    });  
  }

  render(){
    if (this.props?.data?.user) {
      return <Navigate to='/dashboard'/>
    }
  
    return(
      <div>
        <h3>Log In</h3>
        <AuthForm onSubmit={this.onSubmit} errors={this.state.errors} />
       </div> 
    );
  }
}  

export default graphql(loginUser)(
  graphql(currentUser)(LoginForm)
);

