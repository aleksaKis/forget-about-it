import styled from "styled-components";
import { styleConstants } from "../../styles/style-contatns";
import { PrimaryButtonProps } from "./primary";
import { SecondaryButton } from "./secondary";

const IconButtonBase = styled(SecondaryButton)<{ size: string }>`
  padding: ${styleConstants.spacing.half};
  border-radius: ${styleConstants.border.iconRadius};
  font-size: ${styleConstants.font.size.small};
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(p) =>
    p.size === "low"
      ? styleConstants.spacing.triple
      : styleConstants.spacing.double};
  width: ${(p) =>
    p.size === "low"
      ? styleConstants.spacing.triple
      : styleConstants.spacing.double};
  svg {
    width: 15px;
  }
`;

export const IconButton = (props: PrimaryButtonProps) => {
  return (
    <IconButtonBase size="low" {...props}>
      {props.children}
    </IconButtonBase>
  );
};
