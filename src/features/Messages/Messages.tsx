import {
  Circle,
  H1,
  ScrollView,
  Separator,
  Square,
  XStack,
  YStack
} from 'tamagui';
import { Box } from '../../components/atoms';

export function Messages() {
  return (
    <YStack backgroundColor={'$background'} f={1} ai="center" p="$4" space>
      <YStack space="$4" maw={600} pt={50}>
        <H1 ta="center" fontFamily={'$silkscreen'}>
          Messages
        </H1>

        <Separator />
      </YStack>
      <Box flexDirection={'column'}>
        <ScrollView
          width="75%"
          backgroundColor="$background"
          padding="$4"
          borderRadius="$4"
        >
          <XStack flexWrap="wrap" alignItems="center" justifyContent="center">
            <Square margin="$4" size={120} backgroundColor="$red9" />
            <Circle margin="$4" size={120} backgroundColor="$orange9" />
            <Square margin="$4" size={120} backgroundColor="$yellow9" />
            <Circle margin="$4" size={120} backgroundColor="$green9" />
            <Square margin="$4" size={120} backgroundColor="$blue9" />
            <Circle margin="$4" size={120} backgroundColor="$purple9" />
            <Square margin="$4" size={120} backgroundColor="$pink9" />
            <Circle margin="$4" size={120} backgroundColor="$red9" />
            <Square margin="$4" size={120} backgroundColor="$blue9" />
            <Circle margin="$4" size={120} backgroundColor="$purple9" />
            <Square margin="$4" size={120} backgroundColor="$pink9" />
            <Circle margin="$4" size={120} backgroundColor="$red9" />
            <Square margin="$4" size={120} backgroundColor="$blue9" />
            <Circle margin="$4" size={120} backgroundColor="$purple9" />
            <Square margin="$4" size={120} backgroundColor="$pink9" />
            <Circle margin="$4" size={120} backgroundColor="$red9" />
            <Square margin="$4" size={120} backgroundColor="$blue9" />
            <Circle margin="$4" size={120} backgroundColor="$purple9" />
            <Square margin="$4" size={120} backgroundColor="$pink9" />
            <Circle margin="$4" size={120} backgroundColor="$red9" />
            <Square margin="$4" size={120} backgroundColor="$blue9" />
            <Circle margin="$4" size={120} backgroundColor="$purple9" />
            <Square margin="$4" size={120} backgroundColor="$pink9" />
            <Circle margin="$4" size={120} backgroundColor="$red9" />
            <Square margin="$4" size={120} backgroundColor="$blue9" />
            <Circle margin="$4" size={120} backgroundColor="$purple9" />
            <Square margin="$4" size={120} backgroundColor="$pink9" />
            <Circle margin="$4" size={120} backgroundColor="$red9" />
          </XStack>
        </ScrollView>
      </Box>
    </YStack>
  );
}
