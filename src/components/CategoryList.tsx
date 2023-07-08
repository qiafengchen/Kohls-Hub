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
}

const GenreList = ({
  onSelectCategory,
  selectedCategory,
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
            {/* <HStack> */}
            {/* <Image
                boxSize="32px"
                borderRadius={8}
                objectFit={'cover'}
                src={getCroppedImageUrl(category.image_background)}
              /> */}
            <Button
              whiteSpace={'normal'}
              textAlign={'left'}
              display={'block'}
              onClick={() => {
                onSelectCategory(category);
              }}
              fontSize={'16px'}
              fontWeight={
                category.ID === selectedCategory?.ID ? 'bold' : 'normal'
              }
              variant={'link'}
            >
              {category.name}
            </Button>
            {/* </HStack> */}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
