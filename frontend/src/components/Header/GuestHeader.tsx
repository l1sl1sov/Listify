import Header from "./Header";
import { guestlinks } from '../../constants/links';
import DefaultButton from "../DefaultButton/DefaultButton";

export default function GuestHeader () {
    return(
        <Header textColor={'white'} links={guestlinks}>
            <DefaultButton borderColor='var(--light-blue)' padding="0.5rem 1rem">
                Log In
            </DefaultButton>
            <DefaultButton borderColor='var(--main-color1)' padding="0.5rem 2rem">
                Sign Up
            </DefaultButton>
        </Header>
    )
}