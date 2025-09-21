import {
  Card,
  HStack,
  Box,
  Heading,
  VStack,
  IconButton,
  type CardRootProps,
  Editable,
} from "@chakra-ui/react";
import { type Task } from "~/models/task";
import { LuCheck, LuPencilLine, LuTrash2 } from "react-icons/lu";
import { Status } from "~/models/enum";

type TaskProps = CardRootProps & {
  task: Task;
  completeTask: (task: Task) => void;
  archiveTask: (task: Task) => void;
};

export default function TaskCard({
  task,
  completeTask,
  archiveTask,
  ...props
}: TaskProps) {
  return (
    <Card.Root w="100%" {...props}>
      <Card.Header py="0.5" px="0.5">
        <HStack justifyContent={"end"} w="100%">
          <IconButton
            size="sm"
            variant={"ghost"}
            onClick={() => archiveTask(task)}
          >
            <LuTrash2 />
          </IconButton>
          <IconButton size="sm" variant={"ghost"}>
            <LuPencilLine />
          </IconButton>
          {task.status != Status.Done && (
            <IconButton
              size="sm"
              variant={"ghost"}
              onClick={() => completeTask(task)}
            >
              <LuCheck />
            </IconButton>
          )}
        </HStack>
      </Card.Header>
      <Card.Body>
        <HStack justifyContent={"space-between"} w="100%">
          <Box>
            <Editable.Root
              defaultValue={task.name}
              placeholder="Insert Reward Name"
              defaultEdit={task.name === ""}
            >
              <Heading>
                <Editable.Preview />
              </Heading>
              <Heading>
                <Editable.Input />
              </Heading>
            </Editable.Root>
          </Box>
          <Editable.Root
            defaultValue={task.points.toString()}
            placeholder="Insert Reward Name"
            defaultEdit={task.points === 0}
            justifyContent={"end"}
            width="30%"
          >
            <Heading>
              <Editable.Preview />
            </Heading>
            <Heading>
              <Editable.Input textAlign={"right"} />
            </Heading>
          </Editable.Root>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
