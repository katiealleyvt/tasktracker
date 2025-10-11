import BoardColumn, { RewardColumn, TaskColumn } from "./board-column";
import { Status } from "models/enum";
import { Toaster } from "./ui/toaster";
import { Container, Tabs, VStack } from "@chakra-ui/react";
import { useState } from "react";

export default function Mobile() {
  const [selected, setSelected] = useState<Status>(Status.Daily);
  return (
    <>
      <Tabs.Root
        lazyMount
        unmountOnExit
        defaultValue={selected}
        variant="plain"
        onValueChange={(details) => setSelected(details.value as Status)}
      >
        <Tabs.List justifyContent={"space-around"} display="flex">
          {Object.values(Status).map((status) => {
            if (status !== Status.Archive) {
              return (
                <Tabs.Trigger
                  value={status}
                  bg={`status.${status.toLowerCase()}`}
                  color={"black"}
                  w="100%"
                  borderRadius="0"
                  border="solid white 1px"
                  justifyContent={"center"}
                  opacity={selected === status ? "1" : ".5"}
                  borderBottomRightRadius={"0.7rem"}
                  borderBottomLeftRadius={"0.7rem"}
                >
                  {status}
                </Tabs.Trigger>
              );
            }
            return undefined;
          })}
        </Tabs.List>
        {Object.values(Status).map((status) => {
          if (status !== Status.Archive) {
            return (
              <Tabs.Content value={status} paddingTop="0">
                <BoardColumn status={status} padding="5" hideTitle={true} />
              </Tabs.Content>
            );
          }
          return undefined;
        })}
      </Tabs.Root>
      <Toaster />
    </>
  );
}
