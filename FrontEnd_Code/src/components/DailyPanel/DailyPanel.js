import React, { Component } from 'react';
import Fact from '../Fact/Fact'

class DailyPanel extends Component {
  constructor() {
    super();

    this.state = {
      result: null
    }
  }

  componentDidMount() {                               
    fetch("/dailyFacts.json") // http request using a promise to fetch the dailyFacts json file from the server
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          result: result
        });
      },
      (error) => {
        console.log(error);
      }
    )
  }

  render() {
    let item = null;

    if (this.state.result) {
      const keyFacts = this.state.result.map(fact => <Fact key={fact.id} fact={fact.fact}></Fact>); //creating fact component with props 
      item = keyFacts[Math.floor(Math.random() * keyFacts.length)];
    }

    return (
      <div className="daily panel panel-default">
        <div className="panel-body">
          <h2>Random Fact</h2>
          {item}
        </div>
      </div>
    );
  }
}

export default DailyPanel;
