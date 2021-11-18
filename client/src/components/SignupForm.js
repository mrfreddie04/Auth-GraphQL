import React from "react";
import { graphql } from "react-apollo";
import { Navigate } from 'react-router-dom';

import AuthForm from "./AuthForm";
import signupUser from "../queries/signupUser";
import currentUser from "../queries/currentUser";

class SignupForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {errors: []};
  }

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
        <h3>Sign Up</h3>
        <AuthForm onSubmit={this.onSubmit} errors={this.state.errors} />
       </div> 
    );
  }
}  

export default graphql(signupUser)(
  graphql(currentUser)(SignupForm)
);