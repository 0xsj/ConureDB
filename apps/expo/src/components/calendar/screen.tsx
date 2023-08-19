/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import CalendarView from "./index";

import useCalendar from "./useCalendar";
import { fakeData } from "./fixture";

const Item = ({ name }: { name: string }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
  </View>
);

const renderItem = ({
  item,
}: {
  item: { name: string; id: string; desc: string };
}) => <Item name={item?.name} />;

export const CalenderScreen = () => {
  const { filteredCheckedData, mode, ...rest } = useCalendar({
    checkedData: fakeData,
  });

  const renderCalendarMode = (type: "default" | "vacation") => {
    switch (type) {
      case "default":
        return filteredCheckedData.length > 0 ? (
          <View style={{ flex: 1 }}>
            {/* <FlatList data={filteredCheckedData} renderItem={renderItem} /> */}
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>등록된 휴가가 없습니다.</Text>
          </View>
        );
      case "vacation":
        return (
          <View
            style={{
              position: "absolute",
              bottom: 15,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              height: 80,
              backgroundColor: "gold",
            }}
          >
            <Text>휴가 등록</Text>
          </View>
        );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <CalendarView {...rest} />
      </View>
      {renderCalendarMode(mode)}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
  },
  item: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    padding: 20,
    marginVertical: 1,
    marginHorizontal: 2,
    backgroundColor: "#5BC3EB",
  },
});
