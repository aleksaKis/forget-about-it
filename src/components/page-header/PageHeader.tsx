import Weather from "../weather/Weather";
import styled from "styled-components";
import { useAppDispatch } from "../../store/hooks";
import { useCallback } from "react";
import { styleConstants } from "../../styles/style-contatns";
import { ThemeToggle } from "../theme-toggle/ThemeToggle";
import { changeTheme } from "../../common/main/slice/reducer";

interface PageHeaderProps {
  pageTitle: string;
}

const PageHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${styleConstants.spacing.regular} ${styleConstants.spacing.double};
  color: ${(p) => p.theme.textColor};
  background-color: ${(p) => p.theme.backgroundAlt};
  box-shadow: 5px 0 28px -11px rgb(0 0 0 / 75%);
  @media (max-width: 900px) {
    display: none;
  }
`;

const WidgetWrapper = styled.div`
  display: flex;
`;

const Widget = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${styleConstants.spacing.half};
  border-radius: ${styleConstants.border.radius};
  gap: ${styleConstants.spacing.double};
  background: ${(p) => p.theme.backgroundColor}7a;
  color: ${(p) => p.theme.textColor};
  user-select: none;
  margin-left: ${styleConstants.spacing.double};
`;

const PageHeader = (props: PageHeaderProps) => {
  const dispatch = useAppDispatch();

  const title =
    props.pageTitle.charAt(0).toUpperCase() +
    props.pageTitle.slice(1).toLowerCase();

  const handleToggleTheme = useCallback(
    (theme) => {
      dispatch(changeTheme(theme));
    },
    [dispatch]
  );

  return (
    <PageHeaderWrapper>
      <h2>{title}</h2>
      <WidgetWrapper>
        <Widget>
          <ThemeToggle onChange={handleToggleTheme} />
        </Widget>
        <Widget>
          <Weather />
        </Widget>
      </WidgetWrapper>
    </PageHeaderWrapper>
  );
};

export default PageHeader;
