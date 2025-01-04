import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { componentMap } from '../constants/ComponentMap';
import { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { decodeLabel } from '../utils/utils';

import BackToTopButton from '../components/common/BackToTopButton';

const CategoryPage = () => {
  const { category, subcategory } = useParams(); // Extract category and subcategory from the URL
  const scrollRef = useRef(null);

  const SubcategoryComponent = componentMap[subcategory];

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, [subcategory])

  return (
    <Box className='category-page' ref={scrollRef}>
      <h1 className='main-category'>{decodeLabel(category)}</h1>
      <h2 className='sub-category'>{decodeLabel(subcategory)}</h2>
      {SubcategoryComponent ? (
        <>
          <Helmet>
            <title>React Bits - {decodeLabel(subcategory)}</title>
          </Helmet>
          <SubcategoryComponent />
        </>
      ) : (
        <p className='coming-soon'>This component is work in progress. <br />
          Follow the project on <a href="https://github.com/DavidHDev/react-bits" target="_blank" rel="noreferrer">GitHub</a> for regular updates.
        </p>
      )}

      <BackToTopButton />
    </Box>
  );
}

export default CategoryPage;