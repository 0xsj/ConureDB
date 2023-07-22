import { useState } from 'react';
import {
  Anchor,
  Button,
  H1,
  Label,
  Paragraph,
  Separator,
  Sheet,
  XStack,
  YStack
} from 'tamagui';
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { useLink } from 'solito/link';
import { Box, Switch } from '../../components/atoms';
import { useThemeToggle } from '../../state/theme';

export function Home() {
  const { theme, toggleTheme } = useThemeToggle(); // Use the theme toggle hook
  const [currentTheme] = useState(theme);

  const linkProps = useLink({
    href: '/user/nate'
  });

  console.log(currentTheme);

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
          ,{' '}
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
      <Box flexDirection={'column'}>
        <XStack width={200} alignItems="center" space="$4">
          <Label paddingRight="$0" minWidth={90} justifyContent="flex-end">
            {`Active Theme: ${theme}`}
          </Label>
          <Separator minHeight={20} vertical />
          <Switch onCheckedChange={toggleTheme} />
        </XStack>
      </Box>

      <SheetDemo />
    </YStack>
  );
}

function SheetDemo() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(0);
  return (
    <>
      <Button
        aria-label={'toggle-sheet-button'}
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen(x => !x)}
      />
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame ai="center" jc="center">
          <Sheet.Handle />
          <H1 ta="center">What is Lorem Ipsum?</H1>

          <Button
            size="$6"
            circular
            icon={ChevronDown}
            aria-label={'close-sheet-button'}
            onPress={() => {
              setOpen(false);
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
