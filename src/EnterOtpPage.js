import React, { Component } from 'react';
import './EnterOtpPage.css'; // Import your CSS file

class EnterOtpPage extends Component {
  state = {
    otp: '',
    timer: 60,
  };

  componentDidMount() {
    // Start the timer when the component mounts
    this.startTimer();
  }

  startTimer = () => {
    this.timerInterval = setInterval(() => {
      if (this.state.timer > 0) {
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }));
      } else {
        // Timer has reached 0, you can handle this as needed
        clearInterval(this.timerInterval);
      }
    }, 1000);
  };

  componentWillUnmount() {
    // Clear the timer interval when the component is unmounted
    clearInterval(this.timerInterval);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmitOTP = (e) => {
    e.preventDefault();
    const code = this.state.otp;
    window.confirmationResult.confirm(code)
      .then((result) => {
        console.log(JSON.stringify(result.user));
        alert("User is verified");
        this.props.onNextStep(); // Move to the next step (SuccessPage)
      })
      .catch((error) => {
        console.error("User couldn't sign in", error);
      });
  };

  handleResendOTP = () => {
    // Add logic to resend OTP, for example, initiate a new OTP request
    // For the sake of simplicity, we'll restart the timer here
    this.setState({ timer: 60 });
    this.startTimer();
  };

  render() {
    return (
      <div className="otp-container">
        <h2>Enter OTP</h2>
        <p>Time remaining: {this.state.timer} seconds</p>
        <form onSubmit={this.onSubmitOTP} className="otp-form">
          <input
            type="number"
            name="otp"
            placeholder="OTP Number"
            required
            onChange={this.handleChange}
            className="otp-input"
          />
          <button type="submit" className="otp-submit-btn">Submit</button>
        </form>
        <button onClick={this.handleResendOTP} disabled={this.state.timer > 0} className="otp-resend-btn">
          Resend OTP
        </button>
      </div>
    );
  }
}

export default EnterOtpPage;