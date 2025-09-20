import {
  Box,
  Card,
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
import type { JSX } from "react";

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
            <Heading>{reward.name}</Heading>
          </Box>
          <Box>
            <VStack>
              <Heading>{reward.cost}</Heading>
            </VStack>
          </Box>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
