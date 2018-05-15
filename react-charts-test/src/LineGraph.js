import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dygraph from 'dygraphs';

export default class LineGraph extends React.Component {
  constructor(props) {
    super(props);

    // http://dygraphs.com/gallery/#g/dynamic-update
    let data = [];
    let t = new Date();
    for (let i = 10; i >= 0; i--) {
      let x = new Date(t.getTime() - i * 1000);
      data.push([x, Math.random()]);
    }

    this.state = {
      chartData: data,
      // NOTE: I think we only really want this in state if its being changed affected the rendered output.
      updateInterval: 2000 + Math.random() * 8000,
    };

    const maximumPoints = 20 + Math.random() * 100;

    this.intervalId = setInterval(() => {
      var x = new Date();  // current time
      var y = Math.random();

      if (this.state.chartData.length > maximumPoints) {
        // My assumption: No need to call setState() as we call it on the next line.
        this.state.chartData = [this.state.chartData[this.state.chartData.length - 1]];
      }

      this.setState({
        chartData: [...this.state.chartData, [x, y]],
      });
    }, this.state.updateInterval);
  }

  render() {
    // When render() is first called this.g has not been created. componentDidMount() executes afterwards.
    // passing props from parent / lifting state: https://reactjs.org/docs/lifting-state-up.html.
    // http://dygraphs.com/options.html
    if (this.dygraph) {
      this.dygraph.updateOptions( { 'file': this.state.chartData } );
    }
    
    return (
      <div className="graph-container">
        <div id={"graphdiv-" + this.props.graphId}></div>
      </div>
    );
  }

  componentDidMount() {
    this.dygraph = new Dygraph(document.getElementById(`graphdiv-${this.props.graphId}`),
                                this.state.chartData,
                                {
                                  drawPoints: true,
                                  showRoller: true,
                                  valueRange: [0.0, 1.2],
                                  labels: ['Time', 'Random']
                                });
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  // TODO: Would define props but this is meant to be a very simple project rather than a "best practice" project.
}
