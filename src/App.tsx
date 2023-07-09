import React from 'react';
import { Box, Flex, Grid, GridItem, HStack, Show } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import ProductGrid from './components/ProductGrid';
import GenreList from './components/CategoryList';
import { Category } from './hooks/useCategories';
import SortSelector, { Order } from './components/SortSelector';
import ProductHeading from './components/ProductHeading';

export interface GameQuery {
  category: Category | null;
  ordering: Order | null;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = React.useState<GameQuery>({} as GameQuery);

  return (
    <Grid
      templateAreas={{
        base: `"nav"" main" `,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{ base: '1fr', lg: '200px 1fr' }}
    >
      <GridItem area="nav">
        <NavBar
          onSearch={(searchText) =>
            setGameQuery((prev) => ({ ...prev, searchText }))
          }
          selectedCategory={gameQuery.category}
          onSelectCategory={(category) =>
            setGameQuery((prev) => ({ ...prev, category }))
          }
        />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList
            selectedCategory={gameQuery.category}
            onSelectCategory={(category) =>
              setGameQuery((prev) => ({ ...prev, category }))
            }
          />
        </GridItem>
      </Show>

      <GridItem area="main">
        <Box paddingLeft={2}>
          <ProductHeading gameQuery={gameQuery} />
          <Flex marginBottom={5}>
            <SortSelector
              selectedOrdering={gameQuery.ordering}
              onSelectedOrdering={(ordering) => {
                setGameQuery((prev) => ({ ...prev, ordering }));
              }}
            />
          </Flex>
        </Box>
        <ProductGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
