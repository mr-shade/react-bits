import { Link } from 'react-router-dom';
import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Kbd,
  Select,
  Text,
  useDisclosure
} from '@chakra-ui/react';

import { ArrowForwardIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useStars } from '../../hooks/useStars';
import { useDeviceOS } from 'react-haiku';
import { useSearch } from '../context/SearchContext/useSearch';
import { useLanguage } from '../context/LanguageContext/useLanguage'


import Logo from '../../assets/logos/react-bits-logo.svg';
import Star from '../../assets/common/star.svg';
import FadeContent from '../../content/Animations/FadeContent/FadeContent';
import { useRef } from 'react';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleSearch } = useSearch();
  const { languagePreset, setLanguagePreset } = useLanguage();
  const stars = useStars();
  const starCountRef = useRef(null);
  const os = useDeviceOS();

  return (
    <Box zIndex={100} className='main-nav'>
      <Flex className='nav-items' h={20} alignItems="center" justifyContent="space-between">
        <Link to="/" className='logo'>
          <Image src={Logo} alt="Logo" />
        </Link>

        {/* Hamburger menu button for small screens */}
        <IconButton
          size="md"
          icon={<HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={onOpen}
        />

        {/* Links for larger screens */}
        <Flex display={{ base: 'none', md: 'flex' }} alignItems="center" gap={2}>
          <FadeContent blur>
            <Flex
              fontSize="xs"
              h={10}
              border="1px solid #271E37"
              rounded="full"
              alignItems="center"
              pr={4}
              pl={4}
              userSelect="none"
              cursor="pointer"
              transition="transform 0.3s"
              _hover={{ transform: 'scale(0.98)' }}
              bg="#060010"
              onClick={toggleSearch}
            >
              <Text fontSize="xs" fontWeight={600} mr={12}>Search Docs</Text>
              {os === 'macOS' ? <Kbd>⌘ K</Kbd> : <Kbd>CTRL K</Kbd>}
            </Flex>
          </FadeContent>
          <FadeContent blur>
            <Select
              fontSize="xs"
              bg="#060010"
              cursor="pointer"
              border="1px solid #271E37"
              transition="transform 0.3s"
              _hover={{ transform: 'scale(0.98)', border: '1px solid #271E37' }}
              h={10}
              rounded="full"
              width="fit-content"
              fontWeight={600}
              onChange={(e) => setLanguagePreset(e.target.value)}
              value={languagePreset || "JS"}
            >
              <option value="JS">JS</option>
              <option value="TS">TS</option>
            </Select>
          </FadeContent>
          <FadeContent blur>
            <button className="cta-button-docs" onClick={() => window.open('https://github.com/DavidHDev/react-bits', '_blank')}>
              Star On GitHub
              <span ref={starCountRef}>
                <img src={Star} alt="Star Icon" />
                {stars}
              </span>
            </button>
          </FadeContent>
        </Flex>
      </Flex>

      {/* Drawer for mobile navigation */}
      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay display={{ md: 'none' }}>
          <DrawerContent bg="black" h="100%">
            <DrawerBody px={0} py={0}>
              <Flex direction="column">
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  h="57px"
                  mb={6}
                  borderBottom="1px solid #ffffff1c"
                  px={6}
                >
                  <Image src={Logo} alt="Logo" height="25px" />
                  <IconButton
                    size="md"
                    icon={<CloseIcon boxSize={3} />}
                    aria-label="Close Menu"
                    display={{ md: 'none' }}
                    onClick={onClose}
                  />
                </Flex>
                <Flex direction="column" px={6}>
                  <p>Useful Links</p>
                  <Link to="/text-animations/split-text" display="block" mb={2} onClick={onClose}>
                    Docs
                  </Link>
                  <Link to="https://github.com/DavidHDev/react-bits" target="_blank" display="block" mb={2} onClick={onClose}>
                    GitHub <ArrowForwardIcon boxSize={7} transform="rotate(-45deg)" position="relative" top="-1px" />
                  </Link>
                  <Divider />
                  <p>Other</p>
                  <Link to="https://davidhaz.com/" target="_blank" display="block" mb={2} onClick={onClose}>
                    Who made this?
                    <ArrowForwardIcon boxSize={7} transform="rotate(-45deg)" position="relative" top="-1px" />
                  </Link>
                </Flex>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default Header;
