import {
  HStack,
  List,
  ListItem,
  Image,
  Button,
  Spinner,
  Heading,
} from '@chakra-ui/react';
import useGenres, { Category } from '../hooks/useCategories';

interface Props {
  onSelectCategory: (genre: Category) => void;
  selectedCategory: Category | null;
  onCloseDrawer?: () => void;
}

const GenreList = ({
  onSelectCategory,
  selectedCategory,
  onCloseDrawer,
}: Props): JSX.Element | null => {
  const { categories, error, isLoading } = useGenres();

  if (error) return null;

  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading fontSize={'2xl'} marginBottom={3}>
        Categories
      </Heading>
      <List>
        {categories.map((category) => (
          <ListItem key={category.ID} paddingY="5px">
            <Button
              whiteSpace={'normal'}
              textAlign={'left'}
              display={'block'}
              onClick={() => {
                onSelectCategory(category);
                if (onCloseDrawer) onCloseDrawer();
              }}
              fontSize={'16px'}
              fontWeight={
                category.ID === selectedCategory?.ID ? 'bold' : 'normal'
              }
              variant={'link'}
            >
              {category.name}
            </Button>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
