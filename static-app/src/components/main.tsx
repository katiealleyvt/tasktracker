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
import LoginButton from "./auth/login-button";
import LogoutButton from "./auth/logout-button";
import { useAuth0 } from "@auth0/auth0-react";
import Desktop from "./desktop";
import { useMediaQuery } from "react-responsive";
import Mobile from "./mobile";

export default function Main() {
  const { wallet, setWallet } = useContext(WalletContext);
  const { isAuthenticated } = useAuth0();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  if (isAuthenticated) {
    return (
      <>
        <VStack bg={"brand.nav"} height={16} w="100vw">
          <HStack
            color="whiteAlpha.900"
            px="2rem"
            w="100%"
            justify={"space-between"}
            alignContent={"center"}
            h="100%"
            fontWeight="700"
          >
            <Heading>Task Tracker</Heading>
            <Box display="flex" flexDirection={"row"} gap="20">
              <Flex
                gap="10px"
                textAlign={"center"}
                alignItems="center"
                fontSize="xl"
                color="brand.gold"
              >
                <LuCoins /> {wallet.amount}
              </Flex>
              <LogoutButton />
            </Box>
          </HStack>
        </VStack>
        {isMobile ? <Mobile /> : <Desktop />}
      </>
    );
  } else {
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
            <LoginButton />
          </HStack>
        </VStack>
      </>
    );
  }
}
