import { Card, HStack, Box, Heading, VStack, IconButton, type CardRootProps } from "@chakra-ui/react";
import type { Status, Task } from "~/models/task";
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu"

type StatusProps = CardRootProps & {
  status: Status;
};
export default function StatusCard({ status, ...props }: StatusProps) {
  return (
    <Card.Root w="100%" {...props}>
      <Card.Body>
        <Heading>{status}</Heading>
      </Card.Body>
    </Card.Root>
  );
}
