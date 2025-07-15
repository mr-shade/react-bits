import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { LuComponent, LuImage, LuPlay, LuText } from "react-icons/lu";
import { Box, Text } from "@chakra-ui/react";

import Customize from "../../components/common/Preview/Customize";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from '../../components/code/Dependencies';

import { scrollStack } from "../../constants/code/Components/scrollStackCode";
import ScrollStack, { ScrollStackItem } from "../../content/Components/ScrollStack/ScrollStack";

const ScrollStackDemo = () => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleStackComplete = () => {
    setIsCompleted(true);
  };

  const propData = [
    {
      name: "prop1",
      type: "number",
      default: "0",
      description: "..."
    },
    {
      name: "prop2",
      type: "number",
      default: "0",
      description: "..."
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
          <Text
            textAlign="center"
            color='#271E37'
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={900}
            position="absolute"
            top="25%"
            transform='translate(-50%, -50%)'
            left="50%"
            pointerEvents="none"
            transition="all 0.3s ease"
          >
            {isCompleted ? "Stack Completed!" : "Scroll Down"}
          </Text>

          <ScrollStack 
            onStackComplete={handleStackComplete}
          >
            <ScrollStackItem itemClassName="scroll-stack-card-demo ssc-demo-1">
              <h3>Text Animations</h3>

              <div className="stack-img-container">
                <LuText />
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="scroll-stack-card-demo ssc-demo-2">
              <h3>Animations</h3>

              <div className="stack-img-container">
                <LuPlay />
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="scroll-stack-card-demo ssc-demo-3">
              <h3>Components</h3>

              <div className="stack-img-container">
                <LuComponent />
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="scroll-stack-card-demo ssc-demo-4">
              <h3>Backgrounds</h3>

              <div className="stack-img-container">
                <LuImage />
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="scroll-stack-card-demo ssc-demo-5">
              <h3>All on React Bits!</h3>
            </ScrollStackItem>
          </ScrollStack>
        </Box>

        <Customize>

        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={scrollStack} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...scrollStack} />
      </CliTab>
    </TabbedLayout>
  );
};

export default ScrollStackDemo;