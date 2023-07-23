import React from 'react';
import { SwitchProps as NativeSwitchProps } from 'tamagui';
import { View, Switch as RNSWitch, StyleSheet } from 'react-native';

type SwitchProps = NativeSwitchProps & {
  isEnabled: boolean;
  onToggle: () => void;
};

export const Switch: React.FC<SwitchProps> = ({ isEnabled, onToggle }) => {
  return (
    <View style={styles.container}>
      <RNSWitch
        trackColor={{ false: '#ACACAC', true: '#2C66FF' }}
        thumbColor={isEnabled ? '#fff' : '#fff'}
        ios_backgroundColor="#ACACAC"
        onValueChange={onToggle}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
