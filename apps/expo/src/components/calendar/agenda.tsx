//@ts-nocheck
import { Text, View, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Agenda } from "react-native-calendars";
import { StyleSheet } from "react-native";
import { ITEMS } from "./constants";

export default function NativeAgenda() {
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeAreaView}>
          <Agenda
            selected={"2012-05-16"}
            minDate={"2012-05-10"}
            maxDate={"2012-05-30"}
            renderList={() => {
              return (
                <FlatList
                  data={ITEMS}
                  renderItem={({ item }) => <Item title={item.title} />}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.list}
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
            // Agenda theme
            theme={{
              agendaKnobColor: "#768390",
              calendarBackground: "#2d333b",
            }}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

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
