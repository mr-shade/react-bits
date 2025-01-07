import { Table, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react';

const PropTable = ({ data }) => {
  return (
    <>
      <h2 className="demo-title-extra">Component API</h2>
      <Box overflowX="auto">
        <Table variant="simple" colorScheme="whiteAlpha" size="sm">
          <Thead>
            <Tr>
              <Th borderColor='#222' textTransform={'capitalize'} fontSize={'l'} pl={0} pb={4} color="white">Prop</Th>
              <Th borderColor='#222' textTransform={'capitalize'} fontSize={'l'} pl={0} pb={4} color="white">Type</Th>
              <Th borderColor='#222' textTransform={'capitalize'} fontSize={'l'} pl={0} pb={4} color="white">Default</Th>
              <Th borderColor='#222' textTransform={'capitalize'} fontSize={'l'} pl={0} pb={4} color="white">Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((prop, index) => (
              <Tr key={index}>
                <Td borderColor="#222" py={4} pl={0} color="white">{prop.name}</Td>
                <Td borderColor="#222" py={4} pl={0} color="white">{prop.type}</Td>
                <Td borderColor="#222" py={4} pl={0} color="white">{prop.default || '—'}</Td>
                <Td borderColor="#222" py={4} pl={0} color="white" maxW={200}>{prop.description}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default PropTable;
