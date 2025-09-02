import React from 'react';
import ContributionSection from './GitHub/ContributionSection';
import TabsFooter from './TabsFooter';

import { Tabs, Icon, Flex } from '@chakra-ui/react';
import { FiCode, FiEye, FiHeart } from 'react-icons/fi';

const TAB_STYLE_PROPS = {
  flex: '0 0 auto',
  border: '1px solid #392e4e',
  borderRadius: '15px',
  fontSize: '14px',
  h: 10,
  px: 4,
  color: '#ffffff',
  justifyContent: 'center',
  _hover: { bg: '#271E37' },
  _selected: { bg: '#170D27', color: '#B19EEF' }
};

const TabsLayout = ({ children, className }) => {
  const contentMap = {
    PreviewTab: null,
    CodeTab: null
  };

  React.Children.forEach(children, child => {
    if (!child) return;
    if (child.type === PreviewTab) contentMap.PreviewTab = child;
    if (child.type === CodeTab) contentMap.CodeTab = child;
  });

  return (
    <Tabs.Root w="100%" variant="plain" lazyMount defaultValue="preview" className={className}>
      <Tabs.List w="100%">
        <Flex gap={2} justifyContent="space-between" alignItems="flex-start" w="100%" wrap="wrap">
          <Flex gap={2} wrap="wrap" minW="0" flex="1">
            <Tabs.Trigger value="preview" {...TAB_STYLE_PROPS}>
              <Icon as={FiEye} /> Preview
            </Tabs.Trigger>

            <Tabs.Trigger value="code" {...TAB_STYLE_PROPS}>
              <Icon as={FiCode} /> Code
            </Tabs.Trigger>
          </Flex>

          <Tabs.Trigger className="contribute-tab" value="contribute" {...TAB_STYLE_PROPS} flexShrink={0}>
            <Icon as={FiHeart} /> Contribute
          </Tabs.Trigger>
        </Flex>
      </Tabs.List>

      <Tabs.Content pt={0} value="preview">
        {contentMap.PreviewTab}
      </Tabs.Content>
      <Tabs.Content pt={0} value="code">
        {contentMap.CodeTab}
      </Tabs.Content>

      <Tabs.Content pt={0} value="contribute">
        <ContributionSection />
      </Tabs.Content>

      <TabsFooter />
    </Tabs.Root>
  );
};

export const PreviewTab = ({ children }) => <>{children}</>;
export const CodeTab = ({ children }) => <>{children}</>;

export { TabsLayout };
