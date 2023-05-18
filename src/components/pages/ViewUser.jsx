import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const ViewUser = () => {
    const location = useLocation();

    const { id, name, email, gender, age } = location.state;

    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            height={"100vh"}
            p={5}
            gap={10}
        >
            <Text fontSize={"3xl"} fontWeight={"bold"}>
                User Information
            </Text>
            <Box display={"flex"} flexDirection={"column"} gap={5}>
                <Text fontSize={"2xl"} fontWeight={"medium"}>
                    Name: {name}
                </Text>
                <Text fontSize={"2xl"} fontWeight={"medium"}>
                    Email: {email}
                </Text>
                <Text fontSize={"2xl"} fontWeight={"medium"}>
                    Gender: {gender}
                </Text>
                <Text fontSize={"2xl"} fontWeight={"medium"}>
                    Age: {age}
                </Text>
            </Box>
            <Box w={"30%"}>
                <Link to={`/edit/${id}`}>
                    <Button colorScheme={"teal"} w={"full"}>
                        Edit User
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default ViewUser;
