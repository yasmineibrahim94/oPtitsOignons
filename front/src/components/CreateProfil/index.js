import React, { Component } from 'react';
import axios from 'axios';
// composants import
import Header from '../Header';
import Footer from '../Footer';
import ValidButton from '../ValidButton';

// style import
import './style.scss';

axios.defaults.withCredentials = true;

class CreateProfil extends Component {


  /* initial state of form */
  state = {
    pseudo: '',
    password: '',
    email: '',
    confirmPassword: '',
  };

  onPseudoChange = (e) => {
    this.setState({
      pseudo: e.target.value,
    });
  }; // focus on pseudo data

  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  }; // focus on password data

  onEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  }; // focus on email data

  onConfirmPassword = (e) => {
    this.setState({
      confirmPassword: e.target.value,
    });
  }; // focus on comfrim password

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      pseudo: this.state.pseudo,
      password: this.state.password,
      email: this.state.email,
      confirmPassword: this.state.confirmPassword,
    }; // when we click on valid button , the initial state change

    const thePassword = data.password;
    const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?!.*?[#?!$ %^&@*-]).{8,}$');
    const message = 'mot de passe incorrect : 1 majuscule, 1 minuscule, 1 chiffre, 8 caractères'; // regex verification for valid password
    if (!regex.test(thePassword)) {
      return alert(message);
    }
    if (data.password !== data.confirmPassword) {
      return alert('error comfirm password');
    }

    axios
      .post('https://apicuisine.herokuapp.com/api/signin', data)
      .then((res) => {
        if (res.status === 200) {
          console.log('ca marche')
          return this.props.history.push('/login', [data.password, data.email]);
        }
      });

    // this.props.history.push('/login');
  }; // we create a new user with this email, pseudo and password or we send an error

  render() { // = the visuel

    return (
      <div className="myRecipe_container">
      <div className="CreateProfil_container">
        <Header />
        <form className="formMy" onSubmit={this.handleSubmit}>
          <div className="pageContainer">
            <div className="page1">
              <h1 className="form_Title">Mes informations</h1>

              <input
                placeholder="Pseudo"
                className="inputForm"
                value={this.state.pseudo}
                onChange={this.onPseudoChange}
                required
              />
              <input
                type="password"
                className="inputForm"
                id="1stPassword"
                placeholder="Mot de passe"
                value={this.state.password}
                onChange={this.onPasswordChange}
                required
              />
              <input
                type="password"
                className="inputForm"
                id="ConfirmPassword"
                placeholder="comfirme"
                value={this.state.confirmPassword}
                onChange={this.onConfirmPassword}
                required
              />

              <input
                type="email"
                className="inputForm"
                placeholder="email"
                value={this.state.email}
                onChange={this.onEmailChange}
                required
              />
            </div>

            <div className="page2">
              <ValidButton type="submit" />
            </div>
          </div>
        </form>
        <Footer />
      </div></div>
    );
  }
}

export default CreateProfil;
