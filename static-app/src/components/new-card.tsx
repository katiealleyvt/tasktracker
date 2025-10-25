import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  NumberInput,
  VStack,
  type CardRootProps,
} from "@chakra-ui/react";
import { Status } from "models/enum";
import { Item } from "models/other";
import { Reward } from "models/reward";
import { Task } from "models/task";
import { ObjectId } from "mongoose";
import { useEffect, useMemo, useState } from "react";
import { LuCheck, LuCirclePlus } from "react-icons/lu";

export function useCardToggle(initial: boolean = false) {
  const [show, setShow] = useState<boolean>(initial);
  const toggle = () => {
    setShow((prev) => !prev);
  };

  return {
    show,
    toggle,
  };
}

type TaskRootProps = CardRootProps & {
  createNew: (t: Task) => void;
  show: boolean;
  status?: Status;
  toggle: () => void;
};
function TaskRoot({ createNew, toggle, status, ...props }: TaskRootProps) {
  const [newTask, setNewTask] = useState<Task>(
    new Task("", 0, status ? status : Status.Todo)
  );

  function submitCard() {
    createNew(newTask);
    toggle();
    setNewTask(new Task("", 0, status ? status : Status.Todo));
  }
  function setNewItem({ key, value }: { key: string; value: any }) {
    if (key === "name" && typeof value === "string") {
      setNewTask((prevTask) => ({ ...prevTask, name: value }));
    } else if (key === "number" && typeof value === "number") {
      setNewTask((prevTask) => ({
        ...prevTask,
        points: value,
        number: value,
      }));
    }
  }
  return (
    <Root
      key={"task-root"}
      submitCard={submitCard}
      newItem={newTask}
      setNewItem={setNewItem}
      {...props}
    />
  );
}
type RewardRootProps = CardRootProps & {
  createNew: (r: Reward) => void;
  show: boolean;
  toggle: () => void;
};
function RewardRoot({ createNew, toggle, ...props }: RewardRootProps) {
  const [newReward, setNewReward] = useState<Reward>(new Reward("", 0, false));
  function submitCard() {
    createNew(newReward);
    toggle();
    setNewReward(new Reward("", 0, false));
  }
  function setNewItem({ key, value }: { key: string; value: any }) {
    if (key === "name" && typeof value === "string") {
      setNewReward((prevReward) => ({ ...prevReward, name: value }));
    } else if (key === "number" && typeof value === "number") {
      setNewReward((prevTask) => ({
        ...prevTask,
        cost: value,
        number: value,
      }));
    }
  }
  return (
    <Root
      key={"reward-root"}
      submitCard={submitCard}
      newItem={newReward}
      setNewItem={setNewItem}
      {...props}
    />
  );
}
type RootProps = CardRootProps & {
  submitCard: () => void;
  newItem: Item;
  setNewItem: ({ key, value }) => void;
  show: boolean;
};
function Root({ submitCard, newItem, setNewItem, show, ...props }: RootProps) {
  return (
    <Card.Root display={show ? undefined : "none"}>
      <Card.Header py="0.5" px="0.5">
        <HStack justifyContent={"end"} w="100%">
          <IconButton size="sm" variant={"ghost"} onClick={submitCard}>
            <LuCheck />
          </IconButton>
        </HStack>
      </Card.Header>
      <Card.Body px="3" py="2">
        <HStack justifyContent={"space-between"} w="100%">
          <Box>
            <Input
              bgColor="whiteAlpha.800"
              fontSize="md"
              placeholder="Insert Name"
              defaultValue=""
              value={newItem.name}
              onChange={(e) =>
                setNewItem({ key: "name", value: e.target.value })
              }
            />
          </Box>
          <Box w="30%">
            <NumberInput.Root
              fontSize="md"
              bgColor="whiteAlpha.800"
              defaultValue={"0"}
              value={newItem.number?.toString()}
              onValueChange={(value) =>
                setNewItem({ key: "number", value: value.valueAsNumber })
              }
            >
              <NumberInput.Input placeholder="Insert Value" />
            </NumberInput.Root>
          </Box>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
type ToggleProps = {
  toggle: () => void;
};

function Toggle({ toggle }: ToggleProps) {
  return (
    <Button onClick={toggle} variant={"surface"} gap={2}>
      <LuCirclePlus /> Create New
    </Button>
  );
}
export const NewCard = {
  TaskRoot,
  RewardRoot,
  Toggle,
};
