import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { PrimaryButton } from "../../components/buttons/primary";
import { styleConstants } from "../../styles/style-contatns";
import React, { Fragment } from "react";
import { Helmet } from "react-helmet-async";

const HomeWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${(p) => p.theme.homeBackgroundColor};
  padding: ${styleConstants.spacing.double} ${styleConstants.spacing.quadruple};
  color: ${(p) => p.theme.textColor};
  position: relative;
  text-align: justify;

  p {
    line-height: 21px;
  }
`;

const Header = styled.div`
  padding-left: ${styleConstants.spacing.regular};
  h1 {
    color: ${(p) => p.theme.primary};
    font-size: 64px;
    margin-bottom: 0;
  }
  span {
    padding-left: ${styleConstants.spacing.double};
    color: ${(p) => p.theme.textColorAlt};
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 4px;
  }
`;

const VisitTodos = styled.div`
  align-self: center;
  margin: ${styleConstants.spacing.regular};
`;

const InfoFooter = styled.div`
  position: absolute;
  bottom: 45px;
  color: ${(p) => p.theme.primary};
  left: 50%;
  transform: translate(-50%, 50%);
  font-weight: bold;
  letter-spacing: 5px;
`;

export const Home = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Home - Todo</title>
        <meta name="description" content="Todo home page" />
      </Helmet>
      <HomeWrapper>
        <Header>
          <h1>Write your Todo's</h1>
          <span>Demo React practice app</span>
        </Header>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec ex
          posuere, ultrices orci id, fringilla nisl. Sed molestie ipsum non sem
          fringilla tempor. Nam at laoreet libero. Class aptent taciti sociosqu
          ad litora torquent per conubia nostra, per inceptos himenaeos. Sed non
          orci ornare urna lacinia vestibulum eu eget magna. Cras ultrices
          laoreet nibh, in maximus lorem porta id. Curabitur egestas sodales
          odio eget tincidunt. Integer eget sapien aliquam, mattis arcu sed,
          fermentum <br /> <br />
          dolor. Donec tempus, velit quis euismod rutrum, metus sem vehicula
          erat, viverra viverra nibh turpis eu purus. Orci varius natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          Morbi ut magna sed justo maximus pulvinar et ac turpis. Nunc eu est
          vitae felis rhoncus dignissim id suscipit ex. Vivamus mattis egestas
          eros vitae iaculis. Ut quis sapien at justo venenatis molestie et nec
          urna. Vestibulum vel augue et sapien tristique posuere id a massa.
          Nulla luctus blandit
          <br /> <br />
          condimentum. Phasellus et molestie risus. Nulla facilisi. Praesent
          quis dui dui. In dignissim turpis vel metus aliquam euismod. Phasellus
          rutrum eleifend ligula eget ultrices. Curabitur blandit, arcu sit amet
          lacinia facilisis, ipsum mi semper metus, sit amet sagittis enim mi
          nec elit. Nullam tristique varius velit, in volutpat libero.
          Suspendisse lacinia semper massa quis ornare. Nam volutpat lectus
          ligula, sit amet egestas turpis efficitur id. Aliquam vitae odio
          elementum, gravida libero
          <br />
          fermentum, posuere magna. Mauris eu dignissim leo, nec faucibus
          lectus. Orci varius natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Aenean vitae volutpat augue. Nulla dui ligula,
          varius non felis vel, tempor interdum augue. Fusce ut justo dictum,
          gravida sapien vel, interdum urna. Pellentesque tincidunt ante id
          placerat sodales.
        </p>
        <VisitTodos>
          <NavLink to="/dashboard">
            <PrimaryButton size="medium">Begin</PrimaryButton>
          </NavLink>
        </VisitTodos>
        <InfoFooter>
          <span>Aleksa Kis | Todo App | 2021</span>
        </InfoFooter>
      </HomeWrapper>
    </Fragment>
  );
};
