
import { Flex, Box } from "@chakra-ui/react";

import ProductCard from "../components/ProductCard/Productcard.jsx";
import Filters from "../components/Filters/Filters.jsx";
import products from "../data/products.js";

const ProductListPage = () => {
  return (
    <Flex
      mt="20px"
      px="20px"
      gap="20px"
      align="flex-start"
      bg="#2C5282"
      minH="100vh"
    >
      <Filters />nhn

      {/* Contenedor de tarjetas */}
      <Box
        flex="1"
        display="flex"
        flexWrap="wrap"
        gap="20px"
        justifyContent="flex-start"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </Flex>
  );
};

export default ProductListPage;
