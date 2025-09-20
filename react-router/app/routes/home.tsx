"use client";
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
  Flex,
} from "@chakra-ui/react";
import { LuCheck, LuCoins, LuPencilLine, LuX } from "react-icons/lu";
import type { Route } from "./+types/home";
import TaskCard from "~/components/task-card";
import StatusCard from "~/components/status-card";
import { Task } from "~/models/task";
import { useContext, useState } from "react";
import BoardColumn from "~/components/board-column";
import { TaskProvider } from "~/contexts/task-context";
import { tasks } from "~/data/sample-data";
import { Status } from "~/models/enum";
import { Toaster } from "~/components/ui/toaster";
import { WalletContext } from "~/contexts/wallet-context";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Tasks Tracker" }];
}

export default function Home() {
  const { wallet, setWallet } = useContext(WalletContext);

  return (
    <>
      <VStack bg={"brand.nav"} height={16} w="100%">
        <HStack
          color="whiteAlpha.900"
          px="2rem"
          w="70%"
          justify={"space-between"}
          alignContent={"center"}
          h="100%"
          fontWeight="700"
        >
          <Heading>Task Tracker</Heading>
          <Flex
            gap="10px"
            textAlign={"center"}
            alignItems="center"
            fontSize="xl"
            color="brand.gold"
          >
            <LuCoins /> {wallet.amount}
          </Flex>
        </HStack>
      </VStack>
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
    </>
  );
}
