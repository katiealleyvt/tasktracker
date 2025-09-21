import {
  Box,
  Card,
  Editable,
  Heading,
  HStack,
  IconButton,
  Status,
  VStack,
  type CardRootProps,
} from "@chakra-ui/react";
import { LuPencilLine, LuShoppingCart, LuTrash2 } from "react-icons/lu";
import type { Reward } from "~/models/reward";
import { Toaster } from "./ui/toaster";
import { useState, type JSX } from "react";

type RewardProps = CardRootProps & {
  reward: Reward;
  buyReward: (reward: Reward) => void;
  archiveReward: (reward: Reward) => void;
};

export default function RewardCard({
  reward,
  buyReward,
  archiveReward,
  ...props
}: RewardProps) {
  return (
    <Card.Root w="100%" {...props}>
      <Card.Header py="0.5" px="0.5">
        <HStack justifyContent={"end"} w="100%">
          <IconButton
            size="sm"
            variant={"ghost"}
            onClick={() => archiveReward(reward)}
          >
            <LuTrash2 />
          </IconButton>
          <IconButton size="sm" variant={"ghost"}>
            <LuPencilLine />
          </IconButton>
          <IconButton
            size="sm"
            variant={"ghost"}
            onClick={() => buyReward(reward)}
          >
            <LuShoppingCart />
          </IconButton>
        </HStack>
      </Card.Header>
      <Card.Body>
        <HStack justifyContent={"space-between"} w="100%">
          <Box>
            <Editable.Root
              defaultValue={reward.name}
              placeholder="Insert Reward Name"
              defaultEdit={reward.name === ""}
            >
              <Heading>
                <Editable.Preview />
              </Heading>
              <Heading>
                <Editable.Input />
              </Heading>
            </Editable.Root>
          </Box>
          <Editable.Root
            defaultValue={reward.cost.toString()}
            placeholder="0"
            defaultEdit={reward.cost === 0}
            textAlign={"right"}
            width="30%"
            justifyContent={"end"}
          >
            <Heading>
              <Editable.Preview />
            </Heading>
            <Heading>
              <Editable.Input textAlign={"right"} />
            </Heading>
          </Editable.Root>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
