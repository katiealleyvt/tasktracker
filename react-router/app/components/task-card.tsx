import {
  Card,
  HStack,
  Box,
  Heading,
  VStack,
  IconButton,
  type CardRootProps,
} from "@chakra-ui/react";
import type { Task } from "~/models/task";
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu"

type TaskProps = CardRootProps & {
  task: Task;
};
export default function TaskCard({ task, ...props }: TaskProps) {
  return (
    <Card.Root w="100%" {...props}>
        <Card.Header py="0.5" px="0.5">
            <HStack justifyContent={"end"} w="100%">
            <IconButton size="sm" variant={"ghost"}>
              <LuPencilLine />
            </IconButton>
        </HStack>
        </Card.Header>
      <Card.Body>
        <HStack justifyContent={"space-between"} w="100%">
          <Box>
            <Heading>{task.name}</Heading>
          </Box>
          <Box>
            <VStack>
              <Heading>{task.points}</Heading>
            </VStack>
          </Box>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
