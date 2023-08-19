import React from "react";
import type { Theme, DateData } from "react-native-calendars/src/types";
import type { MarkingProps } from "react-native-calendars/src/calendar/day/marking";
import moment from "moment";
type MarkedDatesType = {
  [key: string]: MarkingProps;
};

const selectedDateCommonStyle = {
  customTextStyle: { color: "#fff", fontWeight: "bold" },
  customContainerStyle: { backgroundColor: "#red" },
} as Theme;
interface Props {
  checkedData: any;
}
const useCalendar = ({ checkedData }: Props) => {
  const today = moment(new Date()).format("YYYY-MM-DD");
  const [mode] = React.useState<"vacation" | "default">("default");
  const [selectedDates, setSelectedDates] = React.useState<MarkedDatesType>(
    () =>
      mode === "default"
        ? {
            [today]: {
              selected: true,
              marked: checkedData[today] ? true : false,
              ...selectedDateCommonStyle,
            },
          }
        : {},
  );
  const [markedDates, setMarkedDates] = React.useState<MarkedDatesType>({});
  const [filteredCheckedData, setFilteredCheckedData] = React.useState<any[]>(
    () =>
      checkedData[today] && mode === "default" ? checkedData[today].data : [],
  );

  const onDayPressVactionMode = (day: DateData) => {
    setSelectedDates((prev) => {
      if (!prev[day.dateString]) {
        if (markedDates[day.dateString]) {
          return {
            ...prev,
            [day.dateString]: {
              marked: true,
              selected: true,
              ...markedDates[day.dateString],
              ...selectedDateCommonStyle,
            },
          };
        } else {
          return {
            ...prev,
            [day.dateString]: {
              selected: true,
              ...selectedDateCommonStyle,
            },
          };
        }
      } else {
        delete prev[day.dateString];
        return { ...prev };
      }
    });
  };

  const onDayPressDefaultMode = (day: DateData) => {
    setSelectedDates(() => {
      if (markedDates[day.dateString]) {
        return {
          [day.dateString]: {
            marked: true,
            selected: true,
            ...markedDates[day.dateString],
            ...selectedDateCommonStyle,
          },
        };
      } else {
        return {
          [day.dateString]: {
            ...selectedDateCommonStyle,
          },
        };
      }
    });
  };

  const handleViewVactionList = (day: string) => {
    if (checkedData[day]) {
      setFilteredCheckedData(checkedData[day].data);
    } else {
      setFilteredCheckedData([]);
    }
  };

  const onDayPress = (day: DateData) => {
    switch (mode) {
      case "vacation":
        onDayPressVactionMode(day);
        break;
      case "default":
        onDayPressDefaultMode(day);
        handleViewVactionList(day.dateString);
        break;
      default:
        break;
    }
  };

  const formatCheckDatesToMarkedDates = (data: any) => {
    const newMarkedDates = JSON.parse(JSON.stringify(data));
    for (const date in newMarkedDates) {
      newMarkedDates[date] = { marked: true };
    }
    setMarkedDates(newMarkedDates);
  };

  React.useEffect(() => {
    formatCheckDatesToMarkedDates(checkedData);
  }, [checkedData]);
  return { filteredCheckedData, mode, selectedDates, markedDates, onDayPress };
};

export default useCalendar;
