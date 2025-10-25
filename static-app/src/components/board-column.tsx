import { type GridItemProps, GridItem, VStack } from "@chakra-ui/react";
import TaskCard from "./task-card";
import { Suspense, useContext, useMemo, useState } from "react";
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
import { LoadingCard } from "./ui/loading.tsx";

type Props = GridItemProps & {
  status?: Status;
  hideTitle?: boolean;
};
export default function BoardColumn({ status, hideTitle, ...props }: Props) {
  return (
    <GridItem {...props}>
      <VStack gap="5" w="100%">
        {!hideTitle && status && <StatusCard status={status} />}
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
  const {
    items,
    isLoading,
    updateTask,
    createTask,
    deleteTask,
    duplicateTask,
  } = useContext(TaskContext);
  const { wallet, setWallet } = useContext(WalletContext);
  console.log("status", status);
  const taskCards = status
    ? items.filter((item) => item.status === status)
    : items.filter(
        (item) =>
          item.status !== Status.Archive &&
          item.status !== Status.Reward &&
          item.status !== Status.Done
      );
  // calculate task points averages to pass to each card
  const pointAvg = useMemo(() => {
    let sum = 0;
    taskCards.forEach((f) => (sum += f.points));
    return sum / taskCards.length;
  }, [taskCards]);

  function completeTask(task: Task) {
    if (task.status === Status.Daily) {
      duplicateTask(task);
    }
    updateTask(task._id!, { status: Status.Done });
    const newAmount = wallet.amount + task.points;
    setWallet({
      amount: newAmount,
    });
    toaster.create({
      title: `${task.points} 🪙 Earned 🎉 🎉 🎉`,
      duration: 6000,
      type: "success",
      description: `Task completed! You now have ${newAmount} 🪙 in your wallet.`,
    });
  }

  function archiveTask(task: Task) {
    updateTask(task._id!, { status: Status.Archive });
    toaster.create({
      title: "Task archived.",
      duration: 3000,
    });
  }

  function removeCard(task: Task) {
    archiveTask(task);
    toaster.create({
      title: "Task removed.",
      duration: 3000,
    });
  }

  function createCard() {
    createTask(status ?? Status.Todo);
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
      {!isLoading ? (
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
              pointAvg={pointAvg}
            />
          ))}
          <NewCard createNew={createCard} />
        </>
      ) : (
        <>
          <LoadingCard />
        </>
      )}
    </>
  );
}
export function RewardColumn({ ...props }: GridItemProps) {
  const { items, isLoading, updateReward, createReward, deleteReward } =
    useContext(RewardContext);
  const { wallet, setWallet } = useContext(WalletContext);

  const costAvg = useMemo(() => {
    let sum = 0;
    items.forEach((f) => (sum += f.cost));
    console.log(sum / items.length);
    return sum / items.length;
  }, [items]);

  function buyReward(reward: Reward) {
    if (wallet.amount < reward.cost) {
      toaster.create({
        title: "Not enough points to buy this reward.",
        duration: 3000,
        type: "error",
      });
      return;
    }
    archiveReward(reward);
    setWallet({ amount: wallet.amount - reward.cost });
    toaster.create({
      title: "Reward purchased!",
      duration: 3000,
      type: "success",
    });
  }
  function archiveReward(reward: Reward) {
    updateReward(reward._id!, { isArchived: true });
    toaster.create({
      title: "Reward removed.",
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
      {!isLoading ? (
        <>
          {items.map((item) =>
            item.isArchived ? undefined : (
              <RewardCard
                reward={item}
                key={item._id?.toString() ?? item.name}
                buyReward={() => buyReward(item)}
                archiveReward={() => archiveReward(item)}
                updateReward={(item) => updateCard(item)}
                costAvg={costAvg}
                {...props}
              />
            )
          )}
          <NewCard createNew={createCard} />
        </>
      ) : (
        <LoadingCard />
      )}
    </>
  );
}
