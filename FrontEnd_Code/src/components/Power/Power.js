import React, { Component } from 'react';
import c3 from 'c3';

class Power extends Component {
    constructor() {
        super();

        // bind our methods to the component
        this.updateChart = this.updateChart.bind(this);
        this.daysInMonth = this.daysInMonth.bind(this);
    }

    // used to calculate days in a month
    daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    componentDidUpdate() {
      if (this.props.datepub.length > 0) {
        let x = ["x"];
        let date = new Date();
        // calculate the days in the current month
        let daysInMonth = this.daysInMonth(date.getMonth(), date.getFullYear());
        let month = "0" + (date.getMonth() + 1);
        let data1 = ["data1"];

        // work out all of the dates for the current month and store them in x
        for (let days = 1; days < daysInMonth; days++) {
            days = "0" + days;
            x.push(date.getFullYear() + "-" +  month.substr(-2) + "-" +  days.substr(-2));
        }
        
        let obj = {};

        // iterate through x and through the information calculated from pubnub to populate the graph with data points
        for (let i = 1; i < x.length; i++) {
          for (let j = 0; j < this.props.datepub.length; j++) {
            if (this.props.datepub[j].date === x[i]) {
              // use immutable objects for calculating the minutes per day for each record in pubnub
              obj = Object.assign({}, obj, {
                [x[i]]: this.props.datepub[j].minutes
              })
            } else {
              if (obj[x[i]] === undefined) {
                obj = Object.assign({}, obj, {
                  // store the default of 0 for any days we havbe no data for
                  [x[i]]: 0
                });
              }
            }
          }
        }

        for (var key in obj) {
          if (obj.hasOwnProperty(key)) { 
              // the device charges by an average of 0.7% every minute
              data1.push(Math.floor(obj[key] * 0.7))        
          }
        }

        // populate the chart with our dataset
        this.chart = c3.generate({
            bindto: '#' + this.props.ident,
            data: {
                x: 'x',
                columns: [
                    x,
                    data1
                ],
                names: {
                  data1: 'Device',
                },
                types: {
                    data1: this.props.chartType,
                },
                axis: {
                  data1: 'y'
                },
                colors: {
                  data1: '#ccc'
                }
            },
            axis: {
                x: {
                    inner: false,
                    type: 'timeseries',
                    label: {
                      text: 'Date of charge',
                      position: 'outer-middle'
                    },
                    tick: {
                        format: '%a, %B %d'
                    }
                },
                y: {
                  min: 0,
                  max: 100,
                  padding: {top: 10, bottom: 0},
                  label: {
                    text: 'Charge amout (%)',
                    position: 'outer-middle'
                  }
                }
            },
            interaction: {
              enabled: true
            }
        });

        this.updateChart();
      }
    }

    updateChart() {
      this.chart.load({type: this.props.chartType});
    }

    render() {
      return <div id={this.props.ident}></div>;    
    }
   }

   Power.defaultProps = {
    chartType: 'bar'
   }
   
   export default Power;
