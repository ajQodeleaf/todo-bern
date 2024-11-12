'use client';
import { Box, Flex, HStack, Button, Spacer } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useWallet } from "../context/WalletContext";

const Header = () => {
  const router = useRouter();
  const { isConnected, disconnectWallet } = useWallet();

  return (
    <Box bg="teal.500" color="white" p={4}>
      <Flex align="center">
        <Button
          onClick={() => router.push('/')}
          variant="link"
          color="white"
          fontSize="lg"
          fontWeight="bold"
        >
          Task Manager
        </Button>

        <Spacer />

        <HStack spacing={4}>
          <Button
            onClick={() => router.push('/view-task')}
            variant="link"
            color="white"
            _hover={{ textDecoration: 'underline' }}
          >
            View Task
          </Button>

          <Button
            onClick={() => router.push('/all-tasks')}
            variant="link"
            color="white"
            _hover={{ textDecoration: 'underline' }}
          >
            All Tasks
          </Button>

          <Button
            onClick={() => router.push('/delete-task')}
            variant="link"
            color="white"
            _hover={{ textDecoration: 'underline' }}
          >
            Delete Task
          </Button>

          <Button
            onClick={() => router.push('/update-task')}
            variant="link"
            color="white"
            _hover={{ textDecoration: 'underline' }}
          >
            Update Task
          </Button>

          {isConnected && (
            <Button onClick={disconnectWallet} colorScheme="red" size="sm">
              Disconnect
            </Button>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
