'use client';
import { useState, useEffect } from "react";
import { Box, Text, SimpleGrid } from "@chakra-ui/react";

const AllTasksPage = () => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const allTasks = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ethereum/view-all-task`, {
          method: "GET",
          headers: {
            "Accept": "application/json"
          }
        });
        const data = await res.json();
        if (data.status === 200) {
          setTaskList(data.taskList);
        }
      } catch (error) {
        console.error(error);
      }
    };
    allTasks();
  }, []);

  return (
    <Box p={4} maxW="container.lg" mx="auto">
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {taskList.map((task) =>
          task.taskId && task.name && task.date ? (
            <Box
              key={task.taskId}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              boxShadow="md"
            >
              <Text fontWeight="bold">Task ID: {task.taskId}</Text>
              <Text>Name: {task.name}</Text>
              <Text>Date: {task.date}</Text>
            </Box>
          ) : null
        )}
      </SimpleGrid>
    </Box>
  );
};

export default AllTasksPage;
