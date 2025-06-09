import {
  Box,
  Flex,
  VStack,
  Text,
  Stack,
  Icon,
  IconButton,
  Drawer,
  Image,
  Separator,
} from "@chakra-ui/react";
import {
  FiArrowRight,
  FiMenu,
  FiSearch,
  FiX,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import {
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  useMemo,
  memo,
  useEffect,
} from "react";
import { CATEGORIES, NEW, UPDATED } from "../../constants/Categories";
import { useSearch } from "../context/SearchContext/useSearch";
import Logo from "../../assets/logos/react-bits-logo.svg";

const HOVER_TIMEOUT_DELAY = 150;
const ICON_BUTTON_STYLES = {
  rounded: "10px",
  border: "1px solid #ffffff1c",
  bg: "#060010",
};
const ARROW_ICON_PROPS = {
  boxSize: 4,
  transform: "rotate(-45deg)",
};

const scrollToTop = () => window.scrollTo(0, 0);
const slug = (str) => str.replace(/\s+/g, "-").toLowerCase();

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

  const findActiveElement = useCallback(() => {
    for (const category of CATEGORIES) {
      const activeItem = category.subcategories.find((sub) => {
        return location.pathname === `/${slug(category.name)}/${slug(sub)}`;
      });
      if (activeItem)
        return itemRefs.current[
          `/${slug(category.name)}/${slug(activeItem)}`
        ];
    }
    return null;
  }, [location.pathname]);

  const updateLinePosition = useCallback((el) => {
    if (!el || !sidebarRef.current || !sidebarRef.current.offsetParent) return null;
    const sidebarRect = sidebarRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    return elRect.top - sidebarRect.top + elRect.height / 2;
  }, []);

  const handleDrawerToggle = () => setDrawerOpen((p) => !p);
  const closeDrawer = () => setDrawerOpen(false);
  const onSearchClick = () => {
    closeDrawer();
    toggleSearch();
  };
  const onNavClick = () => {
    closeDrawer();
    scrollToTop();
  };

  const onItemEnter = (path, e) => {
    clearTimeout(hoverTimeoutRef.current);
    const pos = updateLinePosition(e.currentTarget);
    if (pos !== null) {
      setLinePosition(pos);
      setIsLineVisible(true);
    }
  };

  const onItemLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      const activeEl = findActiveElement();
      if (activeEl) {
        setLinePosition(updateLinePosition(activeEl));
        setIsLineVisible(true);
      } else setIsLineVisible(false);
    }, HOVER_TIMEOUT_DELAY);
  };

  useLayoutEffect(() => {
    const activeEl = findActiveElement();
    if (!activeEl) {
      setIsLineVisible(false);
      return;
    }
    const pos = updateLinePosition(activeEl);
    if (pos !== null) {
      setLinePosition(pos);
      setIsLineVisible(true);
    } else {
      setIsLineVisible(false);
    }
  }, [findActiveElement, updateLinePosition]);

  useEffect(() => () => clearTimeout(hoverTimeoutRef.current), []);

  return (
    <>
      <Box
        display={{ md: "none" }}
        position="fixed"
        top={0}
        left={0}
        zIndex="overlay"
        w="100%"
        bg="#060010"
        p="1em"
      >
        <Flex
          align="center"
          justify="space-between"
          gap="1em"
        >
          <Link to="/">
            <Image src={Logo} h="32px" alt="React Bits logo" />
          </Link>

          <Flex gap={2}>
            <IconButton
              {...ICON_BUTTON_STYLES}
              ref={searchBtnRef}
              aria-label="Search"
              onClick={onSearchClick}
            >
              <Icon as={FiSearch} color='#fff' />
            </IconButton>
            <IconButton
              {...ICON_BUTTON_STYLES}
              ref={menuBtnRef}
              aria-label="Open Menu"
              onClick={handleDrawerToggle}
            >
              <Icon as={FiMenu} color='#fff' />
            </IconButton>
          </Flex>
        </Flex>
      </Box>

      <Drawer.Root
        open={isDrawerOpen}
        onOpenChange={closeDrawer}
        placement="left"
        size="full"
      >
        <Drawer.Backdrop />
        <Drawer.Positioner w="100vw"
          sx={{
            transition: "transform 0.3s ease",
            "&[data-state='closed']": { transform: "translateX(-100%)" },
            "&[data-state='open']": { transform: "translateX(0)" },
          }}
          maxW="100vw">
          <Drawer.Content bg="#060010">
            <Drawer.Header
              h="72px"
              py={2}
              borderBottom="1px solid #ffffff1c"
              className="sidebar-logo"
            >
              <Flex align="center" justify="space-between" w="100%">
                <Link to="/">
                  <Image src={Logo} alt="Logo" h="28px" />
                </Link>
                <IconButton
                  {...ICON_BUTTON_STYLES}
                  aria-label="Close"
                  onClick={closeDrawer}
                >
                  <Icon as={FiX} color='#fff' />
                </IconButton>
              </Flex>
            </Drawer.Header>

            <Drawer.Body pb="6em">
              <VStack align="stretch" spacing={5} mt={8}>
                {CATEGORIES.map((cat) => (
                  <Category
                    key={cat.name}
                    category={cat}
                    location={location}
                    handleClick={onNavClick}
                    onItemMouseEnter={() => { }}
                    onItemMouseLeave={() => { }}
                    itemRefs={{}}
                  />
                ))}
              </VStack>

              <Separator my={4} />
              <Text color="#a6a6a6" mb={3}>
                Useful Links
              </Text>
              <Flex direction="column" gap={2}>
                <Link
                  to="https://github.com/DavidHDev/react-bits"
                  target="_blank"
                  onClick={closeDrawer}
                  display="block"
                  mb={2}
                >
                  <Flex alignItems="center" gap='4px'><span>GitHub</span> <Icon as={FiArrowRight} {...ARROW_ICON_PROPS} /></Flex>
                </Link>
                <Link
                  to="/showcase"
                  onClick={closeDrawer}
                  display="block"
                  mb={2}
                >
                  <Flex alignItems="center" gap='4px'><span>Showcase</span> <Icon as={FiArrowRight} {...ARROW_ICON_PROPS} /></Flex>
                </Link>
                <Link
                  to="https://davidhaz.com/"
                  target="_blank"
                  onClick={closeDrawer}
                  display="block"
                  mb={2}
                >
                  <Flex alignItems="center" gap='4px'><span>Who made this?</span> <Icon as={FiArrowRight} {...ARROW_ICON_PROPS} /></Flex>
                </Link>
              </Flex>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>

      <Box
        as="nav"
        position="fixed"
        top="57px"
        h="calc(100vh - 57px)"
        w={{ base: 0, md: 40 }}
        p={5}
        overflowY="auto"
        display={{ base: "none", md: "block" }}
        className="sidebar"
      >
        <Box ref={sidebarRef} position="relative">
          <Box
            position="absolute"
            left="0"
            w="2px"
            h="16px"
            bg="#fff"
            rounded="1px"
            transform={
              isLineVisible && linePosition !== null
                ? `translateY(${linePosition - 8}px)`
                : "translateY(-100px)"
            }
            opacity={isLineVisible ? 1 : 0}
            transition="all 0.2s cubic-bezier(0.4,0,0.2,1)"
            pointerEvents="none"
            zIndex={2}
          />

          <VStack align="stretch" spacing={4}>
            {CATEGORIES.map((cat) => (
              <Category
                key={cat.name}
                category={cat}
                location={location}
                handleClick={scrollToTop}
                onItemMouseEnter={onItemEnter}
                onItemMouseLeave={onItemLeave}
                itemRefs={itemRefs}
              />
            ))}
          </VStack>
        </Box>
      </Box>
    </>
  );
};

const Category = memo(
  ({
    category,
    handleClick,
    location,
    onItemMouseEnter,
    onItemMouseLeave,
    itemRefs,
  }) => {
    const items = useMemo(
      () =>
        category.subcategories.map((sub) => {
          const path = `/${slug(category.name)}/${slug(sub)}`;
          return {
            sub,
            path,
            isActive: location.pathname === path,
            isNew: NEW.includes(sub),
            isUpdated: UPDATED.includes(sub),
          };
        }),
      [category.name, category.subcategories, location.pathname]
    );

    return (
      <Box>
        <Text className="category-name" mb={2}>
          {category.name}
        </Text>
        <Stack
          spacing={0.5}
          pl={4}
          borderLeft="1px solid #ffffff1c"
          position="relative"
        >
          {items.map(({ sub, path, isActive, isNew, isUpdated }) => (
            <Link
              key={path}
              ref={(el) =>
                itemRefs.current && (itemRefs.current[path] = el)
              }
              to={path}
              className={
                isActive ? "sidebar-item active-sidebar-item" : "sidebar-item"
              }
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
  }
);

Category.displayName = "Category";

export default Sidebar;
