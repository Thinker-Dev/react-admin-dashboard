import React, { useRef } from "react";
import {
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../Marginer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserLoginDetails } from "../../../features/user/userSlice";

export function LoginForm() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    console.log(inputRef.current.value);
    axios
      .post("http://localhost:8000/funcionario/login", {
        email: inputRef.current.value,
      })
      .then((res) => {
        console.log("response", res.data);
        window.alert("sucesso");
        setUser(res.data);
      })
      .catch((err) => {
        console.log("error", err);
        window.alert("erro, tente novamente");
      });
  };
  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.func_nome,
        email: user.func_email,
        id: user.func_codigo,
        armazem: user.arm_codigo,
      })
    );
  };
  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Email" ref={inputRef} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Esqueceu seu código?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={handleSubmit}>
        Entrar
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
    </BoxContainer>
  );
}
