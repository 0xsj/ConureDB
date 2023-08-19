import React from "react";
import { Flex, Screen, Box, Spacer } from "../components";
import { Avatar, Text } from "../components/atoms";
import { RootStackParamList } from "../navigation/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AccountHeader } from "../components/profile";
import { faker } from "@faker-js/faker";
import { ChartView } from "../components/chart/main";
import { fakeData } from "../components/chart/fixture";
import { DateData } from "react-native-calendars";
import { SkiaLine } from "../components/chart/skia-line";
import ContributionChart from "../components/chart/contribution";
import { generateContributionData } from "../components/chart/fixture";
type ProfileScreenProps = NativeStackScreenProps<RootStackParamList>;
const data = generateContributionData();

export function ProfileScreen({ navigation }: ProfileScreenProps) {
  return (
    <Screen bg="$background" edges={["top"]}>
      <AccountHeader />
      <Spacer y="hg" />
      <Spacer y="sm" />
      <Flex centered>
        <Avatar size={100} source={faker.image.avatar()} />
        <Text fontSize={40} fontWeight={"bold"} color={"$foreground"}>
          SJ Lee
        </Text>
      </Flex>
      <Flex>
        <ContributionChart data={data} />
      </Flex>
      <Flex>
        {/* contents of the results  */}
        {/* for now, we are going to show the goal contributions */}
      </Flex>
    </Screen>
  );
}
