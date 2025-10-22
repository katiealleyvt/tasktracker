import {
  Box,
  Card,
  HStack,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

export function LoadingCard() {
  return (
    <Card.Root w="100%" h="32">
      <Card.Header py="3" px="3">
        <HStack justifyContent={"end"} w="100%"></HStack>
      </Card.Header>
      <Card.Body>
        <HStack justifyContent={"space-between"} w="100%">
          <Box w="70%">
            <SkeletonText noOfLines={1} />
          </Box>
          <Box w="30%" textAlign={"right"}>
            <SkeletonText noOfLines={1} />
          </Box>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
