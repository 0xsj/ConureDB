import { ReactNode, useEffect, useState } from 'react';
import {
  Button,
  isClient,
  Paragraph,
  XStack,
  YStack,
  AnimatePresence,
  H2
} from 'tamagui';
import { Menu } from '@tamagui/lucide-icons';
import { TouchableOpacity } from 'react-native';

interface NotificationsProps {
  children?: ReactNode;
}

export const Notifications: React.FC<NotificationsProps> = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setOpenMenu(x => !x);

  useEffect(() => {
    if (isClient) {
      const onScroll = () => {
        setIsScrolled(window.scrollY > 30);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }
  }, []);

  return (
    <YStack>
      <AnimatePresence>
        {openMenu && (
          <YStack
            key={'notification-menu'}
            onPress={toggleMenu}
            position={'absolute'}
            top={0}
            // left={0}
            right={0}
            // bottom={0}
            backgroundColor={'$background'}
            animation={'quick'}
            x={0}
            zi={5000}
          >
            {
              <YStack
                width={450}
                backgroundColor={'red'}
                justifyContent="center"
                alignItems="center"
              >
                <XStack>
                  <H2>Notifications</H2>
                </XStack>
              </YStack>
            }
          </YStack>
        )}
      </AnimatePresence>
      <XStack
        elevation={isScrolled ? 0 : '$1'}
        py={isScrolled ? '$0' : '$2'}
        my={isScrolled ? -2 : 0}
        bbc="$borderColor"
      >
        <TouchableOpacity onPress={toggleMenu}>
          <Paragraph>Click me</Paragraph>
        </TouchableOpacity>
      </XStack>
    </YStack>
  );
};
