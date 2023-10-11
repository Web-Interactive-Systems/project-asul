import { Heading, Flex, Box} from "@radix-ui/themes";
import Link from "./ItemMenu.jsx";


export function Header(){
    return(
        <Flex direction="row" gap="3">
            <Box>
                <Heading size="6"><Link></Link></Heading>
                <Heading size="6"><a href="#">Match</a></Heading>
                <Heading size="6"><a href="#">Profil</a></Heading>
            </Box>
            <Heading size="6"><a href="#">Connexion</a></Heading>
            <Heading size="6"><a href="#">Déconnexion</a></Heading>
            <Heading size="6"><a href="#">Inscription</a></Heading>
        </Flex>
    )
}
