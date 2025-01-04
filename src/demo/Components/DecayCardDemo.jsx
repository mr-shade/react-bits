import { Box } from "@chakra-ui/react";
import { CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { CODE_EXAMPLES } from "../../constants/ExampleConstants";

import DecayCard from "../../content/Components/DecayCard/DecayCard";
import CodeExample from '../../components/code/CodeExample';
import PropTable from "../../components/common/PropTable";
import Dependencies from "../../components/code/Dependencies";

const DecayCardDemo = () => {
  const { decayCard } = CODE_EXAMPLES;

  const propData = [
    {
      name: 'width',
      type: 'number',
      default: 200,
      description: 'The width of the card in pixels.',
    },
    {
      name: 'height',
      type: 'number',
      default: 300,
      description: 'The height of the card in pixels.',
    },
    {
      name: 'image',
      type: 'string',
      default: '',
      description: 'Allows setting the background image of the card.',
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" overflow="hidden">
          <DecayCard>
            <h2>The<br />Open Sea</h2>
          </DecayCard>
        </Box>

        <Dependencies dependencyList={['gsap']} />
        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={decayCard} />
      </CodeTab>
    </TabbedLayout>
  );
};

export default DecayCardDemo;
