import React, { Fragment, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PageHeader from "../../components/page-header/PageHeader";
import Sidebar from "../../components/sidebar/Sidebar";
import UnderConstruction from "../../components/under-consruction/UnderConstruction";
import styled from "styled-components";
import darkBackgroundImage from "../../assets/kelly-sikkema-huT1A8nW_Ho-unsplash.jpg";
import { Dashboard } from "../../pages/dashboard/Dashboard";
import { Home } from "../../pages/home/Home";
import { Helmet } from "react-helmet-async";

function getInitialPage(): string {
  const currentPage = window.location.href.split("/").slice(-1)[0];
  return currentPage ? currentPage : "Home";
}

const App = styled.div`
  overflow: hidden;
  margin: 0;
  padding: 0;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  display: grid;
  grid-template-columns: 6% 94%;
  color: ${(p) => p.theme.textColor};

  @media (max-width: 900px) {
    grid-template-columns: 100%;
  }
`;

const BackgroundCover = styled.div`
  background-color: #3c493f;
  background-image: url(${darkBackgroundImage});
  background-size: auto;
  background-position: center;
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  filter: ${(p) =>
    p.theme.theme === "dark" ? "invert() brightness(0.5)" : null};
`;

const MainWrapper = styled.div`
  flex-grow: 1;
  color: ${(p) => p.theme.primary};
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const Main = (): JSX.Element => {
  useEffect(() => {
    setCurrentPage(getInitialPage());
  }, []);

  const [currentPage, setCurrentPage] = useState("");

  function handlePageChange(page: string): void {
    setCurrentPage(page);
  }

  return (
    <Fragment>
      <Helmet>
        <title>Aleksa Kis - Todo</title>
        <meta name="description" content="Todo" />
      </Helmet>
      <App>
        <BackgroundCover />
        <Sidebar data-testid="sidebar" pageChange={handlePageChange} />
        <MainWrapper>
          <PageHeader pageTitle={currentPage} />
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/dashboard">
              <Dashboard data-testid="todo-wrapper" />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </MainWrapper>
      </App>
    </Fragment>
  );
};

function About() {
  return <UnderConstruction />;
}

export default Main;
