import { Box, Heading, Button, Flex } from "@radix-ui/themes";

export function Landing (){

    return (
        
        <Flex gap="9" direction="row" align="center" justify="center" >
            <Box>
                <Heading color="blue">This is my landing page</Heading> 
                <Flex gap="3" align="center">
                    <Button>Connexion</Button>
                    <Button variant="outline">Inscription</Button>
                </Flex>   
            </Box>
            <img src="#" alt="une image" />
        </Flex>
        
    )
        
}
