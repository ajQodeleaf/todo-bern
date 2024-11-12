'use client';
import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Text } from "@chakra-ui/react";
import { useWallet } from "../../context/WalletContext";

const UpdateTaskPage = () => {
  const [taskID, setTaskID] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [modalContent, setModalContent] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { contract, account } = useWallet();

  const handleTaskIDChange = (event) => setTaskID(event.target.value);
  const handleTaskNameChange = (event) => setTaskName(event.target.value);
  const handleTaskDateChange = (event) => setTaskDate(event.target.value);

  const updateTask = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ethereum/update-task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ taskDate })
      });

      const data = await res.json();

      if (data.status === 200) {
        await contract.updateTask(taskID, taskName, taskDate);
        setModalContent(`Task ID ${taskID} updated with task name ${taskName} and date ${taskDate}`);
      } else {
        throw new Error("Task cannot be updated due to date clash");
      }
    } catch (error) {
      setModalContent("Task cannot be updated");
    } finally {
      onOpen();
    }
  };

  return (
    <>
      <Box p={4} maxW="md" mx="auto">
        <form onSubmit={updateTask}>
          <FormControl id="taskID" mb={4} isRequired>
            <FormLabel>ID</FormLabel>
            <Input value={taskID} onChange={handleTaskIDChange} placeholder="Task ID" />
          </FormControl>
          <FormControl id="taskName" mb={4} isRequired>
            <FormLabel>Name</FormLabel>
            <Input value={taskName} onChange={handleTaskNameChange} placeholder="Task Name" />
          </FormControl>
          <FormControl id="taskDate" mb={4} isRequired>
            <FormLabel>Date</FormLabel>
            <Input type="date" value={taskDate} onChange={handleTaskDateChange} />
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full">
            Update Task
          </Button>
        </form>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Task Update</ModalHeader>
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

export default UpdateTaskPage;
