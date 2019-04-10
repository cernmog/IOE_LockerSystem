import React, { Component } from 'react';
import PubNub from 'pubnub';
import Chart from '../Chart/Chart';
import Power from '../Power/Power';
import moment from 'moment'

class GraphPanel extends Component {
  constructor() {
    super();

    // default state values
    this.state = {
      chartType: 'spline',
      datepub: [],
      pubnub: null,
      channel: 'ChannelMate'
    };
  }

  componentDidMount() {

    // register our api keys with the pubnub api
    let pubnub = new PubNub({
      publishKey: 'pub-c-76d1d259-d00d-41ab-8bbe-78ba591eaf21',
      subscribeKey: 'sub-c-8a024ae2-3909-11e9-b682-2a55d2175413'
    });

    // update state
    this.setState((prevState) => ({
      chartType: prevState.chartType,
      datepub: prevState.datepub,
      pubnub: pubnub,
      channel: prevState.channel
    }));

    pubnub.history({
      channel : 'ChannelMate',
      count : 360
    },
      ((status, response) => {
        let datepub = [[]];

        // iterate through all of the messages returned by pubnub
        for (let i = 0; i < response.messages.length; i++) {
          // convert all of the timetokens to unix timestamps keeping milliseconds because the JavaScript Data class uses them
          datepub[0][i] = Math.ceil(+response.messages[i]['timetoken'] / 10000);

          // Create a new JavaScript Date object based on the timestamp
          let date = new Date(datepub[0][i]);

          // prefix hours, minutes, seconds, days and months with 0s
          let hours = "0" + date.getHours();
          let minutes = "0" + date.getMinutes();
          let seconds = "0" + date.getSeconds();
          let day = "0" + date.getDate();
          let month = "0" + (date.getMonth() + 1);

          // populate array with date time string yyyy-mm-dd hh:ii:ss removing the 0 from the beginning of the string if the string is greater than 2 characters
          datepub[0][i] = date.getFullYear() + "-" +  month.substr(-2) + "-" +  day.substr(-2) + " " + hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        }

        // store the starting start datetime
        let startTime = moment(datepub[0][0]);

        // store the start date with the time set to 00:00:00
        let firstStartTime = moment(datepub[0][0]).hours(0).minutes(0).seconds(0);
        let seconds = 0;
        let offset = 0;
        let ranges = [];

        // loop through the dates in the datepub array
        for (let i = 1; i < datepub[0].length; i++) {
          // set the current end date to be that from pubnub
          let endTime = moment(datepub[0][i]);

          // work out the difference in dates between the pubnub date and the start date at 00:00:00
          let days = endTime.diff(firstStartTime, 'days');

          // if the number of days is greated that 0, it means a day or more has passed, if not, work out the seconds between startTime and now
          if (days === 0) {
            seconds = endTime.diff(startTime, 'seconds');
          } else {
            // set startDateTime to the next day, increment the offset, set startTiem to the the next pubnub date, set seconds to 0
            firstStartTime = moment(datepub[0][i]).hours(0).minutes(0).seconds(0);
            offset++;
            startTime = moment(datepub[0][i]);
            seconds = 0;
          }

          // create a new object to store the date and the calculated number of minutes
          let range = {
            date: startTime.format("YYYY-MM-DD"),
            minutes: Math.ceil(seconds / 60)
          };

          // set the object into the array
          ranges[offset] = range;
        }

        // store the array into state to pass to the two graph components
        this.setState((prevState) => ({
          chartType: prevState.chartType,
          datepub: ranges,
          pubnub: prevState.pubnub,
          channel: prevState.channel
        }));
      })
    );
  }

  render() {
    return (
      <div>
        <div className="graph panel panel-default">
          <div className="panel-body">
            <h3>How long the device charged for</h3>
            <div id="myChart">
              <Chart ident="chart1" datepub={this.state.datepub} pubnub={this.state.pubnub} channel={this.state.channel} chartType={"scatter"}/>
            </div>
          </div>
        </div>
        <div className="graph panel panel-default">
        <div className="panel-body">
          <h3>Estimated amout of charge gained in time</h3>
          <div id="myChart2">
            <Power ident="chart2" datepub={this.state.datepub} pubnub={this.state.pubnub} channel={this.state.channel} chartType={"bar"}/>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default GraphPanel;
