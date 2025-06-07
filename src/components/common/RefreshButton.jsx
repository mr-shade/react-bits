import { RepeatIcon } from "@chakra-ui/icons";
import { Button } from '@chakra-ui/react';

const RefreshButton = ({ onClick }) => {
  return (
    <Button
      transition="background-color 0.3s ease"
      _active={{ backgroundColor: '#271E37' }}
      _hover={{ backgroundColor: '#271E37' }}
      backgroundColor='#170D27'
      position="absolute"
      onClick={onClick}
      border="1px solid #271E37"
      zIndex={2}
      color="white"
      rounded="xl"
      right={3}
      size="md"
      top={3}
      p={2}
    >
      <RepeatIcon boxSize={4} />
    </Button>
  );
}

export default RefreshButton;