import { RepeatIcon } from "@chakra-ui/icons";
import { Button } from '@chakra-ui/react';

const RefreshButton = ({ onClick }) => {
  return (
    <Button
      transition="background-color 0.3s ease"
      _active={{ backgroundColor: '#333' }}
      _hover={{ backgroundColor: '#333' }}
      backgroundColor='#222'
      position="absolute"
      onClick={onClick}
      color="white"
      rounded="xl"
      right={3}
      size="sm"
      top={3}
      p={2}
    >
      <RepeatIcon boxSize={4} />
    </Button>
  );
}

export default RefreshButton;