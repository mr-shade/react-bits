import './Header.scss';
import reactbitslogo from '../../../assets/logos/reactbits-logo.svg';
import github from '../../../assets/common/icon-github.svg';
import docs from '../../../assets/common/icon-docs.svg';
import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Fade from '../../../content/Animations/Fade/Fade';

const Header = () => {
  return (
    <header className="app-header">
      <nav className="header-content">
        <Fade blur>
          <Link className='logo' to="/">
            <img src={reactbitslogo} alt="The shape of a 3 point atom, representing a fraction of ReactJS" />
          </Link>
        </Fade>

        <Flex gap="8px" className='menu-items'>
          <Fade blur>
            <Text
              as="a"
              fontWeight={500}
              fontSize="16px"
              href="https://github.com/DavidHDev/react-bits"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={github} className='link-github' alt='minimal github octocat logo' /> GitHub
            </Text>
          </Fade>

          <Fade blur>
            <Text
              as={Link}
              fontWeight={500}
              fontSize="16px"
              to="/text-animations/split-text"
            >
              <img src={docs} alt='dotted icon representing a closed book' /> Docs
            </Text>
          </Fade>
        </Flex>
      </nav>
    </header>
  );
}

export default Header;