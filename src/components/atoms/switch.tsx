import React from 'react';
import {
  Switch as NativeSwitch,
  SwitchProps as NativeSwitchProps
} from 'tamagui';

type SwitchProps = NativeSwitchProps & {
  thumbColor?: string;
  backgroundColor?: string;
};

export const Switch: React.FC<SwitchProps> = props => {
  const { ...rest } = props;
  return (
    <NativeSwitch
      borderRadius={'$10'}
      alignItems="center"
      backgroundColor={'#e0dcdc'}
      {...rest}
    >
      <NativeSwitch.Thumb
        animation={'quick'}
        style={{ backgroundColor: '#ACACAC' }}
      />
    </NativeSwitch>
  );
};
