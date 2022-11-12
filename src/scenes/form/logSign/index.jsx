import React from "react";
import styled from "styled-components";
import { LoginForm } from "./loginForm";
import { motion } from "framer-motion";

const BoxContainer = styled.div`
  position: absolute;
  top: 5%;
  left: 20%;
  margin: -25px 0 0 -25px;
  width: 680px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: rgb(31,42,64);
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 130px;
  left: 337px;
  color: rgb(42,103,93);
`;

const TopContainer = styled.div`
  width: 100%;
  height: 310px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
  width: 160%;
  height: 600px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(140deg);
  top: -420px;
  left: -250px;
  background: rgb(31,42,64);
  background: linear-gradient(
    58deg,
    
    rgb(31,42,64,1) 20%,
    rgb(46,124,103,1) 100%
  );
`;

const W1Drop = styled(motion.div)`
  width: 25%;
  height: 30%;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(0deg);
  top: 85px;
  left: 320px;
  background: rgb(224,224,224);
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

const backdropVariants = {
    expanded: {
        width: "233%",
        height: "1050px",
        borderRadius: "20%",
        transform: "rotate(60deg)",
    },
    collapsed: {
        width: "160%",
        height: "550px",
        borderRadius: "50%",
        transform: "rotate(60deg)",
    },
};

const expandingTransition = {
    type: "spring",
    duration: 2.3,
    stiffness: 30,
};

export function AccountBox() {

    return (
        <BoxContainer>
            <TopContainer>
                <BackDrop
                    initial={false}
                    variants={backdropVariants}
                    transition={expandingTransition}
                />
                <W1Drop/>
                <LogoContainer>
                    <h1>AGRi-CAMP</h1>
                </LogoContainer>
                
                <HeaderContainer>
                    <HeaderText>Olá!</HeaderText>
                    <HeaderText>Bem Vindo</HeaderText>
                    <SmallText>Coloque as Credenciais para Continuar!</SmallText>
                </HeaderContainer>

            </TopContainer>
            <InnerContainer>
                <LoginForm />
            </InnerContainer>
        </BoxContainer>
    );
}