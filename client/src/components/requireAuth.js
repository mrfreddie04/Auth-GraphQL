import React from "react";
import { graphql } from "react-apollo";
import { Navigate } from 'react-router-dom';

import currentUser from "../queries/currentUser";

const hoc = (WrappedComponent)=> {
  class RequireAuth extends React.Component{  
    // UNSAFE_componentWillUpdate(nextProps) {
    //   console.log(nextProps.data.loading, nextProps.data?.user );
    //   if(!nextProps.data.loading && !nextProps.data?.user) {
    //     console.log("Redirect to login");
    //   }
    // }

    render() {
      if(!this.props.data.loading && !this.props.data?.user) {
        return <Navigate to='/login'/>
      }

      return <WrappedComponent {...this.props} />
    }
  }

  return graphql(currentUser)(RequireAuth);
}

export default hoc;