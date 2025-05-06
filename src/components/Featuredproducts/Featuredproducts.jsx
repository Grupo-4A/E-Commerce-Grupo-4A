import { Button, Card, Image, Text, Box } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // <-- IMPORTANTE

const FeaturedProducts = ({ products }) => {
  const navigate = useNavigate(); // <-- HOOK DE NAVEGACIÓN

  return (
    <Box display="flex" flexDirection="column" alignItems="center" m="25px">
      <Box display="flex" flexWrap="wrap" gap="20px" justifyContent="center">
        {products.map((product) => (
          <Card.Root
            key={product.id}
            display="flex"
            flexDirection="column"
            gap="5px"
            overflow="hidden"
            variant="ghost"
            borderRadius="30px 15px"
            maxW="200px"
            p="10px"
            maxH="460px"
            boxShadow="0px 6px 8px rgba(15, 15, 15, 0.5)"
            transition="transform 0.2s ease-in-out"
            _hover={{ transform: "scale(1.05)" }}
            bg="#F3F4F6"
          >
            <Image
              w="100%"
              h="150px"
              objectFit="cover"
              borderRadius="15px"
              src={product.image}
              alt={product.name}
            />

            <Card.Body gap="2" p="10px 5px" maxW="160px">
              <Card.Title mt="5px" fontSize="18px" fontWeight="bold" mb="5px">
                {product.name}
              </Card.Title>

              <Card.Description
                mt="5px"
                fontSize="14px"
                mb="10px"
                wordBreak="break-word"
                whiteSpace="normal"
                overflowWrap="break-word"
              >
                {product.description}
              </Card.Description>

              <Text fontSize="18px" fontWeight="bold" mt="5px" textAlign="right" color="#1E3A8A">
                ${product.price}
              </Text>
            </Card.Body>

            <Card.Footer mt="5px" gap="2" justifyContent="flex-end" p="10px 5px">
              <FiShoppingCart size="25px" color="#10B981" cursor="pointer" />
              <Button
                bg="#10B981"
                color="white"
                border="none"
                p="8px 12px"
                borderRadius="10px"
                cursor="pointer"
                fontSize="14px"
                transition="background 0.3s"
                _hover={{ bg: "#059669" }}
              >
                Comprar
              </Button>
            </Card.Footer>
          </Card.Root>
        ))}
      </Box>

      {/* Botón para ver todos los productos */}
      <Button
        mt="30px"
        bg="#60A5FA"
        color="white"
        borderRadius="10px"
        p="10px 20px"
        fontSize="16px"
        _hover={{ bg: "#2563eb" }}
        onClick={() => navigate("/categorias")} // <-- Ajusta esta ruta según tu router
      >
        Ver todos los productos
      </Button>
    </Box>
  );
};

export default FeaturedProducts;
