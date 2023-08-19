import React from "react";
import { StyleSheet } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import type { Theme, DateData } from "react-native-calendars/src/types";
import type { MarkingProps } from "react-native-calendars/src/calendar/day/marking";

type MarkedDatesType = {
  [key: string]: MarkingProps;
};

interface CalendarProps {
  selectedDates: MarkedDatesType;
  markedDates: MarkedDatesType;
  onDayPress: (day: DateData) => void;
}

const CalendarView = ({
  selectedDates,
  markedDates,
  onDayPress,
}: CalendarProps) => {
  return (
    <Calendar
      monthFormat={"yyyy년 MM월"}
      markingType={"period"}
      style={styles.calendar}
      markedDates={{ ...markedDates, ...selectedDates }}
      onDayPress={onDayPress}
      onMonthChange={(day) => {
        console.log(day);
      }}
      theme={defaultTheme}
    />
  );
};

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
});

export default CalendarView;

LocaleConfig.locales.ko = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: ["월", "화", "수", "목", "금", "토", "일"],
  dayNamesShort: ["월", "화", "수", "목", "금", "토", "일"],
};
LocaleConfig.defaultLocale = "ko";

const defaultTheme = {
  selectedDayBackgroundColor: "#1fbdb0",
  arrowColor: "#1fbdb0",
  dotColor: "#1fbdb0",
  todayTextColor: "#1fbdb0",
  "stylesheet.calendar.header": {
    week: {
      marginTop: 5,
      flexDirection: "row",
      justifyContent: "space-between",
      textAlign: "center",
      paddingHorizontal: 10, // 임시
    },
  },
} as Theme;
