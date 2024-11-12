'use client';
import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Text, useToast, VStack } from '@chakra-ui/react';

const DeleteTaskPage = () => {
  const [taskId, setTaskId] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleDeleteTask = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ethereum/delete-task/${taskId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      if (data.status === 200) {
        toast({
          title: 'Task Deleted',
          description: `Task ID ${taskId} has been deleted successfully.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setTaskId('');
      } else {
        toast({
          title: 'Deletion Failed',
          description: `Failed to delete Task ID ${taskId}.`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while deleting the task.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="8" p="6" boxShadow="lg" borderRadius="md">
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb="6">
        Delete Task
      </Text>
      <VStack spacing="4">
        <FormControl id="taskId">
          <FormLabel>Task ID</FormLabel>
          <Input
            type="text"
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
            placeholder="Enter Task ID"
          />
        </FormControl>
        <Button
          colorScheme="red"
          onClick={handleDeleteTask}
          isLoading={loading}
          isDisabled={!taskId}
          width="full"
        >
          Delete Task
        </Button>
      </VStack>
    </Box>
  );
};

export default DeleteTaskPage;
