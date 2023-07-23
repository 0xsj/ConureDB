import { Cloud, Moon, Star, Sun } from '@tamagui/lucide-icons';
import { ListItem, XStack, YGroup } from 'tamagui';

export function ListContainer() {
  return (
    <XStack $sm={{ flexDirection: 'column' }} paddingHorizontal="$4" space>
      <List />
    </XStack>
  );
}
function List() {
  return (
    <YGroup alignSelf="center" bordered width={240} size="$4">
      <YGroup.Item>
        <ListItem hoverTheme icon={Star} title="Star" subTitle="Twinkles" />
      </YGroup.Item>

      <YGroup.Item>
        <ListItem hoverTheme icon={Moon}>
          Moon
        </ListItem>
      </YGroup.Item>

      <YGroup.Item>
        <ListItem hoverTheme icon={Sun}>
          Sun
        </ListItem>
      </YGroup.Item>

      <YGroup.Item>
        <ListItem hoverTheme icon={Cloud}>
          Cloud
        </ListItem>
      </YGroup.Item>
    </YGroup>
  );
}
