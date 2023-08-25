import { Agenda as NativeAgenda } from "react-native-calendars";
import { Flex } from "../layout";
import { StyleSheet } from "react-native";
import { FlatList } from "../atoms/flat-list";
import { AgendaItem } from "../list/agenda-item";

export const AgendaList = () => {
  const renderDay = () => {};
  const renderItem = () => {};
  const loadItems = () => {};

  return (
    <Flex flex={1}>
      <NativeAgenda
        // selected={"2012-05-16"}
        minDate={"2023-01-01"}
        maxDate={"2012-05-30"}
        renderList={() => {
          return (
            <FlatList
              backgroundColor={"$background"}
              data={[1, 2, 3, 4, 5, 6, 7]}
              renderItem={({ item }) => <AgendaItem data={item} />}
            />
          );
        }}
        showClosingKnob={true}
        markedDates={{
          "2012-05-16": { selected: true, marked: true },
          "2012-05-17": { marked: true },
          "2012-05-18": { disabled: true },
        }}
        disabledByDefault
        theme={{
          agendaKnobColor: "#768390",
          calendarBackground: "#2d333b",
        }}
      />
    </Flex>
  );
};

export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#2d333b",
  },
  list: {
    backgroundColor: "#22272e",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  item: {
    backgroundColor: "#2d333b",
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginVertical: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 32,
    color: "#768390",
  },
});
