import {
  Box,
  Flex,
  VStack,
  Text,
  Stack,
  IconButton,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Image,
  Divider
} from '@chakra-ui/react';

import { ArrowForwardIcon, CloseIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import { useRef, useState, useEffect, useCallback, useMemo, memo } from 'react';
import { CATEGORIES, NEW, UPDATED } from '../../constants/Categories';
import { useSearch } from '../context/SearchContext/useSearch';
import Logo from '../../assets/logos/react-bits-logo.svg';

const HOVER_TIMEOUT_DELAY = 150;
const ICON_BUTTON_STYLES = {
  borderRadius: "10px",
  border: "1px solid #ffffff1c",
  bg: "#060010"
};
const ARROW_ICON_PROPS = {
  boxSize: 7,
  transform: "rotate(-45deg)",
  position: "relative",
  top: "-1px"
};

// Utilities
const scrollToTop = () => window.scrollTo(0, 0);
const formatForURL = (str) => str.replace(/\s+/g, '-').toLowerCase();

const Sidebar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [linePosition, setLinePosition] = useState(null);
  const [isLineVisible, setIsLineVisible] = useState(false);

  const searchBtnRef = useRef();
  const menuBtnRef = useRef();
  const sidebarRef = useRef(null);
  const itemRefs = useRef({});
  const hoverTimeoutRef = useRef(null);

  const location = useLocation();
  const { toggleSearch } = useSearch();
  const sidebarBgColor = useColorModeValue('gray.100', 'black');

  const findActiveElement = useCallback(() => {
    for (const category of CATEGORIES) {
      const activeItem = category.subcategories.find(sub => {
        const path = `/${formatForURL(category.name)}/${formatForURL(sub)}`;
        return location.pathname === path;
      });

      if (activeItem) {
        const activePath = `/${formatForURL(category.name)}/${formatForURL(activeItem)}`;
        return itemRefs.current[activePath];
      }
    }
    return null;
  }, [location.pathname]);

  const updateLinePosition = useCallback((element) => {
    if (!element || !sidebarRef.current) return null;

    const sidebarRect = sidebarRef.current.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    return elementRect.top - sidebarRect.top + (elementRect.height / 2);
  }, []);

  const handleDrawerToggle = useCallback(() => setDrawerOpen(prev => !prev), []);
  const handleDrawerClose = useCallback(() => setDrawerOpen(false), []);

  const handleSearchClick = useCallback(() => {
    setDrawerOpen(false);
    toggleSearch();
  }, [toggleSearch]);

  const handleItemMouseEnter = useCallback((path, event) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    const position = updateLinePosition(event.currentTarget);
    if (position !== null) {
      setLinePosition(position);
      setIsLineVisible(true);
    }
  }, [updateLinePosition]);

  const handleItemMouseLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      const activeElement = findActiveElement();

      if (activeElement) {
        const position = updateLinePosition(activeElement);
        setLinePosition(position);
        setIsLineVisible(true);
      } else {
        setIsLineVisible(false);
      }
    }, HOVER_TIMEOUT_DELAY);
  }, [findActiveElement, updateLinePosition]);

  const handleNavigationClick = useCallback(() => {
    setDrawerOpen(false);
    scrollToTop();
  }, []);

  useEffect(() => {
    const activeElement = findActiveElement();

    if (activeElement) {
      requestAnimationFrame(() => {
        const position = updateLinePosition(activeElement);
        if (position !== null) {
          setLinePosition(position);
          setIsLineVisible(true);
        }
      });
    } else {
      setIsLineVisible(false);
    }
  }, [findActiveElement, updateLinePosition]);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <Box display={{ md: 'none' }} position="fixed" top={0} left={0} zIndex="overlay" p="1em" w="100%" bgColor="#060010">
        <Flex alignItems="center" gap="1em" justifyContent="space-between" transition=".2s ease" transform={isDrawerOpen ? 'translateY(-200%)' : 'none'}>
          <Link to="/">
            <Image src={Logo} height="32px" alt="React Bits logo" />
          </Link>
          <Flex alignItems="center" gap={2}>
            <IconButton
              {...ICON_BUTTON_STYLES}
              ref={searchBtnRef}
              icon={<SearchIcon />}
              onClick={handleSearchClick}
              aria-label="Toggle Search"
            />
            <IconButton
              {...ICON_BUTTON_STYLES}
              ref={menuBtnRef}
              icon={<HamburgerIcon />}
              onClick={handleDrawerToggle}
              aria-label="Open Menu"
            />
          </Flex>
        </Flex>
      </Box>

      <Drawer
        isOpen={isDrawerOpen}
        placement="left"
        onClose={handleDrawerClose}
        finalFocusRef={menuBtnRef}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent className="sidebar-mobile">
          <DrawerHeader py={0} h="72px" borderBottomWidth="1px" className="sidebar-logo">
            <Flex alignItems="center" justifyContent="space-between">
              <Link to="/">
                <Image src={Logo} alt="React Bits Logo" />
              </Link>
              <IconButton
                {...ICON_BUTTON_STYLES}
                size="md"
                icon={<CloseIcon boxSize={3} />}
                aria-label="Close Menu"
                onClick={handleDrawerClose}
              />
            </Flex>
          </DrawerHeader>
          <DrawerBody pb="6em">
            <VStack align="stretch" spacing={5} mt={8}>
              {CATEGORIES.map(category => (
                <Category
                  key={category.name}
                  category={category}
                  location={location}
                  handleClick={handleNavigationClick}
                  onItemMouseEnter={() => { }}
                  onItemMouseLeave={() => { }}
                  itemRefs={{}}
                />
              ))}
            </VStack>
            <Divider my={4} />
            <Text color="#a6a6a6" mb={3}>Useful Links</Text>
            <Flex direction="column">
              <Link to="https://github.com/DavidHDev/react-bits" target="_blank" display="block" mb={2} onClick={handleDrawerClose}>
                GitHub<ArrowForwardIcon {...ARROW_ICON_PROPS} />
              </Link>
              <Link to="/showcase" display="block" mb={2} onClick={handleDrawerClose}>
                Showcase<ArrowForwardIcon {...ARROW_ICON_PROPS} />
              </Link>
              <Link to="https://davidhaz.com/" target="_blank" display="block" mb={2} onClick={handleDrawerClose}>
                Who made this?<ArrowForwardIcon {...ARROW_ICON_PROPS} />
              </Link>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Box as="nav" position="fixed" top="57px" height="calc(100vh - 57px)" className="sidebar" overflowY="auto" bg={sidebarBgColor} w={{ base: 0, md: 40 }} p={5} display={{ base: 'none', md: 'block' }}>
        <Box ref={sidebarRef} position="relative">
          <Box
            position="absolute"
            left="0px"
            top="0"
            width="2px"
            height="16px"
            backgroundColor="#fff"
            borderRadius="1px"
            transform={isLineVisible && linePosition !== null ? `translateY(${linePosition - 8}px)` : 'translateY(-100px)'}
            opacity={isLineVisible ? 1 : 0}
            transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
            pointerEvents="none"
            zIndex={2}
          />
          <VStack align="stretch" spacing={4}>
            {CATEGORIES.map(category => (
              <Category
                key={category.name}
                category={category}
                location={location}
                handleClick={() => scrollToTop()}
                onItemMouseEnter={handleItemMouseEnter}
                onItemMouseLeave={handleItemMouseLeave}
                itemRefs={itemRefs}
              />
            ))}
          </VStack>
        </Box>
      </Box>
    </>
  );
};

