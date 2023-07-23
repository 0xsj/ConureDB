import { H2, XStack } from 'tamagui';

export const Logo = () => {
  const logoSize = 30; // Adjust the size of the logo here

  return (
    <XStack
      backgroundColor={'#2C66FF'}
      width={logoSize}
      height={logoSize}
      borderRadius="50%"
      justifyContent="center"
      alignItems="center"
    >
      <H2
        alignSelf="center"
        color={'#fff'}
        fontFamily={'$silkscreen'}
        textAlign="center"
        position="absolute"
        m={0}
        p={0}
      >
        R
      </H2>
    </XStack>
  );
};
