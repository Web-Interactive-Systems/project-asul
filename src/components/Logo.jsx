import {Flex, Text} from "@radix-ui/themes";

import logo from './Logo.png'

export default function Logo(){

    return(
        <Flex gap="1" align="center">
            <img src={logo.src} alt="Logo ASUL" width="32" height="32"/>
            <Text>ASUL</Text>
        </Flex>
    )
}