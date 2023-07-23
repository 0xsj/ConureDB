import {
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  XStack,
  YStack
} from 'tamagui';
import { useLink } from 'solito/link';
import { BottomSheet } from '../../components/organisms';

export function Home() {
  const linkProps = useLink({
    href: '/user/nate'
  });

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
          Hello World.
        </H1>
        <Paragraph ta="center">Next + React Native</Paragraph>

        <Separator />
        <Paragraph ta="center">
          <Anchor
            color="$color12"
            href="https://twitter.com/natebirdman"
            target="_blank"
          >
            @0xsj
          </Anchor>
          <Anchor
            color="$color12"
            href="https://github.com/tamagui/tamagui"
            target="_blank"
            rel="noreferrer"
          >
            ⭐️
          </Anchor>
        </Paragraph>
      </YStack>

      <XStack>
        <Button {...linkProps}>Link to user</Button>
      </XStack>
      <BottomSheet />
    </YStack>
  );
}
