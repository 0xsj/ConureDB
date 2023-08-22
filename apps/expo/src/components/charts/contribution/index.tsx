//@ts-nocheck
import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
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
    const calendarData = this.makeCalendarData(
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

  makeCalendarData(
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
        {calendarData.map((week, rowIndex) => (
          <View key={`week_${rowIndex}`} style={styles.weekContainer}>
            {week.map((day, colIndex) => (
              <View key={`day_${colIndex}`} style={styles.dayContainer}>
                {day ? (
                  <Text style={styles.contributionText}>{day.value}</Text>
                ) : (
                  <Text style={styles.emptyText}>X</Text>
                )}
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column", // Vertical layout
    alignItems: "center", // Center content horizontally
    paddingVertical: 16,
  },
  weekContainer: {
    flexDirection: "row", // Horizontal layout for weeks
    alignItems: "center", // Center content horizontally
    marginVertical: 4,
  },
  dayContainer: {
    flex: 1, // Equal width for each day
    alignItems: "center", // Center content horizontally
    justifyContent: "center", // Center content vertically
    marginHorizontal: 2,
    height: 40, // Adjust the height as needed
    backgroundColor: "#EEE", // Default background color for empty days
  },
  contributionText: {
    fontSize: 16, // Adjust the font size as needed
    color: "#333", // Color for contribution values
  },
  emptyText: {
    fontSize: 16, // Font size for empty days
    color: "#AAA", // Color for empty days
  },
});

ContributionChart.defaultProps = {
  weekNames: ["", "M", "", "W", "", "F", ""],
  monthNames: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  panelColors: ["#EEE", "#DDD", "#AAA", "#444"],
  dateFormat: "YYYY-MM-DD",
};

export default ContributionChart;
