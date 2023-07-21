import { YStack, XStack } from 'tamagui';

type BoxProps = {
  children?: React.ReactNode;
  flexDirection?: string | { [key: string]: string };
};

export const Box: React.FC<BoxProps> = props => {
  const { children, flexDirection, ...rest } = props;
  return flexDirection === 'col' ? (
    <YStack {...rest}>{children}</YStack>
  ) : (
    <XStack {...rest}>{children}</XStack>
  );
};
