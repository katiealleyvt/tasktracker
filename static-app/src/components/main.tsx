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
import { useContext, useState } from "react";
import { WalletContext } from "../contexts/wallet-context";
import BoardColumn from "./board-column";
import { Status } from "../models/enum";
import { Toaster } from "./ui/toaster";
import LoginButton from "./ui/login-button";
import LogoutButton from "./ui/logout-button";
import { useAuth0 } from "@auth0/auth0-react";


export default function Main() {
  const { wallet, setWallet } = useContext(WalletContext);
  const { isAuthenticated} = useAuth0();
if(isAuthenticated){
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
<LogoutButton/>
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
else{
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
<LoginButton/>
        </HStack>
      </VStack>
    </>
  );
}
  
}
