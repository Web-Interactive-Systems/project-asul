import { Heading, Flex, Box} from "@radix-ui/themes";
import {Link} from "@/components/ItemMenu.jsx";
import ThemeToggle from "@/features/Theme/ThemeToggle";


export function Header(){
    return(
        <Flex direction="row" >
            <Flex direction="row" gap="3">
                <Heading size="6"><Link title="Dashboard"></Link></Heading>
                <Heading size="6"><Link title="Match"></Link></Heading>
                <Heading size="6"><Link title="Profil"></Link></Heading>
            </Flex>
            <Flex direction="row" gap="3">
                <ThemeToggle />
                <Heading size="6"><Link title="Connexion"></Link></Heading>
                <Heading size="6"><Link title="Déconnexion"></Link></Heading>
                <Heading size="6"><Link title="Inscription"></Link></Heading>
            </Flex>
        </Flex>
    )
}
