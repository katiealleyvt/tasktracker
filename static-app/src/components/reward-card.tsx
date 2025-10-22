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
import { Toaster } from "./ui/toaster";
import { useMemo, useState, type JSX } from "react";
import { Reward } from "models/reward";

type RewardProps = CardRootProps & {
  reward: Reward;
  buyReward: (reward: Reward) => void;
  archiveReward: (reward: Reward) => void;
  updateReward: (reward: Reward) => void;
  costAvg: number;
};

export default function RewardCard({
  reward,
  buyReward,
  archiveReward,
  updateReward,
  costAvg,
  ...props
}: RewardProps) {
  const [isEditing, setIsEditing] = useState(reward.name === "");
  const [thisReward, setReward] = useState<Reward>(reward);

  const lightValue = useMemo(() => {
    const percent =
      (thisReward.cost - costAvg) / ((thisReward.cost + costAvg) / 2);
    // lowest 95, highest 70, median 82.5
    const value = (percent * 2 * -1 + 1) * 12.5 + 60;
    if (value > 95) return 95;
    if (value < 70) return 70;
    return Math.round(value);
  }, [costAvg, thisReward.cost]);

  function handleEditToggle() {
    if (isEditing) {
      updateReward(thisReward);
    }
    setIsEditing((prev) => !prev);
  }
  return (
    <Card.Root w="100%" {...props} bg={`hsla(330, 100%, ${lightValue}%, 1.00)`}>
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
                fontSize="md"
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
                fontSize="md"
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
