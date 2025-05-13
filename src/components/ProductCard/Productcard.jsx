// components/ProductCard.jsx
import { Button, Card, Image, Text } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ProductCard = ({ product }) => {
  const navigate = useNavigate(); // Initialize navigate

  const handleClick = () => {
    navigate("/descripcion", { state: { product } }); // Navigate to the description page with product data
  };

  return (
    <Card.Root
      maxW="250px"
      display="flex"
      flexWrap="wrap"
      gap="5px"
      borderRadius="15px"
      overflow="hidden"
      maxH="460px"
      boxShadow="0px 6px 8px rgba(15, 15, 15, 0.5)"
      transition="transform 0.2s ease-in-out"
      _hover={{ transform: "scale(1.05)" }}
      bg="#F3F4F6"
      m="10px"
      cursor="pointer" // Indicate it's clickable
      onClick={handleClick} // Attach the click handler
    >
      <Image
        w="100%"
        objectFit="cover"
        src={product.image}
        alt={product.name}
      />
      <Card.Body gap="2" maxW="260px">
        <Card.Title>{product.name}</Card.Title>
        <Card.Description wordBreak="break-word" whiteSpace="normal" overflowWrap="break-word">
          {product.description}
        </Card.Description>
        <Text display="flex" justifyContent="flex-end" color="gold" fontSize="18px" pr="2">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiOutlineStar />
        </Text>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" textAlign="right" color="#1E3A8A">
          ${product.price}
        </Text>
      </Card.Body>
      <Card.Footer gap="2" mt="5px" justifyContent="flex-end" p="10px 5px">
        <Button
          variant="ghost"
          bg="#10B981"
          color="white"
          borderRadius="10px"
          cursor="pointer"
          fontSize="14px"
          transition="background 0.3s"
          _hover={{ bg: "#059669" }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click when button is clicked
            // Handle "Add to cart" logic here
            console.log(`Added ${product.name} to cart`);
          }}
        >
          <FiShoppingCart />
          Add to cart
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;