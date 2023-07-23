import { H1, ScrollView, Separator, Square, XStack, YStack } from 'tamagui';
import { Box } from '../../components/atoms';

export function Notifications() {
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
            <Square flex={1} size={120} backgroundColor="$red9" />
            <Square size={120} backgroundColor="$yellow9" />
            <Square size={120} backgroundColor="$blue9" />
            <Square size={120} backgroundColor="$red9" />
            <Square size={120} backgroundColor="$yellow9" />
            <Square size={120} backgroundColor="$blue9" />
            <Square size={120} backgroundColor="$pink9" />
            <Square size={120} backgroundColor="$green10" />
          </XStack>
        </ScrollView>
      </Box>
    </YStack>
  );
}
