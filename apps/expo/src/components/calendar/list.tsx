import React, { useState, useMemo, useCallback } from "react";
import { StyleSheet, Text, View, TextStyle } from "react-native";
import {
  CalendarList as NativeCalendarList,
  DateData,
} from "react-native-calendars";

const RANGE = 24;
const initialDate = "2022-07-05";
const nextWeekDate = "2022-07-14";
const nextMonthDate = "2022-08-05";

interface Props {
  horizontalView?: boolean;
}

export const CalendarList = (props: Props) => {
  const { horizontalView } = props;
  const [selected, setSelected] = useState(initialDate);
  const marked = useMemo(() => {
    return {
      [nextWeekDate]: {
        selected: selected === nextWeekDate,
        selectedTextColor: "#5E60CE",
        marked: true,
      },
      [nextMonthDate]: {
        selected: selected === nextMonthDate,
        selectedTextColor: "#5E60CE",
        marked: true,
      },
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: "#5E60CE",
        selectedTextColor: "white",
      },
    };
  }, [selected]);

  const onDayPress = useCallback((day: DateData) => {
    setSelected(day.dateString);
  }, []);

  return (
    <NativeCalendarList
      current={initialDate}
      pastScrollRange={RANGE}
      futureScrollRange={RANGE}
      onDayPress={onDayPress}
      markedDates={marked}
      renderHeader={!horizontalView ? renderCustomHeader : undefined}
      calendarHeight={!horizontalView ? 390 : undefined}
      theme={{
        calendarBackground: "transparent",
      }}
      horizontal={horizontalView}
      pagingEnabled={horizontalView}
      staticHeader={horizontalView}
    />
  );
};

function renderCustomHeader(date: any) {
  const header = date.toString("MMMM yyyy");
  const [month, year] = header.split(" ");
  const textStyle: TextStyle = {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
    color: "#5E60CE",
    paddingRight: 5,
  };

  return (
    <View style={styles.header}>
      <Text style={[styles.month, textStyle]}>{`${month}`}</Text>
      <Text style={[styles.year, textStyle]}>{year}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  month: {
    marginLeft: 5,
  },
  year: {
    marginRight: 5,
  },
});
