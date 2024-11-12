'use client';
import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";

const ViewTaskPage = () => {
  const [task, setTask] = useState({ numId: null, name: null, date: null });
  const [modalContent, setModalContent] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const viewTask = async (event) => {
    event.preventDefault();
    const taskID = document.querySelector("#taskID").value;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ethereum/view-task/${taskID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();

      if (data.status === 200) {
        setTask(data.taskObj);
      } else {
        throw new Error("Task does not exist");
      }
    } catch (error) {
      setModalContent("Task does not exist");
      onOpen();
    }
  };

  return (
    <>
      <Box p={4} maxW="md" mx="auto">
        {task.numId && task.name && task.date ? (
          <Box borderWidth="1px" borderRadius="lg" p={4} mb={4} boxShadow="md">
            <Text fontWeight="bold">Task ID: {task.numId}</Text>
            <Text>Task Name: {task.name}</Text>
            <Text>Task Date: {task.date}</Text>
          </Box>
        ) : null}

        <form onSubmit={viewTask}>
          <FormControl id="taskID" mb={4} isRequired>
            <FormLabel>ID</FormLabel>
            <Input placeholder="Enter Task ID" />
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full">
            View Task
          </Button>
        </form>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Error</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>{modalContent}</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default ViewTaskPage;
