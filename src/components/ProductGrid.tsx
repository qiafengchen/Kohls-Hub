import { Text, SimpleGrid } from '@chakra-ui/react';
import useProducts from '../hooks/useProducts';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import ProductCardContainer from './ProductCardContainer';
import { GameQuery } from '../App';

interface Props {
  gameQuery: GameQuery;
}

const ProductGrid = ({ gameQuery }: Props): JSX.Element => {
  const { products, error, isLoading } = useProducts(gameQuery);
  const skeletons = [1, 2, 3, 4, 5, 6];

  if (error) return <Text>{error}</Text>;

  return (
    <>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={6}
        padding={'10px'}
        className="gameGrid"
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <ProductCardContainer key={skeleton}>
              <ProductCardSkeleton />
            </ProductCardContainer>
          ))}
        {products.map((product) => (
          <ProductCardContainer key={product.webID}>
            <ProductCard product={product} />
          </ProductCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default ProductGrid;
