import React, { Component } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import EnterOtpPage from './EnterOtpPage';  // Adjust the path based on your file structure
import SuccessPage from './SuccessPage';  // Adjust the path based on your file structure


class App extends Component {
  state = {
    mobile: '',
    otp: '',
    step: 'phone', // 'phone', 'otp'
  };


  componentDidMount() {
    // Initialize Firebase with your configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCyOMHq2dqeDzLBfZ36gxL2Q2ciVP-kC2o",
      authDomain: "otpverify-30457.firebaseapp.com",
      projectId: "otpverify-30457",
      storageBucket: "otpverify-30457.appspot.com",
      messagingSenderId: "267324786498",
      appId: "1:267324786498:web:dfdf2885ff7f1b06a9aadb",
      measurementId: "G-9M4KHKXCDK"
    };

    // Check if a Firebase app is already initialized
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Initialize reCAPTCHA after Firebase initialization
    this.configureCaptcha();
  }

  configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit();
        console.log("Recaptcha verified");
      },
      defaultCountry: "IN"
    });
  }


  onPhoneNumberSubmit = (e) => {
    e.preventDefault();
    this.configureCaptcha();
    const phoneNumber = "+91" + this.state.mobile;
    console.log(phoneNumber);

    const appVerifier = window.recaptchaVerifier;

    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        this.setState({ step: 'otp' }); // Move to the OTP step
      })
      .catch((error) => {
        console.error("SMS not sent", error);
      });
  };

  onOTPSubmit = (e) => {
    e.preventDefault();
    const code = this.state.otp;
    window.confirmationResult.confirm(code)
      .then((result) => {
        console.log(JSON.stringify(result.user));
        alert("User is verified");
        this.setState({ step: 'success' }); // Move to the Success step
      })
      .catch((error) => {
        console.error("User couldn't sign in", error);
      });
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { step } = this.state;

    return (
      <div>
        {step === 'phone' && (
          <div>
            <h2>Login Form</h2>
            <form onSubmit={this.onPhoneNumberSubmit}>
              <div id="sign-in-button"></div>
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile number"
                required
                onChange={this.handleChange}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}

        {step === 'otp' && (
          <EnterOtpPage onNextStep={() => this.setState({ step: 'success' })} />
        )}

        {step === 'success' && <SuccessPage />}
      </div>
    );
  }
}

export default App;