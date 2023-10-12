import { Box, Heading, Button, Flex, Separator, Card, Text, Link } from "@radix-ui/themes";
import './landing.css';
import img from '../../assets/pexels-vlad-vasnetsov-2202685.jpg';

export function Landing (){

    return (
        
        <Flex gap="9" direction="column" align="center" justify="center">
                    
            <Flex gap="6" direction={{initial: 'column', xs: 'column', sm: 'row'}} align="center" justify="center" className="marge-container">
                <Flex gap="4" direction="column">
                    <Heading color="blue" size={{initial: '4', xs: '5', md: '7'}}>This is my landing page</Heading> 
                    <Text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore exercitationem quibusdam omnis illum corrupti consequatur nostrum. Esse ducimus nesciunt quas. Fugit, recusandae soluta. Aperiam, iusto eligendi et modi quos culpa!</Text>
                    <Flex gap="3" align="center">
                        <Button><Link href="#" className="bouton-bleu">Connexion</Link></Button>
                        <Button variant="outline"><Link href="#">Inscription</Link></Button>
                    </Flex>   
                </Flex>
                <Box>
                    <img src={img.src} alt="une image"  style={{ width: 300 }}/>
                </Box>
            </Flex>


            <Card className="marge-container">
                <Flex gap="3" align="center" direction="column" className="container-insta">
                    <Heading size={{initial: '4', xs: '5', md: '7'}}>Compte Instagram</Heading>
                    <Text align="center" size={{initial: '1', xs: '3', md: '5'}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore exercitationem quibusdam omnis illum corrupti consequatur nostrum.</Text>
                    <Button><Link href="https://www.instagram.com/asulannion/" className="bouton-bleu">Aller voir</Link></Button>
                </Flex>
            </Card>

            <Flex gap="6" direction={{initial: 'column', xs: 'column', sm: 'row'}} align="center" justify="center" className="marge-container">
                <img src={img.src} alt="une image" style={{ width: 300 }}/>
                <Text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore exercitationem quibusdam omnis illum corrupti consequatur nostrum. Esse ducimus nesciunt quas. Fugit, recusandae soluta. Aperiam, iusto eligendi et modi quos culpa!</Text>
            </Flex>

            <Flex gap="6" direction={{initial: 'column', xs: 'column', sm: 'row'}} align="center" justify="center" className="fond-container-dashboard">
                <Flex gap="4" direction="column" align="start">
                    <Heading color="blue" size={{initial: '4', xs: '5', md: '7'}}>Tableau de bord</Heading> 
                    <Text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore exercitationem quibusdam omnis illum corrupti consequatur nostrum. Esse ducimus nesciunt quas. Fugit, recusandae soluta. Aperiam, iusto eligendi et modi quos culpa!</Text>
                    <Button><Link href="#" className="bouton-bleu">Accéder au tableau de bord</Link></Button>  
                </Flex>
                <img src={img.src} alt="une image" style={{ width: 300 }}/>
            </Flex>

            <Flex direction="column" align="center" className="marge-container">
                <Heading size={{initial: '4', xs: '5', md: '7'}}>Tutorial</Heading>
                <Separator orientation="horizontal" size="3" />
            </Flex>

        </Flex>


    )
     
    
}
