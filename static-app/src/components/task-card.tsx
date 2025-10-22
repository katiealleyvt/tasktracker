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
import {
  LuCheck,
  LuCircleCheckBig,
  LuPencilLine,
  LuTrash2,
  LuSave,
} from "react-icons/lu";
import { Status } from "../models/enum";
import { useEffect, useMemo, useRef, useState } from "react";
import { Task } from "models/task";

type TaskProps = CardRootProps & {
  task: Task;
  completeTask: (task: Task) => void;
  archiveTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  pointAvg: number;
};

export default function TaskCard({
  task,
  completeTask,
  archiveTask,
  updateTask,
  pointAvg,
  ...props
}: TaskProps) {
  const [isEditing, setIsEditing] = useState(task.name === "");
  const [thisTask, setTask] = useState<Task>(task);

  function handleEditToggle() {
    if (isEditing) {
      updateTask(thisTask);
    }
    setIsEditing((prev) => !prev);
  }
  const lightValue = useMemo(() => {
    const percent =
      (thisTask.points - pointAvg) / ((thisTask.points + pointAvg) / 2);
    // lowest 95, highest 60, median 77.5
    const value = (percent * 2 * -1 + 1) * 17.5 + 60;
    if (value > 95) return 95;
    if (value < 60) return 60;
    return Math.round(value);
  }, [pointAvg, thisTask.points]);
  return (
    <Card.Root w="100%" {...props} bg={`hsla(263, 50%, ${lightValue}%, 1.00)`}>
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
            onClick={() => handleEditToggle()}
          >
            {isEditing ? <LuSave /> : <LuPencilLine />}
          </IconButton>
          {task.status !== Status.Done && !isEditing && (
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
                fontSize="md"
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
                fontSize="md"
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
