import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Heading,
    Image,
    Spinner,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../features/userSlice";
import { Link } from "react-router-dom";
import DeleteUser from "./DeleteUser";

const AllUsers = () => {
    const dispacth = useDispatch();

    const { isLoading, users, error } = useSelector((state) => state.users);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalopen, setModalOpen] = useState(false);

    const [targetId, setTargetId] = useState();

    const openModal = (id) => {
        setModalOpen(true);
        onOpen();
        setTargetId(id);
    };

    useEffect(() => {
        dispacth(getAllUsers());
    }, [dispacth]);

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
                All Users
            </Text>

            {/* ========================== */}

            <Box
                display={"flex"}
                flexDirection={"column"}
                flexWrap={"wrap"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={5}
                w={"100%"}
            >
                {isLoading ? (
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                ) : (
                    <Box
                        display={"flex"}
                        flexWrap={"wrap"}
                        justifyContent={"center"}
                        gap={5}
                        w={"100%"}
                    >
                        {users &&
                            users.map((user) => {
                                const { id, name, email, gender, age } = user;

                                return (
                                    <Card maxW="md" key={id}>
                                        <CardBody>
                                            <Image
                                                src={`https://robohash.org/${id}?200x200`}
                                                alt="avatar"
                                            />
                                            <Stack mt="6" spacing="3">
                                                <Heading size="md">
                                                    Name: {name}
                                                </Heading>
                                                <Text>Email: {email}</Text>
                                                <Text
                                                    color="blue.600"
                                                    fontSize="2xl"
                                                >
                                                    {gender}
                                                </Text>
                                            </Stack>
                                            <CardFooter>
                                                <ButtonGroup spacing={"2"}>
                                                    <Link
                                                        to={`/viewuser/${id}`}
                                                        state={{
                                                            id,
                                                            name,
                                                            email,
                                                            gender,
                                                            age,
                                                        }}
                                                    >
                                                        <Button>View</Button>
                                                    </Link>
                                                    <Button
                                                        bg={"red.300"}
                                                        variant={"ghost"}
                                                        onClick={() =>
                                                            openModal(id)
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                    {modalopen ? (
                                                        <DeleteUser
                                                            onOpen={onOpen}
                                                            targetId={targetId}
                                                            isOpen={isOpen}
                                                            onClose={onClose}
                                                            setModalOpen={
                                                                setModalOpen
                                                            }
                                                        />
                                                    ) : null}
                                                </ButtonGroup>
                                            </CardFooter>
                                        </CardBody>
                                    </Card>
                                );
                            })}
                    </Box>
                )}
                {error && <Text>{error.message}</Text>}
            </Box>
        </Box>
    );
};

export default AllUsers;
