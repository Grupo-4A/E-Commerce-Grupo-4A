import { Button, Card, Image, Text } from "@chakra-ui/react"
import { FiShoppingCart } from "react-icons/fi";
const FeaturedProducts = () => {
  return (

    <Card.Root  display="flex"  flexWrap="wrap" gap="5px"
              m="25px"overflow="hidden" variant="ghost"borderRadius="30px 15px"  
              maxW="200px" p="10px"  maxH="460px"
              boxShadow="0px 6px 8px rgba(15, 15, 15, 0.5)" 
              transition="transform 0.2s ease-in-out" _hover={{ transform: "scale(1.05)" }}
              bg="#F3F4F6" 
    >

      <Image w="100%" h="150px"  objectFit="cover" borderRadius="15px"
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Green double couch with wooden legs"
      />

      <Card.Body gap="2" p="10px 5px" maxW="160px" > 

        <Card.Title mt="5px" fontSize="18px" fontWeight="bold" mb="5px">Titulo</Card.Title>

        <Card.Description mt="5px" fontSize="14px" 
        mb="10px" wordBreak="break-word"
        whiteSpace="normal" overflowWrap="break-word">
          This sofa is perfect for modern tropical spaces.
        </Card.Description> 

        <Text fontSize="18px" fontWeight="bold" mt="5px" textAlign="right" color="#1E3A8A">
          $450.000
        </Text>
      </Card.Body>

      <Card.Footer mt="5px" gap="2" justifyContent="flex-end" p="10px 5px">

         <FiShoppingCart size="25px" 
                        color="#10B981" 
                        cursor="pointer" 
                        transition="background 0.3s"
                        _hover={{ bg: "#059669" }}
  
                        />
        
        <Button  bg="#10B981" color="white" border="none" 
                p="8px 12px" borderRadius="10px" cursor="pointer" 
                fontSize="14px" transition="background 0.3s"_hover={{ bg: "#059669" }} 
                >Comprar</Button>
      </Card.Footer>
    </Card.Root>
  );
}
export default FeaturedProducts;