import React from 'react';
import { Switch as NativeSwitch } from 'tamagui';

interface SwitchProps {
  thumbColor?: string;
  backgroundColor?: string;
}

export const Switch: React.FC<SwitchProps> = props => {
  const { thumbColor, backgroundColor, ...rest } = props;
  return (
    <NativeSwitch backgroundColor={backgroundColor} {...rest}>
      <NativeSwitch.Thumb animation={'quick'} backgroundColor={thumbColor} />
    </NativeSwitch>
  );
};
