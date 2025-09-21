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
import { WalletContext } from "~/contexts/wallet-context";
import NewCard from "./new-card";

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
  const { items, updateTask, createTask } = useContext(TaskContext);
  const { wallet, setWallet } = useContext(WalletContext);
  const taskCards = items.filter((item) => item.status === status);
  function completeTask(task: Task) {
    updateTask(task._id!, { status: Status.Done });
    setWallet((prevWallet) => ({
      ...prevWallet,
      amount: prevWallet.amount + task.points,
    }));
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
  function createCard() {
    createTask(status);
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
            archiveTask(item);
          }}
        />
      ))}
      <NewCard createNew={createCard} />
    </>
  );
}
function RewardColumn({ ...props }: GridItemProps) {
  const { items, setItems } = useContext(RewardContext);
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
    setItems(
      items.map((item) =>
        item._id === reward._id ? { ...item, isArchived: true } : item
      )
    );
    setWallet({ amount: wallet.amount - reward.cost });
    toaster.create({
      title: "Reward purchased!",
      duration: 3000,
      type: "success",
    });
  }
  function archiveReward(reward: Reward) {
    setItems(
      items.map((item) =>
        item._id === reward._id ? { ...item, isArchived: true } : item
      )
    );
    toaster.create({
      title: "Reward archived.",
      duration: 3000,
    });
  }
  function createCard() {
    setItems([
      ...items,
      {
        name: "",
        cost: 0,
        isArchived: false,
      },
    ]);
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
            {...props}
          />
        )
      )}
      <NewCard createNew={createCard} />
    </>
  );
}
