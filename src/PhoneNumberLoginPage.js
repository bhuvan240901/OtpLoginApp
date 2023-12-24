import React, { Component } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './PhoneNumberLoginPage.css'; // Correct the path to your CSS file

class PhoneNumberLoginPage extends Component {
  state = {
    mobile: '',
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        this.onSignInSubmit();
        console.log("Recaptcha verified");
      },
      defaultCountry: "IN"
    });
  }

  onSignInSubmit = (e) => {
    e.preventDefault();
    this.configureCaptcha();
    const phoneNumber = "+91" + this.state.mobile;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        this.props.onNextStep(); // Move to the next step (EnterOtpPage)
      })
      .catch((error) => {
        console.error("SMS not sent", error);
      });
  };

  render() {
    return (
      <div className="login-container">
        <h1>Login Form</h1>
        <form onSubmit={this.onSignInSubmit} className="login-form">
          <div id="sign-in-button"></div>
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile number"
            required
            onChange={this.handleChange}
            className="login-input"
          />
          <button type="submit" className="login-submit-btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default PhoneNumberLoginPage;
