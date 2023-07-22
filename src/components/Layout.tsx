import { ReactNode, useEffect, useState } from 'react';
import {
  Button,
  isClient,
  Paragraph,
  XStack,
  YStack,
  AnimatePresence
} from 'tamagui';
import { Menu } from '@tamagui/lucide-icons';

interface ILayout {
  children: ReactNode;
}

export const Layout = ({ children }: ILayout) => {
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
    <YStack f={1}>
      <AnimatePresence>
        {openMenu && (
          <YStack
            key={'drawer-menu'}
            onPress={toggleMenu}
            position={'absolute'}
            backgroundColor={'$background'}
            width={'100%'}
            height={'100%'}
            animation={'quick'}
            x={0}
            exitStyle={{ x: -1000 }}
            enterStyle={{ x: -1000 }}
            zi={5000}
            style={{ opacity: 0.9 }}
          >
            {
              // menu container
              <YStack flex={1} justifyContent="center" alignItems="center">
                <Paragraph bbc={'$borderColor'}>Menu</Paragraph>
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
        space={5}
        paddingHorizontal="$2"
      >
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
          onPress={toggleMenu}
        />
      </XStack>
      <YStack height={54} w="100%" />
      {children}
    </YStack>
  );
};
