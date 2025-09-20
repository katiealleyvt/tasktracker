import { type GridItemProps, GridItem, VStack } from "@chakra-ui/react";
import TaskCard from "./task-card";
import { Task } from "~/models/task";
import { useContext, useState } from "react";
import { TaskContext } from "~/contexts/task-context";
import { Droppable } from "./droppable";
import StatusCard from "./status-card";
import { RewardContext } from "~/contexts/reward-context";
import RewardCard from "./reward-card";
import { Status } from "~/models/enum";
import type { Reward } from "~/models/reward";
import { toaster, Toaster } from "./ui/toaster";

type Props = GridItemProps & {
  status: Status;
};
export default function BoardColumn({ status, ...props }: Props) {
  return (
    <GridItem>
      <VStack gap="5" w="100%">
        <StatusCard status={status} />
        {status !== Status.Reward ? (
          <TaskColumn status={status} />
        ) : (
          <RewardColumn />
        )}
      </VStack>
    </GridItem>
  );
}

function TaskColumn({ status, ...props }: Props) {
  const { items, setItems } = useContext(TaskContext);
  const taskCards = items.filter((item) => item.status === status);
  function completeTask(task: Task) {
    setItems(
      items.map((item) =>
        item.id === task.id ? { ...item, status: Status.Done } : item
      )
    );
    toaster.create({
      title: "Task completed!",
      duration: 3000,
      type: "success",
    });
  }
  function archiveTask(task: Task) {
    setItems(
      items.map((item) =>
        item.id === task.id ? { ...item, status: Status.Done } : item
      )
    );
    toaster.create({
      title: "Task archived.",
      duration: 3000,
    });
  }
  return (
    <>
      {taskCards.map((item) => (
        <TaskCard
          task={item}
          key={item.id}
          completeTask={(item) => {
            completeTask(item);
          }}
          archiveTask={(item) => {
            archiveTask(item);
          }}
        />
      ))}
    </>
  );
}
function RewardColumn({ ...props }: GridItemProps) {
  const { items, setItems } = useContext(RewardContext);
  function buyReward(reward: Reward) {
    setItems(
      items.map((item) =>
        item.id === reward.id ? { ...item, isArchived: true } : item
      )
    );
    toaster.create({
      title: "Reward purchased!",
      duration: 3000,
      type: "success",
    });
  }
  function archiveReward(reward: Reward) {
    setItems(
      items.map((item) =>
        item.id === reward.id ? { ...item, isArchived: true } : item
      )
    );
    toaster.create({
      title: "Reward archived.",
      duration: 3000,
    });
  }
  return (
    <>
      {items.map((item) =>
        item.isArchived ? undefined : (
          <RewardCard
            reward={item}
            key={item.id}
            buyReward={() => buyReward(item)}
            archiveReward={() => archiveReward(item)}
            {...props}
          />
        )
      )}
    </>
  );
}
