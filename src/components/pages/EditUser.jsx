import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Radio,
    RadioGroup,
    Text,
    useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/userSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
    const dispacth = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const { id } = useParams();

    const initialUserDetails = {
        name: "",
        email: "",
        age: "",
        gender: "",
    };

    const [userData, setUserData] = useState({
        ...initialUserDetails,
    });
    const [crtBtn, setCrtBtn] = useState("Update User");

    const allUsers = useSelector((state) => state.users.users);

    // const user = allUsers.find((user) => user.id === id);

    // const { name, email, age, gender } = user;

    const fromData = (cate, value) => {
        setUserData({
            ...userData,
            [cate]: value,
        });
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        setCrtBtn("Updating User...");
        console.log(userData);

        try {
            dispacth(updateUser(userData));
            toast({
                title: "Updated Successfully.",

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

    useEffect(() => {
        if (id) {
            const user = allUsers.find((user) => user.id === id);
            setUserData(user);
        }
    }, [id]);

    const { name, email, age, gender } = userData;

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
                    onSubmit={handleUpdateSubmit}
                >
                    <FormControl isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input
                            value={name}
                            type="name"
                            onChange={(e) => fromData("name", e.target.value)}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            value={email}
                            type="email"
                            onChange={(e) => fromData("email", e.target.value)}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Age</FormLabel>
                        <Input
                            value={age}
                            type="number"
                            onChange={(e) => fromData("age", e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup
                            onChange={(value) => fromData("gender", value)}
                            value={gender}
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

export default EditUser;
