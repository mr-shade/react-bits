import { Box } from "@chakra-ui/react";

const Dependencies = ({ dependencyList = [] }) => {
  return (
    <Box mt={12}>
      <h2 className="demo-title-extra">Dependencies</h2>
      <div className="demo-details">
        {dependencyList.map(d =>
          <span key={d}>{d}</span>
        )}
      </div>
    </Box>
  );
}

export default Dependencies;