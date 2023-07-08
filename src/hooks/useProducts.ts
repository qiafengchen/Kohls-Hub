import useData from './useData';
import { GameQuery } from '../App';
interface PriceRange {
  minPrice: number | null;
  maxPrice: number | null;
}
export interface Product {
  webID: string;
  productTitle: string;
  image: {
    url: string;
    height: string;
    width: string;
  };
  prices: {
    regularPrice: PriceRange;
  }[];
  rating: { avgRating: number };
}

const useProducts = (gameQuery: GameQuery) => {
  const {
    data: products,
    error,
    isLoading,
  } = useData<Product>(
    '/products/list',
    'products',
    {
      params: {
        keyword: `${gameQuery?.searchText || ''} ${
          gameQuery?.category?.name || ''
        }`,
      },
    },
    [gameQuery]
  );

  return { products, error, isLoading };
};

export default useProducts;
