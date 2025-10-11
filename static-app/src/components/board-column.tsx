import { type GridItemProps, GridItem, VStack } from "@chakra-ui/react";
import TaskCard from "./task-card";
import { useContext, useState } from "react";
import { Droppable } from "./droppable";
import StatusCard from "./status-card";
import RewardCard from "./reward-card";
import { toaster, Toaster } from "./ui/toaster";
import NewCard from "./new-card";
import { Status } from "../models/enum.tsx";
import { RewardContext } from "../contexts/reward-context";
import { TaskContext } from "../contexts/task-context";
import { WalletContext } from "../contexts/wallet-context";
import { Reward } from "../models/reward";
import { Task } from "../models/task";

type Props = GridItemProps & {
  status: Status;
  hideTitle?: boolean;
};
export default function BoardColumn({ status, hideTitle, ...props }: Props) {
  return (
    <GridItem {...props}>
      <VStack gap="5" w="100%">
        {!hideTitle && <StatusCard status={status} />}
        {status !== Status.Reward ? (
          <TaskColumn status={status} />
        ) : (
          <RewardColumn />
        )}
      </VStack>
    </GridItem>
  );
}

export function TaskColumn({ status, ...props }: Props) {
  const { items, updateTask, createTask, deleteTask, duplicateTask } =
    useContext(TaskContext);
  const { wallet, setWallet } = useContext(WalletContext);
  const taskCards = items.filter((item) => item.status === status);

  function completeTask(task: Task) {
    if (task.status === Status.Daily) {
      duplicateTask(task);
    }
    updateTask(task._id!, { status: Status.Done });
    setWallet({
      amount: wallet.amount + task.points,
    });
    toaster.create({
      title: "Task completed!",
      duration: 3000,
      type: "success",
    });
  }

  function archiveTask(task: Task) {
    updateTask(task._id!, { status: Status.Done });
    toaster.create({
      title: "Task archived.",
      duration: 3000,
    });
  }

  function removeCard(task: Task) {
    deleteTask(task._id!);
    toaster.create({
      title: "Task deleted.",
      duration: 3000,
    });
  }

  function createCard() {
    createTask(status);
    toaster.create({
      title: "Task created.",
      duration: 3000,
    });
  }

  function updateCard(task: Task) {
    updateTask(task._id!, { ...task });
    toaster.create({
      title: "Task updated.",
      duration: 3000,
    });
  }
  return (
    <>
      {taskCards.map((item) => (
        <TaskCard
          task={item}
          key={item._id?.toString() ?? item.name}
          completeTask={(item) => {
            completeTask(item);
          }}
          archiveTask={(item) => {
            removeCard(item);
          }}
          updateTask={(item) => updateCard(item)}
        />
      ))}
      <NewCard createNew={createCard} />
    </>
  );
}
export function RewardColumn({ ...props }: GridItemProps) {
  const { items, updateReward, createReward, deleteReward } =
    useContext(RewardContext);
  const { wallet, setWallet } = useContext(WalletContext);
  function buyReward(reward: Reward) {
    if (wallet.amount < reward.cost) {
      toaster.create({
        title: "Not enough points to buy this reward.",
        duration: 3000,
        type: "error",
      });
      return;
    }
    deleteReward(reward._id!);
    setWallet({ amount: wallet.amount - reward.cost });
    toaster.create({
      title: "Reward purchased!",
      duration: 3000,
      type: "success",
    });
  }
  function archiveReward(reward: Reward) {
    deleteReward(reward._id!);
    toaster.create({
      title: "Reward archived.",
      duration: 3000,
    });
  }
  function createCard() {
    createReward();
    toaster.create({
      title: "Reward created.",
      duration: 3000,
    });
  }
  function updateCard(reward: Reward) {
    updateReward(reward._id!, { ...reward });
    toaster.create({
      title: "Reward updated.",
      duration: 3000,
    });
  }
  return (
    <>
      {items.map((item) =>
        item.isArchived ? undefined : (
          <RewardCard
            reward={item}
            key={item._id?.toString() ?? item.name}
            buyReward={() => buyReward(item)}
            archiveReward={() => archiveReward(item)}
            updateReward={(item) => updateCard(item)}
            {...props}
          />
        )
      )}
      <NewCard createNew={createCard} />
    </>
  );
}
