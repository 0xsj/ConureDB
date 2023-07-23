import { useState } from 'react';
import { Button, H1, Sheet } from 'tamagui';
import { ChevronDown, Plus } from '@tamagui/lucide-icons';
import { Box } from '../atoms';

export function AddSheet() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(0);
  return (
    <Box>
      <Button
        backgroundColor={'#2C66FF'}
        size="$6"
        icon={<Plus color="#fff" size={'$2'} />}
        circular
        onPress={() => setOpen(x => !x)}
      />
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame ai="center" jc="center">
          <Sheet.Handle />
          <H1 ta="center">Add Sheet</H1>

          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false);
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </Box>
  );
}
