import { Flex } from "@chakra-ui/react";
import { CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { CODE_EXAMPLES } from "../../constants/ExampleConstants";

import BounceCards from "../../content/Components/BounceCards/BounceCards";
import CodeExample from '../../components/code/CodeExample';
import RefreshButton from "../../components/common/RefreshButton";
import PropTable from "../../components/common/PropTable";
import Dependencies from "../../components/code/Dependencies";
import useForceRerender from "../../hooks/useForceRerender";

const BounceCardsDemo = () => {
  const { bounceCards } = CODE_EXAMPLES;

  const [key, forceRerender] = useForceRerender();

  const images = [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=500&auto=format",
    "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
    "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
    "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
    "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format"
  ];

  const transformStyles = [
    "rotate(5deg) translate(-150px)",
    "rotate(0deg) translate(-70px)",
    "rotate(-5deg)",
    "rotate(5deg) translate(70px)",
    "rotate(-5deg) translate(150px)"
  ];

  const propData = [
    {
      name: 'className',
      type: 'string',
      default: '',
      description: 'Additional CSS classes to apply to the container.',
    },
    {
      name: 'images',
      type: 'array',
      default: '[]',
      description: 'An array of image URLs to display in the card stack.',
    },
    {
      name: 'containerWidth',
      type: 'number',
      default: 400,
      description: 'The width of the container in pixels.',
    },
    {
      name: 'containerHeight',
      type: 'number',
      default: 400,
      description: 'The height of the container in pixels.',
    },
    {
      name: 'animationDelay',
      type: 'number',
      default: 0.5,
      description: 'The delay (in seconds) before the animation starts.',
    },
    {
      name: 'animationStagger',
      type: 'number',
      default: 0.06,
      description: 'The time (in seconds) between the animations of each card.',
    },
    {
      name: 'easeType',
      type: 'string',
      default: '"elastic.out(1, 0.8)"',
      description: 'The easing function to use for the animation.',
    },
    {
      name: 'transformStyles',
      type: 'array',
      default: '["rotate(10deg) translate(-170px)", "rotate(5deg) translate(-85px)", "rotate(-3deg)", "rotate(-10deg) translate(85px)", "rotate(2deg) translate(170px)"]',
      description: 'An array of CSS transform strings for each card in the stack.',
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Flex overflow="hidden" justifyContent="center" alignItems="center" minH={'400px'} position="relative" pb={"4em"} className="demo-container">
          <BounceCards
            key={key}
            className="custom-class"
            images={images}
            containerWidth={500}
            containerHeight={250}
            animationDelay={1}
            animationStagger={0.08}
            easeType="elastic.out(1, 0.5)"
            transformStyles={transformStyles}
          />
          <RefreshButton onClick={forceRerender} />
        </Flex>

        <Dependencies dependencyList={['gsap']} />
        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={bounceCards} />
      </CodeTab>
    </TabbedLayout>

  );
}

export default BounceCardsDemo;