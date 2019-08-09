import React, { PureComponent } from 'react';
import MyResponsiveBar from "./Chart";


class SurveyStatistics extends PureComponent {
    constructor(props){
        super(props);
    }
    
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
                <MyResponsiveBar  />
            </div>
        );  
    }
};

export default SurveyStatistics;