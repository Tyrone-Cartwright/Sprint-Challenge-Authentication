import React from "react";
import axios from "axios";
import { list } from "postcss";

class Jokes extends React.Component {
  state = {
    jokes: []
  };

  render() {
    return (
      <>
        <h2>List of Jokes</h2>
        <ul>
          {this.state.jokes.map(joke => (
            <li key={joke.id}>{joke.id}</li>
          ))}
        </ul>
      </>
    );
  }

  async componentDidMount() {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/jokes`;

    console.log("endpoint", endpoint);

    try {
      const token = localStorage.getItem("jwt");
      const requestOptions = {
        headers: {
          authorization: token
        }
      };

      const response = await axios.get(endpoint, requestOptions);

      this.setState({ jokes: response.data.jokes });
    } catch (error) {
      console.error("we ran into an issue getting the jokes");
    }
  }
}

export default Jokes;
