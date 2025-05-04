import { useEffect, useState } from 'react';
import { Flex, Box } from "@chakra-ui/react";
import { useLocation } from 'react-router-dom';
import ProductCard from "../components/ProductCard/Productcard.jsx";
import Filters from "../components/Filters/Filters.jsx";
import products from "../data/products.js";

const ProductListPage = () => {

  return (
    <Flex
      mt="80px"
      px="20px"
      gap="20px"
      align="flex-start"
      bg="#1E3A8A"
      minH="100vh"
    >
        <Filters />

      {/* Tarjetas */}
      <Box
        flex="1"
        display="flex"
        flexWrap="wrap"
        gap="20px"
        justifyContent="flex-start"
      >
        {/* Renderizar múltiples tarjetas */}
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </Box>
    </Flex>
  );
};

export default ProductListPage;
