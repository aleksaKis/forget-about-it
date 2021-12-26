import { NavLink } from "react-router-dom";
import classes from "./Sidebar.module.scss";
import { ReactComponent as TodoIcon } from "../icons/th-list-solid.svg";
import styled from "styled-components";
import { styleConstants } from "../../styles/style-contatns";
import React from "react";

interface SidebarProps {
  pageChange: (page: string) => void;
}

const SideBarWrapper = styled.div`
  min-width: 75px;
  display: flex;
  background: ${(p) => p.theme.backgroundColor};
  flex-direction: column;
  user-select: none;
  box-shadow: 5px 0px 28px -11px rgba(0, 0, 0, 0.75);
  z-index: 3;

  @media (max-width: 900px) {
    flex-direction: row;
    align-items: center;
    height: 70px;
  }
`;

const Logo = styled.h1`
  margin-top: ${styleConstants.spacing.triple};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: ${(p) => p.theme.primary};
`;

const MenuItem = styled.li`
  list-style-type: none;
  margin: 0 ${styleConstants.spacing.half} 0 ${styleConstants.spacing.half};
  font-size: 18px;
  font-weight: bold;

  .active {
    border-bottom: 3px solid ${(p) => p.theme.primary};
    color: ${(p) => p.theme.primary} !important;
    transition: color ${styleConstants.animation.transition},
      border-bottom 150ms ease-in-out;
  }

  & > a {
    color: ${(p) => p.theme.textColor};
    text-decoration: none;
  }
`;

function Sidebar(props: SidebarProps) {
  function onPageChange(event: React.MouseEvent<HTMLLIElement>) {
    event.preventDefault();
    const spanElement = event.target as HTMLSpanElement;
    if (spanElement && spanElement.title) {
      props.pageChange(spanElement.title);
    }
  }

  return (
    <SideBarWrapper>
      <div className={classes.title}>
        <Logo>
          <TodoIcon />
        </Logo>
      </div>
      <nav className={classes.navigation_nav}>
        <ul className={classes.navigation}>
          <MenuItem onClick={onPageChange}>
            <NavLink activeClassName={classes.active} title="Home" to="/home">
              Home
            </NavLink>
          </MenuItem>
          <MenuItem onClick={onPageChange}>
            <NavLink
              activeClassName={classes.active}
              title="Dashboard"
              to="/dashboard"
            >
              Todo
            </NavLink>
          </MenuItem>
        </ul>
      </nav>
    </SideBarWrapper>
  );
}

export default Sidebar;
