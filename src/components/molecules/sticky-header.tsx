import { Bell, MessageCircle, Menu } from '@tamagui/lucide-icons';
import { Button, XStack } from 'tamagui';
import { Logo } from '../Logo';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const StickyHeader = () => {
  return (
    <XStack position="absolute" width={'100%'} zIndex={3} y={50}>
      <XStack justifyContent="space-between" width="100%" alignItems="center">
        <XStack>
          <Button
            aria-label={'drawer-menu-button'}
            size="$5"
            $md={{ size: '$3' }}
            $gtMd={{ display: 'none' }}
            icon={Menu}
            alignSelf="center"
            space={2}
            scaleIcon={1.5}
            hoverStyle={{ scale: 1.1 }}
            animation={'quick'}
            backgroundColor={''}
          />
          <Logo />
        </XStack>
        <XStack alignItems="center">
          <TouchableOpacity style={{ width: 40, height: 40 }}>
            <XStack
              justifyContent="center"
              alignItems="center"
              alignContent="center"
              flex={1}
            >
              <Bell />
            </XStack>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 40, height: 40 }}>
            <XStack
              justifyContent="center"
              alignItems="center"
              alignContent="center"
              flex={1}
            >
              <MessageCircle />
            </XStack>
          </TouchableOpacity>
        </XStack>
      </XStack>
    </XStack>
  );
};
