import { Flex } from "../layout";
import { Calendar as NativeCalendar } from "react-native-calendars";
import moment from "moment";

export const Chart = () => {
  const today = moment().toString();
  console.log(today);
  return (
    <Flex>
      <NativeCalendar
        current={today}
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
        monthFormat={"yyyy MM"}
        onMonthChange={(month) => {
          console.log("month changed", month);
        }}
        hideArrows={true}
        hideExtraDays={true}
        disableMonthChange={false}
        firstDay={1}
      />
    </Flex>
  );
};
