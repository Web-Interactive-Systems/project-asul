import { Box, Heading, Button, Flex, Separator, Card, Text, Link } from "@radix-ui/themes";
import './landing.css'

export function Landing (){

    return (
        
        <Flex gap="9" direction="column" align="center">
                    
            <Flex gap="6" direction="row" align="center" justify="center" className="marge-container">
                <Flex gap="4" direction="column">
                    <Heading color="blue">This is my landing page</Heading> 
                    <Text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore exercitationem quibusdam omnis illum corrupti consequatur nostrum. Esse ducimus nesciunt quas. Fugit, recusandae soluta. Aperiam, iusto eligendi et modi quos culpa!</Text>
                    <Flex gap="3" align="center">
                        <Button><Link href="#" className="bouton-bleu">Connexion</Link></Button>
                        <Button variant="outline"><Link href="#">Inscription</Link></Button>
                    </Flex>   
                </Flex>
                <img src="#" alt="une image" />
            </Flex>

            <Card className="marge-container" style={{ width: 600 }}>
                <Flex gap="3" align="center" direction="column" className="container-insta">
                    <Heading>Compte Instagram</Heading>
                    <Text align="center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore exercitationem quibusdam omnis illum corrupti consequatur nostrum.</Text>
                    <Button><Link href="https://www.instagram.com/asulannion/" className="bouton-bleu">Aller voir</Link></Button>
                </Flex>
            </Card>

            <Flex gap="6" direction="row" align="center" justify="center" className="marge-container">
                <img src="#" alt="une image" />
                <Text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore exercitationem quibusdam omnis illum corrupti consequatur nostrum. Esse ducimus nesciunt quas. Fugit, recusandae soluta. Aperiam, iusto eligendi et modi quos culpa!</Text>
            </Flex>

            <Flex gap="6" direction="row" align="center" justify="center" className="fond-container-dashboard">
                <Flex gap="4" direction="column" align="start">
                    <Heading color="blue">Tableau de bord</Heading> 
                    <Text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore exercitationem quibusdam omnis illum corrupti consequatur nostrum. Esse ducimus nesciunt quas. Fugit, recusandae soluta. Aperiam, iusto eligendi et modi quos culpa!</Text>
                    <Button><Link href="#" className="bouton-bleu">Accéder au tableau de bord</Link></Button>  
                </Flex>
                <img src="#" alt="une image" />
            </Flex>

            <Flex direction="column" align="center" className="marge-container">
                <Heading>Tutorial</Heading>
                <Separator orientation="horizontal" size="3" />
            </Flex>

        </Flex>


    )
     
    
}
