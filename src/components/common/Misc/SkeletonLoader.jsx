import { Box, Flex } from '@chakra-ui/react';
import '../../../css/skeleton.css';

const SkeletonLoader = () => {
  return (
    <Box className="skeleton-loader">
      {/* Tabs */}
      <Flex
        height="36px"
        borderRadius="md"
        mb={6}
        gap={2}
        maxWidth="300px"
      >
        <Box borderRadius="10px" maxWidth="92px" flex="1" height="100%" bg="#0D0716" className="skeleton-pulse" />
        <Box borderRadius="10px" maxWidth="92px" flex="1" height="100%" bg="#0D0716" className="skeleton-pulse" />
        <Box borderRadius="10px" maxWidth="80px" flex="1" height="100%" bg="#0D0716" className="skeleton-pulse" />
      </Flex>

      <Box className="skeleton-content">
        <Box mb={8}>
          <Box
            height="500px"
            bg="#0D0716"
            borderRadius="20px"
            mb={3}
            className="skeleton-pulse"
          />
        </Box>

        <Box
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={4}
          className="skeleton-pulse"
          maxWidth="200px"
        />

        <Box
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={4}
          className="skeleton-pulse"
          maxWidth="300px"
        />

        <Box
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={12}
          className="skeleton-pulse"
          maxWidth="230px"
        />

        <Box
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={4}
          className="skeleton-pulse"
          maxWidth="100px"
        />

        <Box mb={8}>
          <Box
            height="500px"
            bg="#0D0716"
            borderRadius="20px"
            mb={3}
            className="skeleton-pulse"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SkeletonLoader;
