import React from "react";
import {
    BoxContainer,
    FormContainer,
    Input,
    MutedLink,
    SubmitButton,
} from "./common";
import { Marginer } from "../Marginer";

export function LoginForm() {

    return (
        <BoxContainer>
            <FormContainer>
                <Input type="text" placeholder="Nome" />
                <Input type="password" placeholder="Codigo do Armazém" />
            </FormContainer>
            <Marginer direction="vertical" margin={10} />
            <MutedLink href="#">Esqueceu seu código?</MutedLink>
            <Marginer direction="vertical" margin="1.6em" />
            <SubmitButton type="submit">Entrar</SubmitButton>
            <Marginer direction="vertical" margin="1em" />
        </BoxContainer>
    );
}