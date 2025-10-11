import { Container, HStack, Grid, GridItem } from "@chakra-ui/react";
import BoardColumn from "./board-column";
import { Status } from "models/enum";
import { Toaster } from "./ui/toaster";

export default function Desktop() {
  return (
    <Container py="10" maxW={{ base: "100%", "2xl": "80%" }}>
      <HStack>
        <Grid templateColumns={"repeat(3, 1fr) 10rem 30%"} gap="5" w="100%">
          <BoardColumn status={Status.Daily} />
          <BoardColumn status={Status.Todo} />
          <BoardColumn status={Status.Done} />
          <GridItem />
          <BoardColumn status={Status.Reward} />
        </Grid>
      </HStack>
      <Toaster />
    </Container>
  );
}
