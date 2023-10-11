import { Heading, Flex, Link, Button} from "@radix-ui/themes";
import ThemeToggle from "@/features/Theme/ThemeToggle";
import "@/components/Header.css"

export function Header(){
    return(
        <Flex direction="row" className="header-list" align="center" size={{initial: '', md: '', xl: '8'}}>
            <Flex direction="row" gap="3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M1.5 3a.5.5 0 0 0 0 1h12a.5.5 0 0 0 0-1h-12ZM1 7.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5Zm0 4a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5Z" clip-rule="evenodd"/></svg>
                <Heading size="4"><Link href="#">Dashboard</Link></Heading>
                <Heading size="4"><Link href="#">Match</Link></Heading>
            </Flex>
            <Flex direction="row" gap="3" align="center">
                <ThemeToggle client:load/>
                <Heading size="4" className="None"><Link href="#">Profil</Link></Heading>
                <Button><Link href="#" className="white">Connexion</Link></Button>
                <Button className="None"><Link href="#" className="white">Déconnexion</Link></Button>
                <Button variant="outline"><Link href="#">Inscription</Link></Button>
                
            </Flex>
        </Flex>
    )
}
