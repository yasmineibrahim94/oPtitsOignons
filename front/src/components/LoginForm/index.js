import React, { Component, useEffect, useContext } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

import { Redirect } from 'react-router-dom';
// composants import
import Header from '../Header';
import Footer from '../Footer';
import Auth from '../../contexts/index';
import history from '../History/history';
// style import
import './style.scss';
import { Placeholder } from 'semantic-ui-react';
import { login } from '../../services';

class LoginForm extends Component {
  /* initial state of form */

  state = {
    email: '',
    password: '',
  };

  

  onEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  }; // focus on email data

  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  }; // focus on password data

  handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,

    }; // when we click on valid button , the initial state change

    const message = 'il y a une erreur sur l\'email ou le mot de passe';
    console.log('data', data);
    try {
      const response = await login({ email: data.email, password: data.password });
      console.log(response);
      this.props.history.push('/');
    }
    catch ({ response }) {
      console.log(response);
    }

    /*
    (async () => {
      const rawResponse = await fetch('https://api-cuisine.herokuapp.com/api/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      const content = await rawResponse.json();
      if (rawResponse.status == 200) {
        console.log(content);
        return this.props.history.push('/');
      }
      return alert(message);
    })();*/

    /*   axios.post('http://localhost:3000/api/login', data, axiosConfig)
        .then((res) => {
          if (res.status == 200) {
            this.props.history.push('/');
          }
          else {
            return alert(message);
          }
        })
        .catch((err) => console.log(err)); */
    /* axios
      .post('https://api-cuisine.herokuapp.com/api/login', data)
      .then((res) => {
        if (res.status == 200) {
          this.props.history.push('/');
        }
        else {
          return alert(message);
        }
      })
      .catch((err) => console.log(err)); */
    // we verify that there is a user with this email and password or we send an error
  };

  render() { // = the visuel
    if (this.props.history.location.state) {
      this.state.password = this.props.history.location.state[0];
      this.state.email = this.props.history.location.state[1];
    }

   // const { isAuthenticated, setIsAuthenticated} = useContext(Auth);
    /*
    useEffect(() => {
      if (isAuthenticated) {
        history.replace('/');
      }
    }, [history, isAuthenticated]);*/

    return (
      <div className="loginForm_container">
        <Header />
        <form className="login" onSubmit={this.handleSubmit}>
          <div className="login_loginForm">
            <input
              type="email"
              className="loginForm_pseudo"
              id="email"
              name="email"
              placeholder="email"
              value={this.state.email}// {this.state.email}
              onChange={this.onEmailChange}
              required
            />
            <input
              type="password"
              className="loginForm_password"
              id="password"
              name="password"
              placeholder="password"
              value={this.state.password}// {this.state.password}
              onChange={this.onPasswordChange}
              required
            />
            <button type="submit" /* onClick={Cookies.set("user", "loginTrue")} */ className="loginForm_validButton"><div className="validButton_validLogin">Me connecter</div></button>
          </div>
        </form>
        <Footer />
      </div>
    );
  }
}

export default LoginForm;
