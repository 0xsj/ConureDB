import { H1, Label, Paragraph, Separator, XStack, YStack } from 'tamagui';
import { Box, Switch } from '../../components/atoms';
import { useThemeToggle } from '../../state/theme';

export function Profile() {
  const { theme, toggleTheme } = useThemeToggle();

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
          Profile
        </H1>
        <Paragraph ta="center">Next + React Native</Paragraph>

        <Separator />
      </YStack>
      <Box flexDirection={'column'}>
        <XStack width={200} alignItems="center" space="$4">
          <Label paddingRight="$0" justifyContent="flex-end">
            {`Active Theme: ${theme}`}
          </Label>
          <Separator minHeight={20} vertical />
          <Switch isEnabled={theme === 'dark'} onToggle={toggleTheme} />
        </XStack>
      </Box>
    </YStack>
  );
}
