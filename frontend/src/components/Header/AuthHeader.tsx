import Header from "./Header";
import { authLinks } from "../../constants/links";
import DefaultButton from "../DefaultButton/DefaultButton";

export default function AuthHeader () {
    return(
        <Header links={authLinks}>
            <DefaultButton borderColor="var(--main-color1)">
                Log out
            </DefaultButton>
        </Header>
    )
}