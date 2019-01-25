import React from "react";
import axios from "axios";

class Signup extends React.Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="">Username</label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            type="password"
          />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    );
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const endpoint = `${process.env.REACT_APP_API_URL}/api/signup`;
    const logPoint = `${process.env.REACT_APP_API_URL}/api/login`;

    axios
      .post(endpoint, this.state)
      .then(res => {
        axios
          .post(logPoint, this.state)
          .then(res => {
            localStorage.setItem("jwt", res.data.token);
            window.location.replace("/users");
          })
          .catch(err => console.log(err));
        // console.log(res.data);
      })
      .catch(err => console.error(err));
  };
}

export default Signup;
