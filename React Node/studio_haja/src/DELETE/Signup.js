import React, { Component } from 'react'
import API from "../utils/API";

export default class Signup extends Component {
    state = {
        email: "",
        password: "",
        cpassword: ""
    }

  send = async () => {
    const { email, password, cpassword } = this.state
    
    if (!email || email.length === 0) return
    if (!password || password.length === 0 || password !== cpassword) return;
    try {
      const { data } = await API.signup({ email, password });
      localStorage.setItem("token", data.token);
    //   window.location = "/dashboard";
    } catch (error) {
      console.error(error);
    }
  };
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {
    const { email, password, cpassword } = this.state;
    return (
      <div className="Login">
        
        <form>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={this.handleChange}
            required
          />

          <input
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={this.handleChange}
            required
          />

            <input
            type='password'
            name='cpassword'
            placeholder='Password'
            value={cpassword}
            onChange={this.handleChange}
            required
          />    

            <button type='submit' onClick={this.send}>Register</button>
        </form>

      </div>
    );
  }
}