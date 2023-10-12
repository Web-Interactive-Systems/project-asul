import { Heading, Flex, Link, Button, Text, DropdownMenu} from "@radix-ui/themes";
import ThemeToggle from "@/features/Theme/ThemeToggle";
import Logo from "./Logo.jsx";
import Menu from "./Menu.jsx";
import "@/components/Header.css";

export function Header(){
    return(
        <Flex direction="row" className="header-list" align="center">
                
            <Logo />

            <Flex direction="row" gap="3" align="center" display={{initial:'none', md: 'flex' }}>
                <ThemeToggle client:load/>
                <Heading size="4" className='none'><Link href="#">Profil</Link></Heading>
                <Button><Link href="#" className="white">Connexion</Link></Button>
                <Button variant="outline"><Link href="#">Inscription</Link></Button>
            </Flex>

            <Flex align="center" gap="5" display={{ md: 'none' }}>
                <ThemeToggle client:load/>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <Button variant="soft">
                            <Menu />
                        </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Item>Connexion</DropdownMenu.Item>
                        <DropdownMenu.Item>Inscription</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </Flex>
 
        </Flex>
    )
};

