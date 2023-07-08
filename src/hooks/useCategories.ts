import useData from './useData';

export interface Category {
  ID: string;
  name: string;
  slug: string;
  image_background: string;
}

const useCategories = () => {
  const {
    data: categories,
    error,
    isLoading,
  } = useData<Category>('/categories/list', 'categories');

  return { categories, error, isLoading };
};

export default useCategories;
