import React from "react";
import { View } from "react-native";
import { Svg, Rect } from "react-native-svg";
import * as d3 from "d3";

const ContributionChart = ({ data }) => {
  const chartWidth = 300;
  const chartHeight = 200;
  const cellSize = 20;

  // Create a D3 scale for coloring the cells based on contribution value
  const colorScale = d3
    .scaleSequential(d3.interpolateViridis)
    .domain([0, d3.max(data, (d) => d.value)]);

  return (
    <View>
      <Svg width={chartWidth} height={chartHeight}>
        {data.map((day, index) => (
          <Rect
            key={index}
            x={(index % 7) * cellSize}
            y={Math.floor(index / 7) * cellSize}
            width={cellSize}
            height={cellSize}
            fill={colorScale(day.value)}
          />
        ))}
      </Svg>
    </View>
  );
};

export default ContributionChart;