const Category = memo(({ category, handleClick, location, onItemMouseEnter, onItemMouseLeave, itemRefs }) => {
  const subcategoryItems = useMemo(() =>
    category.subcategories.map(sub => {
      const path = `/${formatForURL(category.name)}/${formatForURL(sub)}`;
      const isActive = location.pathname === path;
      const isNew = NEW.includes(sub);
      const isUpdated = UPDATED.includes(sub);

      return {
        sub,
        path,
        isActive,
        isNew,
        isUpdated
      };
    }), [category.name, category.subcategories, location.pathname]
  );

  return (
    <Box>
      <Text className="category-name" mb={2}>{category.name}</Text>
      <Stack spacing={0.5} pl={4} borderLeft="1px solid #ffffff1c" position="relative">
        {subcategoryItems.map(({ sub, path, isActive, isNew, isUpdated }) => (
          <Link
            key={path}
            ref={el => itemRefs.current && (itemRefs.current[path] = el)}
            className={isActive ? 'sidebar-item active-sidebar-item' : 'sidebar-item'}
            to={path}
            onClick={handleClick}
            onMouseEnter={(e) => onItemMouseEnter(path, e)}
            onMouseLeave={onItemMouseLeave}
          >
            {sub}
            {isNew && <span className="new-tag">New</span>}
            {isUpdated && <span className="updated-tag">Updated</span>}
          </Link>
        ))}
      </Stack>
    </Box>
  );
});

Category.displayName = 'Category';

export default Sidebar;
