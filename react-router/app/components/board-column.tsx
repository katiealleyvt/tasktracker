import { type GridItemProps, GridItem, VStack } from "@chakra-ui/react";
import StatusCard from "./status-card";
import TaskCard from "./task-card";
import { Status, Task } from "~/models/task";
import { useContext, useState } from "react";
import { TaskContext } from "~/contexts/task-context";
import { Droppable } from "./droppable";

type Props = GridItemProps & {
  status: Status;
};
export default function BoardColumn({ status, ...props }: Props) {
  const items = useContext(TaskContext);
  const taskCards = items.filter((item) => (
    item.status === status
  ))

  return (
    <GridItem>
      <VStack gap="5" w="100%">
        <StatusCard status={status} />
        {taskCards.map(item => (
            <TaskCard task={item} key={item.id}/>
        ))}
      </VStack>
    </GridItem>
  );

  
}
