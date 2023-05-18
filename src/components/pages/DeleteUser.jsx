import React from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../features/userSlice";

const DeleteUser = ({ targetId, isOpen, onClose, setModalOpen }) => {
    const { users } = useSelector((state) => state.users);
    const person = users.find((user) => user.id === targetId);

    const { name } = person;

    const dispacth = useDispatch();

    const handleDelete = (id) => {
        dispacth(deleteUser(id));
        setModalOpen(false);
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete User?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Are you sure you want to delete "{name}" ?</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            variant="ghost"
                            color={"red.400"}
                            onClick={() => handleDelete(targetId)}
                        >
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeleteUser;
