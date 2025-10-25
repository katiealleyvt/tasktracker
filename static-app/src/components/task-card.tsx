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
  Tag,
} from "@chakra-ui/react";
import {
  LuCheck,
  LuCircleCheckBig,
  LuPencilLine,
  LuTrash2,
  LuSave,
  LuSun,
  LuTableOfContents,
  LuClipboardList,
} from "react-icons/lu";
import { Status } from "../models/enum";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Task } from "models/task";
import { WindowContext } from "contexts/window-context";
import MobileSwiper from "./ui/mobile-slider";
type TaskProps = React.HTMLAttributes<HTMLElement> & {
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
  const { isMobile } = useContext(WindowContext);
  const createdDate = useMemo(() => {
    return thisTask.createdOn ? new Date(thisTask.createdOn) : undefined;
  }, [thisTask.createdOn]);
  function handleEditToggle() {
    if (isEditing) {
      updateTask(thisTask);
    }
    setIsEditing((prev) => !prev);
  }
  const lightValue = useMemo(() => {
    const percent =
      (thisTask.points - pointAvg) / ((thisTask.points + pointAvg) / 2);
    // lowest 95, highest 78, median 28
    const value = (percent * 2 * -1 + 1) * 17.5 + 60;
    if (value > 95) return 95;
    if (value < 78) return 78;
    return Math.round(value);
  }, [pointAvg, thisTask.points]);
  return isMobile ? (
    <div {...props} style={{ position: "relative", width: "100%" }}>
      <MobileSwiper
        style={{ width: "100%" }}
        actions={[
          {
            name: "delete",
            bgColor: "red.500",
            icon: <LuTrash2 size="30" color="white" />,
            action: () => archiveTask(thisTask),
          },
          {
            name: "complete",
            bgColor: "blue.500",
            icon: <LuCircleCheckBig size="30" color="white" />,
            action: () => completeTask(thisTask),
          },
        ]}
      >
        <Card.Root bg={`hsla(102, 50%, ${lightValue}%, 1.00)`}>
          <Card.Header py="0.5" px="0.5">
            <HStack
              justifyContent={
                thisTask.status === Status.Daily ||
                thisTask.status === Status.Todo
                  ? "space-between"
                  : "end"
              }
              w="100%"
            >
              {(thisTask.status === Status.Daily ||
                thisTask.status === Status.Todo) && (
                <Tag.Root
                  variant="solid"
                  marginLeft="2"
                  bgColor={
                    thisTask.status === Status.Daily
                      ? "yellow.100"
                      : "green.100"
                  }
                  size="lg"
                  color="black"
                >
                  <Tag.Label
                    display="inline-flex"
                    alignItems="center"
                    gap="1.5"
                  >
                    {thisTask.status === Status.Daily ? (
                      <LuSun />
                    ) : (
                      <LuClipboardList />
                    )}
                    {thisTask.status}
                  </Tag.Label>
                </Tag.Root>
              )}
              <IconButton
                size="sm"
                variant={"ghost"}
                onClick={() => handleEditToggle()}
              >
                {isEditing ? <LuSave /> : <LuPencilLine />}
              </IconButton>
            </HStack>
          </Card.Header>
          <Card.Body px="3" py="2">
            <HStack justifyContent={"space-between"} w="100%">
              <Box>
                {isEditing ? (
                  <Input
                    bgColor="whiteAlpha.800"
                    fontSize="md"
                    value={thisTask.name}
                    onChange={(e) =>
                      setTask((prevTask) => ({
                        ...prevTask,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Insert Task"
                  />
                ) : (
                  <Heading fontSize="lg">{thisTask.name}</Heading>
                )}
              </Box>
              <Box w="30%">
                {isEditing ? (
                  <NumberInput.Root
                    fontSize="md"
                    bgColor="whiteAlpha.800"
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
                  <Heading textAlign={"right"} fontSize="lg">
                    {thisTask.points}
                  </Heading>
                )}
              </Box>
            </HStack>
          </Card.Body>
        </Card.Root>
      </MobileSwiper>
    </div>
  ) : (
    <Card.Root w="100%" {...props} bg={`hsla(102, 50%, ${lightValue}%, 1.00)`}>
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
