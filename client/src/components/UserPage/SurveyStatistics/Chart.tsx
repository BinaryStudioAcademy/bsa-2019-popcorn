import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

class Chart extends React.Component {

  render() {
    const data = [
      {
        "country": "AD",
        "hot dog": 16,
        "hot dogColor": "hsl(1, 70%, 50%)",
        "burger": 31,
        "burgerColor": "hsl(294, 70%, 50%)",
        "sandwich": 105,
        "sandwichColor": "hsl(31, 70%, 50%)",
        "kebab": 107,
        "kebabColor": "hsl(225, 70%, 50%)",
        "fries": 136,
        "friesColor": "hsl(93, 70%, 50%)",
        "donut": 117,
        "donutColor": "hsl(49, 70%, 50%)"
      },
      {
        "country": "AE",
        "hot dog": 57,
        "hot dogColor": "hsl(304, 70%, 50%)",
        "burger": 41,
        "burgerColor": "hsl(120, 70%, 50%)",
        "sandwich": 174,
        "sandwichColor": "hsl(264, 70%, 50%)",
        "kebab": 114,
        "kebabColor": "hsl(64, 70%, 50%)",
        "fries": 16,
        "friesColor": "hsl(237, 70%, 50%)",
        "donut": 112,
        "donutColor": "hsl(278, 70%, 50%)"
      },
      {
        "country": "AF",
        "hot dog": 16,
        "hot dogColor": "hsl(312, 70%, 50%)",
        "burger": 42,
        "burgerColor": "hsl(53, 70%, 50%)",
        "sandwich": 113,
        "sandwichColor": "hsl(81, 70%, 50%)",
        "kebab": 199,
        "kebabColor": "hsl(145, 70%, 50%)",
        "fries": 150,
        "friesColor": "hsl(84, 70%, 50%)",
        "donut": 144,
        "donutColor": "hsl(194, 70%, 50%)"
      },
      {
        "country": "AG",
        "hot dog": 145,
        "hot dogColor": "hsl(213, 70%, 50%)",
        "burger": 79,
        "burgerColor": "hsl(358, 70%, 50%)",
        "sandwich": 60,
        "sandwichColor": "hsl(357, 70%, 50%)",
        "kebab": 150,
        "kebabColor": "hsl(355, 70%, 50%)",
        "fries": 91,
        "friesColor": "hsl(296, 70%, 50%)",
        "donut": 111,
        "donutColor": "hsl(334, 70%, 50%)"
      },
      {
        "country": "AI",
        "hot dog": 177,
        "hot dogColor": "hsl(321, 70%, 50%)",
        "burger": 97,
        "burgerColor": "hsl(226, 70%, 50%)",
        "sandwich": 75,
        "sandwichColor": "hsl(326, 70%, 50%)",
        "kebab": 9,
        "kebabColor": "hsl(98, 70%, 50%)",
        "fries": 123,
        "friesColor": "hsl(330, 70%, 50%)",
        "donut": 21,
        "donutColor": "hsl(30, 70%, 50%)"
      },
      {
        "country": "AL",
        "hot dog": 111,
        "hot dogColor": "hsl(32, 70%, 50%)",
        "burger": 111,
        "burgerColor": "hsl(284, 70%, 50%)",
        "sandwich": 76,
        "sandwichColor": "hsl(291, 70%, 50%)",
        "kebab": 95,
        "kebabColor": "hsl(279, 70%, 50%)",
        "fries": 169,
        "friesColor": "hsl(319, 70%, 50%)",
        "donut": 49,
        "donutColor": "hsl(211, 70%, 50%)"
      },
      {
        "country": "AM",
        "hot dog": 36,
        "hot dogColor": "hsl(293, 70%, 50%)",
        "burger": 185,
        "burgerColor": "hsl(344, 70%, 50%)",
        "sandwich": 174,
        "sandwichColor": "hsl(113, 70%, 50%)",
        "kebab": 155,
        "kebabColor": "hsl(10, 70%, 50%)",
        "fries": 138,
        "friesColor": "hsl(165, 70%, 50%)",
        "donut": 150,
        "donutColor": "hsl(266, 70%, 50%)"
      }
    ];
    return (
      <div>
        <ResponsiveBar
          data={data}
          keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
          indexBy="country"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          layout="horizontal"
          colors={{ scheme: 'nivo' }}
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: '#38bcb2',
              size: 4,
              padding: 1,
              stagger: true
            },
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: '#eed312',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
            }
          ]}
          fill={[
            {
              match: {
                id: 'fries'
              },
              id: 'dots'
            },
            {
              match: {
                id: 'sandwich'
              },
              id: 'lines'
            }
          ]}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    )
  }
}

export default Chart