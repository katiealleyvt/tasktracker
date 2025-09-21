import {
  Card,
  HStack,
  Box,
  Heading,
  VStack,
  IconButton,
  type CardRootProps,
  Editable,
  Input,
  NumberInput,
} from "@chakra-ui/react";
import { type Task } from "~/models/task";
import {
  LuCheck,
  LuCircleCheckBig,
  LuPencilLine,
  LuTrash2,
} from "react-icons/lu";
import { Status } from "~/models/enum";
import { useState } from "react";

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
  const [isEditing, setIsEditing] = useState(task.name === "");
  const [thisTask, setTask] = useState<Task>(task);
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
          <IconButton
            size="sm"
            variant={"ghost"}
            onClick={() => setIsEditing((prev) => !prev)}
          >
            <LuPencilLine />
          </IconButton>
          {task.status != Status.Done && (
            <IconButton
              size="sm"
              variant={"ghost"}
              onClick={() => completeTask(task)}
            >
              <LuCircleCheckBig />
            </IconButton>
          )}
        </HStack>
      </Card.Header>
      <Card.Body>
        <HStack justifyContent={"space-between"} w="100%">
          <Box>
            {isEditing ? (
              <Input
                value={thisTask.name}
                onChange={(e) =>
                  setTask((prevTask) => ({ ...prevTask, name: e.target.value }))
                }
                placeholder="Insert Task"
              />
            ) : (
              <Heading>{thisTask.name}</Heading>
            )}
          </Box>
          <Box w="30%">
            {isEditing ? (
              <NumberInput.Root
                value={thisTask.points.toString()}
                onValueChange={(valueString) =>
                  setTask((prevTask) => ({
                    ...prevTask,
                    points: !isNaN(valueString.valueAsNumber)
                      ? valueString.valueAsNumber
                      : prevTask.points,
                  }))
                }
              >
                <NumberInput.Input />
              </NumberInput.Root>
            ) : (
              <Heading textAlign={"right"}>{thisTask.points}</Heading>
            )}
          </Box>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
