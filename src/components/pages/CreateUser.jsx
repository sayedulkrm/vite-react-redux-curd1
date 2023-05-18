import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    HStack,
    Input,
    NumberInput,
    Radio,
    RadioGroup,
    Text,
    useToast,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addNewUser } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
    const dispacth = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    const initialUserDetails = {
        name: "",
        email: "",
        age: "",
        gender: "",
    };

    const [userData, setUserData] = useState({
        ...initialUserDetails,
        gender: "Male",
    });
    const [crtBtn, setCrtBtn] = useState("Create User");

    const fromData = (cate, value) => {
        setUserData({
            ...userData,
            [cate]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setCrtBtn("Creating User...");

        try {
            dispacth(addNewUser(userData));
            toast({
                title: "Account created.",
                description: "We've created your account for you.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            navigate("/");
        } catch (error) {
            toast({
                title: `Opps Something went wrong. ${error.message}`,
                description: "Please Try Again",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box
            minH={"100vh"}
            display={"flex"}
            flexDirection={"column"}
            // justifyContent={"center"}
            alignItems={"center"}
            p={5}
            gap={5}
        >
            <Text fontSize={"4xl"} fontWeight={"bold"}>
                Create New User
            </Text>
            <Box w={"50%"} p={5} border={"1px solid black"}>
                <form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                    onSubmit={handleSubmit}
                >
                    <FormControl isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input
                            type="name"
                            onChange={(e) => fromData("name", e.target.value)}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            type="email"
                            onChange={(e) => fromData("email", e.target.value)}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Age</FormLabel>
                        <Input
                            type="number"
                            onChange={(e) => fromData("age", e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup
                            onChange={(value) => fromData("gender", value)}
                            // value={userData.gender}
                            value={userData.gender}
                        >
                            <HStack spacing={4}>
                                <Radio value="Male">Male</Radio>
                                <Radio value="Female">Female</Radio>
                            </HStack>
                        </RadioGroup>
                    </FormControl>
                    <Button variant={"ghost"} type="submit">
                        {crtBtn}
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default CreateUser;
