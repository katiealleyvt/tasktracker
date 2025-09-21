import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Status,
  VStack,
  type CardRootProps,
} from "@chakra-ui/react";
import { LuCirclePlus } from "react-icons/lu";

type Props = CardRootProps & {
  createNew: () => void;
};

export default function NewCard({ createNew, ...props }: Props) {
  return (
    <Card.Root
      w="100%"
      bg="transparent"
      borderColor="brand.darkPurple"
      _hover={{
        cursor: "pointer",
        bg: "brand.mutedBlack",
      }}
      color="brand.darkPurple"
      fontSize="4xl"
      onClick={createNew}
      {...props}
    >
      <Card.Body>
        <Flex w="100%" textAlign={"center"} justifyContent={"center"}>
          <LuCirclePlus />
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}
