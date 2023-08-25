/**
 * agenda component
 */

import { Flex } from "../layout";
import { Text, Pressable } from "../atoms";

interface AgendaItemProps {
  data: unknown;
}

export const AgendaItem: React.FC<AgendaItemProps> = ({}) => {
  return (
    <Flex>
      <Pressable>
        <Text>hi</Text>
      </Pressable>
    </Flex>
  );
};
