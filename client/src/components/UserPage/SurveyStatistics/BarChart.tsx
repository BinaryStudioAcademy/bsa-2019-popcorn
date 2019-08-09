import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

const BarChart = ({ data, keys }) => (
  <ResponsiveBar
      data={data}
      keys={keys}
      indexBy="label"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      layout="horizontal"
      colors={{ scheme: 'nivo' }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      tooltip={({ id, value, color }) => (
        <strong style={{ color }}>
          {id}: {value}
        </strong>
      )}
  />
);

export default BarChart