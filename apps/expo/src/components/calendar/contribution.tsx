import { Flex } from "../layout";
import { Calendar as NativeCalendar } from "react-native-calendars";
import moment from "moment";
import { Text } from "../atoms/text";
import { Pressable } from "../atoms";

const mockContributionData = {
  "2023-08-01": 5,
  "2023-08-02": 8,
  "2023-08-03": 2,
  "2023-08-04": 0,
  "2023-08-05": 12,
  "2023-08-06": 7,
  "2023-08-31": 3,
};

export const ContributionCalendar: React.FC = () => {
  const today = moment().toString();
  return (
    <Flex>
      <NativeCalendar
        style={{}}
        dayComponent={({ date, state }) => {
          return (
            <Pressable
              onPress={() => console.log(date)}
              style={{
                width: 52,
                height: 52,
                backgroundColor: "#2E2E2E",
                borderRadius: 12,
              }}
            >
              <Text>{/* {date?.day} */}</Text>
            </Pressable>
          );
        }}
        theme={{
          calendarBackground: "transparent",
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
        hideExtraDays={false}
        disableMonthChange={false}
        firstDay={1}
      />
    </Flex>
  );
};
