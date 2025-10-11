import BoardColumn, { RewardColumn, TaskColumn } from "./board-column";
import { Status } from "models/enum";
import { Toaster } from "./ui/toaster";
import { Container, Tabs, VStack } from "@chakra-ui/react";

export default function Mobile() {
  return (
    <>
      <Tabs.Root
        lazyMount
        unmountOnExit
        defaultValue={Status.Daily}
        variant="plain"
      >
        <Tabs.List justifyContent={"space-around"} display="flex">
          <Tabs.Trigger
            value={Status.Daily}
            bg="status.daily"
            color={"black"}
            w="100%"
            borderRadius="0"
            border="solid white 1px"
            justifyContent={"center"}
          >
            {Status.Daily}
          </Tabs.Trigger>
          <Tabs.Trigger
            value={Status.Todo}
            bg="status.todo"
            color={"black"}
            w="100%"
            borderRadius="0"
            border="solid white 1px"
            justifyContent={"center"}
          >
            {Status.Todo}
          </Tabs.Trigger>
          <Tabs.Trigger
            value={Status.Done}
            bg="status.done"
            color={"black"}
            w="100%"
            borderRadius="0"
            border="solid white 1px"
            justifyContent={"center"}
          >
            {Status.Done}
          </Tabs.Trigger>

          <Tabs.Trigger
            value={Status.Reward}
            bg="status.rewards"
            color={"black"}
            w="100%"
            borderRadius="0"
            border="solid white 1px"
            justifyContent={"center"}
          >
            {Status.Reward}
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value={Status.Daily}>
          <TaskColumn status={Status.Daily} />
        </Tabs.Content>
        <Tabs.Content value={Status.Todo}>
          <TaskColumn status={Status.Todo} />
        </Tabs.Content>
        <Tabs.Content value={Status.Done}>
          <TaskColumn status={Status.Done} />
        </Tabs.Content>
        <Tabs.Content value={Status.Reward}>
          <RewardColumn />
        </Tabs.Content>
      </Tabs.Root>
      <Toaster />
    </>
  );
}
