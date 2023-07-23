import { H1, Paragraph, Separator, YStack } from 'tamagui';

export function Notifications() {
  return (
    <YStack
      backgroundColor={'$background'}
      f={1}
      jc="center"
      ai="center"
      p="$4"
      space
    >
      <YStack space="$4" maw={600}>
        <H1 ta="center" fontFamily={'$silkscreen'}>
          Notification
        </H1>

        <Separator />
      </YStack>
      <Paragraph>Lorem ipsum</Paragraph>
    </YStack>
  );
}
