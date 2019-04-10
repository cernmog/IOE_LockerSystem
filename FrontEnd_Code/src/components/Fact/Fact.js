import React, { Component } from 'react';

class Fact extends Component {
  render() {
    return (
      <p>{this.props.fact}</p>
    );
  }
}

export default Fact;