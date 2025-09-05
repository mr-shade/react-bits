import { useState } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex, Input, Text } from '@chakra-ui/react';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import useForceRerender from '../../hooks/useForceRerender';
import logo from '../../assets/logos/reactbits-gh-white.svg';

import { staggeredMenu } from '../../constants/code/Components/staggeredMenuCode';
import StaggeredMenu from '@content/Components/StaggeredMenu/StaggeredMenu';

const StaggeredMenuDemo = () => {
  const [displaySocials, setDisplaySocials] = useState(true);
  const [accentColor, setAccentColor] = useState('#5227FF');
  const [menuButtonColor, setMenuButtonColor] = useState('#ffffff');
  const [position, setPosition] = useState('right');
  const [menuKey, forceMenuRerender] = useForceRerender();

  const items = [
    { label: 'Home', ariaLabel: 'Go to Home section', link: '#home' },
    { label: 'About', ariaLabel: 'Go to About section', link: '#about' },
    { label: 'Projects', ariaLabel: 'Go to Projects section', link: '#projects' },
    { label: 'Contact', ariaLabel: 'Go to Contact section', link: '#contact' }
  ];

  const socialItems = [
    { label: 'GitHub', link: 'https://github.com/your-handle' },
    { label: 'Twitter', link: 'https://twitter.com/your-handle' },
    { label: 'LinkedIn', link: 'https://linkedin.com/in/your-handle' }
  ];

  const propData = [
    {
      name: 'position',
      type: '"left" | "right"',
      default: '"right"',
      description: 'Anchor position for the menu panel (left or right side).'
    },
    {
      name: 'colors',
      type: 'string[]',
      default: '["#B19EEF", "#5227FF"]',
      description: 'Colors used for staggered underlay layers.'
    },
    {
      name: 'items',
      type: 'StaggeredMenuItem[]',
      default: '[]',
      description: 'Menu items rendered inside the panel.'
    },
    {
      name: 'socialItems',
      type: 'StaggeredMenuSocialItem[]',
      default: '[]',
      description: 'Social links displayed in the menu panel.'
    },
    {
      name: 'displaySocials',
      type: 'boolean',
      default: 'false',
      description: 'Whether to display the social links section.'
    },
    {
      name: 'displayItemNumbering',
      type: 'boolean',
      default: 'true',
      description: 'Whether to show numbering for menu items.'
    },
    {
      name: 'className',
      type: 'string',
      default: 'undefined',
      description: 'Optional extra class names.'
    },
    {
      name: 'logoUrl',
      type: 'string',
      default: '',
      description: 'Path to the logo image.'
    },
    {
      name: 'menuButtonColor',
      type: 'string',
      default: '"#fff"',
      description: 'Color of the menu toggle button when closed.'
    },
    {
      name: 'openMenuButtonColor',
      type: 'string',
      default: '"#fff"',
      description: 'Color of the menu toggle button when open.'
    },
    {
      name: 'accentColor',
      type: 'string',
      default: 'undefined',
      description: 'Hover accent color for menu items.'
    },
    {
      name: 'changeMenuColorOnOpen',
      type: 'boolean',
      default: 'true',
      description: 'Whether to animate the button color when opening/closing.'
    },
    {
      name: 'onMenuOpen',
      type: '() => void',
      default: 'undefined',
      description: 'Callback function called when menu opens.'
    },
    {
      name: 'onMenuClose',
      type: '() => void',
      default: 'undefined',
      description: 'Callback function called when menu closes.'
    }
  ];

  return (
    <TabsLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container demo-container-dots" h={800} overflow="hidden" p={0}>
          <StaggeredMenu
            key={menuKey}
            logoUrl={logo}
            items={items}
            socialItems={socialItems}
            openMenuButtonColor={position === 'left' ? '#fff' : '#000'}
            displaySocials={displaySocials}
            accentColor={accentColor}
            menuButtonColor={menuButtonColor}
            position={position}
          />
        </Box>

        <Customize>
          <PreviewSelect
            title="Position"
            value={position}
            onChange={val => {
              setPosition(val);
              forceMenuRerender();
            }}
            options={[
              { value: 'right', label: 'Right' },
              { value: 'left', label: 'Left' }
            ]}
            width={110}
          />
          <Flex alignItems="center" my={4}>
            <Text fontSize="sm" mr={2}>
              Accent Color
            </Text>
            <Input
              type="color"
              value={accentColor}
              onChange={e => setAccentColor(e.target.value)}
              width="50px"
              p={0}
              h="32px"
              border="none"
              bg="transparent"
            />
          </Flex>
          <Flex alignItems="center" mb={4}>
            <Text fontSize="sm" mr={2}>
              Menu Button Color
            </Text>
            <Input
              type="color"
              value={menuButtonColor}
              onChange={e => setMenuButtonColor(e.target.value)}
              width="50px"
              p={0}
              h="32px"
              border="none"
              bg="transparent"
            />
          </Flex>
          <PreviewSwitch title="Display Socials" isChecked={displaySocials} onChange={setDisplaySocials} />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['gsap']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={staggeredMenu} />
      </CodeTab>
    </TabsLayout>
  );
};

export default StaggeredMenuDemo;
