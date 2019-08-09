import React from 'react';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  HorizontalBarSeries,
} from 'react-vis';

export default class Example extends React.Component {
  render() {
    const BarSeries = HorizontalBarSeries;
    return (
      <div>
        <XYPlot width={300} height={300} stackBy="x">
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis tickFormat={() => "label"}/>
          <BarSeries data={[{y: 2, x: 10}, {y: 4, x: 5}, {y: 5, x: 15}]} />
        </XYPlot>
      </div>
    );
  }
}