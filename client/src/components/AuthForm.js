import "./AuthForm.css";
import React from "react";

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: "", password: ""};
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {email, password} = this.state;
    this.props.onSubmit({email, password});
  }

  render(){
    return (
      <div className="row">
        <form className="col s6" onSubmit={this.onSubmit}>
          <div className="input-field">            
            <input
              placeholder="Email"
              autoComplete="off"
              value={this.state.email}
              onChange={(e)=>this.setState({email: e.target.value})}
            />
          </div>
          <div className="input-field">
            <input
              placeholder="Password"
              autoComplete="off"
              type="password"
              value={this.state.password}
              onChange={(e)=>this.setState({password: e.target.value})}
            />
          </div>

          <div className="errors">
            {this.props.errors.map( (err,i) => <div key={i}>{err}</div>)}
          </div>  

          <button type="submit" className="btn">Submit</button>
        </form>
      </div>

    );
  }
}  

export default AuthForm;