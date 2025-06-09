import { useEffect, useRef, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { componentMap } from '../constants/Components';
import { decodeLabel } from '../utils/utils';
import { Box } from '@chakra-ui/react';

import BackToTopButton from '../components/common/BackToTopButton';

const CategoryPage = () => {
  const { subcategory } = useParams();
  const scrollRef = useRef(null);
  
  const pageTitle = `React Bits - ${decodeLabel(subcategory)}`;
  const SubcategoryComponent = subcategory ? lazy(componentMap[subcategory]) : null;

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, [subcategory]);

  return (
    <Box className='category-page' ref={scrollRef}>
      <title>{pageTitle}</title>
      <h2 className='sub-category'>{decodeLabel(subcategory)}</h2>

      <Suspense>
        <SubcategoryComponent />
      </Suspense>

      <BackToTopButton />
    </Box>
  );
};

export default CategoryPage;
