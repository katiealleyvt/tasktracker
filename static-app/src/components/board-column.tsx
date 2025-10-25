import {
  type GridItemProps,
  Button,
  GridItem,
  HStack,
  VStack,
} from "@chakra-ui/react";
import TaskCard from "./task-card";
import { Suspense, useContext, useEffect, useMemo, useState } from "react";
import { Droppable } from "./droppable";
import StatusCard from "./status-card";
import RewardCard from "./reward-card";
import { toaster, Toaster } from "./ui/toaster";
import { NewCard, useCardToggle } from "./new-card";
import { FilterType, Status } from "../models/enum.tsx";
import { RewardContext } from "../contexts/reward-context";
import { TaskContext } from "../contexts/task-context";
import { WalletContext } from "../contexts/wallet-context";
import { Reward } from "../models/reward";
import { Task } from "../models/task";
import { LoadingCard } from "./ui/loading.tsx";
import FilterRow, { Filter } from "./filter-row.tsx";
import { LuCirclePlus } from "react-icons/lu";

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
  const [taskCards, setTaskCards] = useState(
    status
      ? items.filter((item) => item.status === status)
      : items.filter(
          (item) =>
            item.status !== Status.Archive &&
            item.status !== Status.Reward &&
            item.status !== Status.Done
        )
  );
  useEffect(() => {
    //if this is tasks tab
    if (!status) {
      filterTasks();
    } else {
      setTaskCards(items.filter((item) => item.status === status));
    }
  }, [items]);
  // calculate task points averages to pass to each card
  const pointAvg = useMemo(() => {
    let sum = 0;
    taskCards.forEach((f) => (sum += f.points));
    return sum / taskCards.length;
  }, [taskCards]);

  const [filters, setFilters] = useState<Filter[]>([
    {
      name: "Daily",
      value: Status.Daily,
      color: "pink.400",
      isSelected: true,
      type: FilterType.Status,
    },
    {
      name: "Todo",
      value: Status.Todo,
      color: "blue.400",
      isSelected: true,
      type: FilterType.Status,
    },
  ]);
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
    if (task.status === Status.Archive) {
      deleteTask(task._id);
    } else {
      archiveTask(task);
    }
    toaster.create({
      title: "Task removed.",
      duration: 3000,
    });
  }

  function createCard(t: Task) {
    createTask(t);
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
  function filterTasks(filter?: Filter, isSelected?: boolean) {
    let filteredItems: Task[] = [];
    if (filter && filter.type === FilterType.Status) {
      if (isSelected) {
        filteredItems = items.filter(
          (i) => i.status === (filter.value as Status)
        );
      }
    }
    filters.forEach((f) => {
      if (f !== filter && f.isSelected) {
        if (f.type === FilterType.Status) {
          const otherItems = items.filter(
            (i) => i.status === (f.value as Status)
          );
          filteredItems = filteredItems.concat(otherItems);
        }
      }
    });

    setTaskCards(filteredItems);
    if (filter && isSelected !== undefined) {
      setFilters((prev) =>
        prev.map((p) => {
          return p === filter ? { ...p, isSelected } : p;
        })
      );
    }

    return filteredItems;
  }

  const { show, toggle } = useCardToggle();

  return (
    <>
      {!isLoading ? (
        <>
          <HStack w="100%">
            <FilterRow
              filters={filters}
              defaultValue={[Status.Daily.toString(), Status.Todo.toString()]}
              action={(filter, isSelected) => filterTasks(filter, isSelected)}
            />
            <NewCard.Toggle toggle={toggle} />
          </HStack>
          <NewCard.TaskRoot
            createNew={createCard}
            show={show}
            toggle={toggle}
          />
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
  const { show, toggle } = useCardToggle();

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
  function createCard(reward: Reward) {
    createReward(reward);
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
          <HStack w="100%">
            <NewCard.Toggle toggle={toggle} />
          </HStack>
          <NewCard.RewardRoot
            createNew={createCard}
            show={show}
            toggle={toggle}
          />
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
          {
            //<NewCard createNew={createCard} />
          }
        </>
      ) : (
        <LoadingCard />
      )}
    </>
  );
}
