import {
  Box,
  Card,
  Editable,
  Heading,
  HStack,
  IconButton,
  Input,
  NumberInput,
  Status,
  VStack,
  type CardRootProps,
} from "@chakra-ui/react";
import { LuPencilLine, LuSave, LuShoppingCart, LuTrash2 } from "react-icons/lu";
import type { Reward } from "./models/reward";
import { Toaster } from "./ui/toaster";
import { useState, type JSX } from "react";

type RewardProps = CardRootProps & {
  reward: Reward;
  buyReward: (reward: Reward) => void;
  archiveReward: (reward: Reward) => void;
  updateReward: (reward: Reward) => void;
};

export default function RewardCard({
  reward,
  buyReward,
  archiveReward,
  updateReward,
  ...props
}: RewardProps) {
  const [isEditing, setIsEditing] = useState(reward.name === "");
  const [thisReward, setReward] = useState<Reward>(reward);

  function handleEditToggle() {
    if (isEditing) {
      updateReward(thisReward);
    }
    setIsEditing((prev) => !prev);
  }
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
          <IconButton
            size="sm"
            variant={"ghost"}
            onClick={() => handleEditToggle()}
          >
            {isEditing ? <LuSave /> : <LuPencilLine />}
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
            {isEditing ? (
              <Input
                value={thisReward.name}
                onChange={(e) =>
                  setReward((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Insert Reward"
              />
            ) : (
              <Heading>{thisReward.name}</Heading>
            )}
          </Box>
          <Box w="30%" textAlign={"right"}>
            {isEditing ? (
              <NumberInput.Root
                value={thisReward.cost.toString()}
                onValueChange={(valueString) =>
                  setReward((prev) => ({
                    ...prev,
                    cost: !isNaN(valueString.valueAsNumber)
                      ? valueString.valueAsNumber
                      : prev.cost,
                  }))
                }
              >
                <NumberInput.Input />
              </NumberInput.Root>
            ) : (
              <Heading textAlign={"right"}>{thisReward.cost}</Heading>
            )}
          </Box>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
