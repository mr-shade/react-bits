import { Box, Flex, Text } from "@chakra-ui/react";
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from "../common/TabbedLayout";
import { clickSpark } from "../../constants/code/Animations/clickSparkCode";

import FadeContent from "../../content/Animations/FadeContent/FadeContent";
import ClickSpark from "../../content/Animations/ClickSpark/ClickSpark";
import CliInstallation from "../code/CliInstallation";
import CodeExample from "../code/CodeExample";

import variants from "../../assets/common/variants.svg";

const LandingDemo = () => (
  <Flex w="100%" justifyContent="center" alignItems="center" direction="column" mb={12} mt={12}>
    <FadeContent blur>
      <Flex w="100%" justifyContent="center" position="relative" top="1.6em">
        <img width={300} src={variants} alt="Variants" />
      </Flex>
      <Text
        textAlign="center"
        maxW="20ch"
        mb={4}
        lineHeight={1}
        color="#fff"
        fontSize="clamp(2rem, 6vw, 3rem)"
      >
        Simply copy & paste
      </Text>
      <Text
        textAlign="center"
        maxW={{ base: "25ch", sm: "100%" }}
        lineHeight={1}
        mb={6}
        fontSize="clamp(1rem, 2vw, 1.2rem)"
        letterSpacing="-0.5px"
      >
        Pick your favourite technologies, copy, enjoy!
      </Text>
    </FadeContent>

    <FadeContent className="fade-full" blur>
      <Flex maxH={300} maxW={1080} overflow="hidden" className="demo-landing">
        <TabbedLayout className="landing-tabs">
          <PreviewTab>
            <Box
              position="relative"
              className="demo-container"
              h={230}
              p={0}
              w="100%"
              maxW={1080}
              overflow="hidden"
            >
              <ClickSpark />
              <Text
                position="absolute"
                fontWeight={900}
                fontSize="2rem"
                textAlign="center"
                color="#222"
                userSelect="none"
              >
                Click Around
              </Text>
            </Box>
          </PreviewTab>
          <CodeTab>
            <CodeExample codeObject={clickSpark} />
          </CodeTab>
          <CliTab>
            <CliInstallation {...clickSpark} />
          </CliTab>
        </TabbedLayout>
      </Flex>
    </FadeContent>
  </Flex>
);

export default LandingDemo;