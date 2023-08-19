import React from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import type { Theme, DateData } from "react-native-calendars/src/types";
import type { MarkingProps } from "react-native-calendars/src/calendar/day/marking";

const defaultTheme = {
  customTextStyle: { color: "#fff", fontWeight: "bold" },
  todayBackgroundColor: "green",
  todayTextColor: "red",
  calendarBackground: "transparent",
} as Theme;

type MarkedDatesType = {
  [key: string]: MarkingProps;
};

interface CalendarProps {
  markedDates?: MarkedDatesType;
  onDayPress?: (day: DateData) => void;
}

export const ChartView = ({ markedDates, onDayPress }: CalendarProps) => {
  return (
    <Calendar
      monthFormat={"yyyy MMM"}
      markingType={"period"}
      markedDates={{ ...markedDates }}
      onDayPress={onDayPress}
      onMonthChange={(day) => {
        console.log(day);
      }}
      theme={defaultTheme}
    />
  );
};

LocaleConfig.locales.en = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
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
  dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  dayNamesShort: [],
};
LocaleConfig.defaultLocale = "en";
