import React from "react";
import { Button, HStack, Stack, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Stack
            direction={["column", "row"]}
            align={["center", "start"]}
            justify={"center"}
            spacing={"20px"}
            p={5}
            h={"20"}
            bg={colorMode === "light" ? "gray.200" : "gray.700"}
        >
            <HStack w={"50%"} justify={"center"} spacing={"20px"}>
                <Link to={"/"}>
                    <Button>Home</Button>
                </Link>
                <Link to={"/createuser"}>
                    <Button>Create User</Button>
                </Link>
            </HStack>
            <HStack w={"50%"} justify={"center"}>
                <Button onClick={toggleColorMode}>
                    Toggle {colorMode === "light" ? "Dark" : "Light"}
                </Button>
            </HStack>
        </Stack>
    );
};

export default Header;
