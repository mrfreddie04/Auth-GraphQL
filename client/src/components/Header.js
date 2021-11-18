import React from 'react';
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";

//import history from "../history";
import currentUser from "../queries/currentUser";
import logoutUser from "../queries/logoutUser";

class Header extends React.Component {

  onLogout = (e) =>{
    e.preventDefault();

    //refetchQueries: [ {query:currentUser} ]
    this.props.mutate({}).then(() => {
      this.props.data.refetch();
    });    

  }

  renderButtons = () => {
    const {loading, user} = this.props.data;

    //console.log("User",user);

    if(loading) {
      return (<div></div>);
    }    

    if(user) {
      return (
        <li>
          <a className="button" href="/" onClick={this.onLogout}>Logout</a>    
        </li>
      );
    }    

    return (
      <div>
        <li>
          <Link to="/signup" className="button">Signup</Link>   
        </li>  
        <li>
          <Link to="/login" className="button">Login</Link>
        </li>        
      </div>
    );
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper"> 
          <Link to="/" className="brand-logo left">Home</Link>
          <ul className="right">
            {this.renderButtons()}
          </ul>          
        </div>
      </nav>
    )
  }
};

export default graphql(logoutUser)(
  graphql(currentUser)(Header)
);
