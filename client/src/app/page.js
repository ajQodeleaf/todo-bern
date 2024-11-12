'use client';
import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
  Spinner
} from "@chakra-ui/react";
import { useWallet } from "../context/WalletContext";

const CreateTaskPage = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { contract, account } = useWallet();

  const handleTaskNameChange = (event) => setTaskName(event.target.value);
  const handleTaskDateChange = (event) => setTaskDate(event.target.value);

  const createTask = async (event) => {
    event.preventDefault();
    console.log("Task Name:", taskName, "Task Date:", taskDate, "Account:", account);

    setIsSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ethereum/create-task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ taskName, taskDate, account })
      });

      const data = await res.json();

      if (data.status === 200) {
        try {
          await contract.createTask(taskName, taskDate)
          setModalContent(`Task "${taskName}" successfully created for ${taskDate}.`);
        } catch (contractError) {
          console.error("Contract Creation Error:", contractError);
          setModalContent(`Failed to create task on the blockchain: ${contractError.message}`);
        }
      } else {
        setModalContent(`Task cannot be added due to a date clash or other issue.`);
      }
    } catch (error) {
      console.error("API Error:", error);
      setModalContent(`An error occurred: ${error.message}`);
    } finally {
      setIsSubmitting(false);
      onOpen();
    }
  };

  return (
    <>
      <Box p={4} maxW="md" mx="auto">
        <form onSubmit={createTask}>
          <FormControl id="taskName" mb={4} isRequired>
            <FormLabel>Name</FormLabel>
            <Input value={taskName} onChange={handleTaskNameChange} placeholder="Task Name" />
          </FormControl>
          <FormControl id="taskDate" mb={4} isRequired>
            <FormLabel>Date</FormLabel>
            <Input type="date" value={taskDate} onChange={handleTaskDateChange} />
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full" disabled={isSubmitting}>
            {isSubmitting ? <Spinner size="sm" /> : "Create Task"}
          </Button>
        </form>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Task Creation</ModalHeader>
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

export default CreateTaskPage;
