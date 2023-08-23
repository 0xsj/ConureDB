import { Flex } from "../../layout";
import { Calendar as NativeCalendar } from "react-native-calendars";
import moment from "moment";
import { View, Text } from "react-native";

export const Calendar = () => {
  const today = moment().toString();
  console.log(today);
  return (
    <Flex>
      <NativeCalendar
        style={{}}
        dayComponent={({ date, state }) => {
          return (
            <View
              style={{
                width: 42,
                height: 42,
                backgroundColor: "blue",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: state === "disabled" ? "gray" : "black",
                }}
              >
                {date?.day}
              </Text>
            </View>
          );
        }}
        theme={{
          calendarBackground: "transparent",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#00adf5",

          // "stylesheet.day.basic": {
          //   base: {
          //     width: 42,
          //     height: 42,
          //     alignItems: "center",
          //     borderWidth: 1,
          //     borderColor: "black",
          //     backgroundColor: "red",
          //   },
          // },
          // "stylesheet.calendar.header": {
          //   week: {
          //     marginTop: 20,
          //     flexDirection: "row",
          //     justifyContent: "space-between",
          //     backgroundColor: "red", // Change the background color of the week header
          //   },
          //   day: {
          //     backgroundColor: "red",
          //   },
          // },
        }}
        current={today}
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
        monthFormat={"yyyy MM"}
        onMonthChange={(month) => {
          console.log("month changed", month);
        }}
        hideArrows={false}
        hideExtraDays={true}
        disableMonthChange={false}
        firstDay={1}
      />
    </Flex>
  );
};
