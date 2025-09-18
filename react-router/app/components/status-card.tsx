import { Card, HStack, Box, Heading, VStack, IconButton, useToken, type CardRootProps } from "@chakra-ui/react";
import { Status, type Task } from "~/models/task";
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu"

type StatusProps = CardRootProps & {
  status: Status;
};
export default function StatusCard({ status, ...props }: StatusProps) {
const [color] = useToken("colors", [`status.${status.toLowerCase()}`]);
  return (
    <Card.Root w="100%" {...props} bg={color} color={"black"} textAlign={"center"}>
      <Card.Body>
        <Heading>{status}</Heading>
      </Card.Body>
    </Card.Root>
  );
}
