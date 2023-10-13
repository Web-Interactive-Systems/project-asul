import Themes from "@/features/Theme/Themes";
import {Header} from "@/components/Header";


export function Layout2( { children } ){
    // console.log(props);
return (
    
    <Themes>
        <Header></Header>
        {children}
    </Themes>
)
}