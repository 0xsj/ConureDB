//@ts-nocheck
import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import dayjs from "dayjs";

interface Props {
  weekNames?: string[];
  monthNames?: string[];
  panelColors?: string[];
  values: { [date: string]: number };
  until: string;
  dateFormat?: string;
  weekLabelAttributes: any | undefined;
  monthLabelAttributes: any | undefined;
  panelAttributes: any | undefined;
}

interface State {
  columns: number;
  maxWidth: number;
}

class ContributionChart extends Component<Props, State> {
  monthLabelHeight: number;
  weekLabelWidth: number;
  panelSize: number;
  panelMargin: number;

  constructor(props: Props) {
    super(props);

    this.monthLabelHeight = 15;
    this.weekLabelWidth = 15;
    this.panelSize = 11;
    this.panelMargin = 2;

    this.state = {
      columns: 53,
      maxWidth: 53,
      calendarData: [], // Calendar data will be stored here
    };
  }

  componentDidMount() {
    // Fetch GitHub contribution data or provide it as a prop

    // Calculate calendar data and update state
    const calendarData = this.makeChartData(
      this.props.values,
      this.props.until,
      this.state.columns,
    );
    this.setState({ calendarData });
  }

  getPanelPosition(row: number, col: number) {
    const bounds = this.panelSize + this.panelMargin;
    return {
      x: this.weekLabelWidth + bounds * row,
      y: this.monthLabelHeight + bounds * col,
    };
  }

  makeChartData(
    history: { [date: string]: number },
    lastDay: string,
    columns: number,
  ) {
    const d = dayjs(lastDay, { format: this.props.dateFormat });
    const lastWeekend = d.endOf("week");
    const endDate = d.endOf("day");

    const result: ({ value: number; month: number } | null)[][] = [];
    for (let i = 0; i < columns; i++) {
      result[i] = [];
      for (let j = 0; j < 7; j++) {
        const date = lastWeekend.subtract(
          (columns - i - 1) * 7 + (6 - j),
          "day",
        );
        if (date <= endDate) {
          result[i][j] = {
            value: history[date.format(this.props.dateFormat)] || 0,
            month: date.month(),
          };
        } else {
          result[i][j] = null;
        }
      }
    }

    return result;
  }

  render() {
    const { weekNames, monthNames, panelColors } = this.props;
    const { calendarData } = this.state;

    return (
      <View style={styles.container}>
        {/* Render your calendar UI here using calendarData, weekNames, and monthNames */}
        {/* You may use View, Text, and other React Native components */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // Add other styling as needed for your calendar
  },
});

export default ContributionChart;
