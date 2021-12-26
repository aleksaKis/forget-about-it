import { ReactComponent as SunIcon } from "../icons/sun-solid.svg";
import { ReactComponent as MoonIcon } from "../icons/moon-solid.svg";

import { Fragment, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { styleConstants } from "../../styles/style-contatns";
import { selectTheme } from "../../common/main/slice/reducer";

interface ThemeToggleProps {
  onChange: (theme: string) => void;
}

const InputWrapper = styled.input`
  display: none;
  position: absolute;
  &:checked + label div {
    transform: translateX(20px);
  }
`;

const InputLabel = styled.label`
  margin: ${styleConstants.spacing.regular};
  width: ${styleConstants.spacing.triple};
  height: ${styleConstants.spacing.regular};
  font-size: 12px;
  border: 2px solid ${(p) => p.theme.border};
  background-color: ${(p) => p.theme.backgroundAlt};
  display: flex;
  border-radius: 50px;
  align-items: center;
  justify-content: space-between;
  padding: ${styleConstants.spacing.half};
  position: relative;
  transform: scale(1.5);

  svg {
    width: 12px;
  }
`;

const Ball = styled.div`
  width: ${styleConstants.spacing.double};
  cursor: pointer;
  height: ${styleConstants.spacing.double};
  background-color: ${(p) => p.theme.primary};
  position: absolute;
  left: 2px;
  border-radius: 50%;
  transition: transform 0.2s linear;
`;

export const ThemeToggle = (props: ThemeToggleProps) => {
  const theme = useSelector(selectTheme);
  const checkboxRef = useRef(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      setIsChecked(true);
    }
  }, [theme]);

  const toggleTheme = () => {
    setIsChecked(!isChecked);
    !isChecked ? props.onChange("dark") : props.onChange("light");
  };

  return (
    <Fragment>
      <InputWrapper
        checked={isChecked}
        ref={checkboxRef}
        type="checkbox"
        id="toggle"
        onChange={toggleTheme}
      />
      <InputLabel htmlFor="toggle">
        <SunIcon />
        <MoonIcon />
        <Ball className="ball" />
      </InputLabel>
    </Fragment>
  );
};
