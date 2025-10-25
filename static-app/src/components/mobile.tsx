import BoardColumn, { RewardColumn, TaskColumn } from "./board-column";
import { Status } from "models/enum";
import { Toaster } from "./ui/toaster";
import { Container, Tabs, VStack } from "@chakra-ui/react";
import { useState } from "react";

export default function Mobile() {
  const tabs = [
    "Tasks",
    Status.Reward.toString(),
    Status.Archive.toString(),
    Status.Done.toString(),
  ];

  const [currTab, setCurrTab] = useState<string>(tabs[0]);
  return (
    <>
      <Tabs.Root
        lazyMount
        unmountOnExit
        defaultValue={currTab}
        variant="plain"
        onValueChange={(details) => setCurrTab(details.value)}
      >
        <Tabs.List justifyContent={"space-around"} display="flex">
          {tabs.map((name) => {
            return (
              <Tabs.Trigger
                value={name}
                bg={`tabs.${name.toLowerCase()}`}
                color={"black"}
                w="100%"
                borderRadius="0"
                border="solid white 1px"
                justifyContent={"center"}
                opacity={currTab === name ? "1" : ".5"}
                borderBottomRightRadius={"0.7rem"}
                borderBottomLeftRadius={"0.7rem"}
                key={name}
              >
                {name}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
        {tabs.map((name) => {
          return (
            <Tabs.Content value={name} paddingTop="0" key={name}>
              <BoardColumn
                padding="5"
                hideTitle={true}
                status={
                  Object.values(Status).includes(name as Status)
                    ? (name as Status)
                    : undefined
                }
              />
            </Tabs.Content>
          );
        })}
      </Tabs.Root>
      <Toaster />
    </>
  );
}
