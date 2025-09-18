"use client"
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
import TaskCard from "~/components/task-card";
import StatusCard from "~/components/status-card";
import { Status, Task } from "~/models/task";
import { useState } from "react";
import BoardColumn from "~/components/board-column";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Tasks Tracker" }];
}

export default function Home() {
  return (
        <Container p="10">
          <Grid templateColumns={"repeat(3,1fr)"} gap="5">
            <BoardColumn status={Status.Daily}/>
            <BoardColumn status={Status.Todo}/>
            <BoardColumn status={Status.Done}/>

          </Grid>
        </Container>
  );
}
