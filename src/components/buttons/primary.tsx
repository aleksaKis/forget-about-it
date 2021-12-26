import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { styleConstants } from "../../styles/style-contatns";

export interface PrimaryButtonProps extends ButtonHTMLAttributes<any> {
  size?: "low" | "medium" | "high";
}

export const PrimaryButtonBase = styled.button<{
  size?: "low" | "medium" | "high";
}>`
  background-color: ${(p) => p.theme.primary};
  border: 1px solid ${(p) => p.theme.backgroundAlt};
  border-radius: ${styleConstants.border.radius};
  color: ${(p) => p.theme.backgroundColor};
  font-weight: ${styleConstants.font.weight.bold};
  padding: ${styleConstants.spacing.regular} ${styleConstants.spacing.regular};
  margin: ${styleConstants.spacing.half};
  text-transform: uppercase;
  cursor: pointer;
  font-size: ${styleConstants.font.size.small};
  min-width: ${(p) =>
    p.size === "low"
      ? styleConstants.spacing.triple
      : styleConstants.spacing.quadruple};
  height: ${(p) => (p.size === "low" ? "14px" : "32px")};
  white-space: nowrap;

  :hover {
    background-color: ${(p) => p.theme.primaryHover};
  }
`;

export const PrimaryButton = (props: PrimaryButtonProps) => {
  return <PrimaryButtonBase {...props} size={props.size} />;
};
