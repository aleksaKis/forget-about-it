import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { PrimaryButtonBase } from "./primary";

interface SecondaryButtonProps extends ButtonHTMLAttributes<any> {
  size?: "low" | "medium" | "high";
}

const SecondaryButtonBase = styled(PrimaryButtonBase)`
  background-color: transparent;
  border: 1px solid ${(p) => p.theme.primary};
  color: ${(p) => p.theme.primary};

  :hover {
    background-color: ${(p) => p.theme.primaryHover}4f;
  }
`;

export const SecondaryButton = (props: SecondaryButtonProps) => {
  return <SecondaryButtonBase {...props} size={props.size} />;
};
