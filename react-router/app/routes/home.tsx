import {
  Box,
  Card,
  Container,
  Heading,
  HStack,
  VStack,
  Text,
  Editable,
  IconButton,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";
import type { Route } from "./+types/home";
import { tasks } from "../data/sample-data";
import TaskCard from "~/components/task-card";
import StatusCard from "~/components/status-card";
import { Status } from "~/models/task";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Tasks Tracker" }];
}

export default function Home() {
  return (
    <Container p="10">
      <Grid templateColumns={"repeat(3,1fr)"} gap="5">
        <GridItem>
          <VStack gap="5" w="100%">
            <StatusCard status={Status.Daily} backgroundColor="green"/>
            {tasks.map((item, idx) => (
              <TaskCard key={idx} task={item} />
            ))}
          </VStack>
        </GridItem>
        <GridItem>
          <VStack gap="5" w="100%">
            <StatusCard status={Status.Daily} backgroundColor="blue" />
            {tasks.map((item, idx) => (
              <TaskCard key={idx} task={item} />
            ))}
          </VStack>
        </GridItem>
        <GridItem>
          <VStack gap="5" w="100%">
            <StatusCard status={Status.Done} backgroundColor="purple" />
            {tasks.map((item, idx) => (
              <TaskCard key={idx} task={item} />
            ))}
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
}
