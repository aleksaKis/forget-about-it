import { ReactComponent as SearchIcon } from "../../components/icons/search-solid.svg";
import React, { useCallback, useState } from "react";
import { ReactComponent as ClearIcon } from "../icons/times-solid.svg";
import { IconButton } from "../buttons/icon";
import styled from "styled-components";
import { styleConstants } from "../../styles/style-contatns";

const SearchWrapper = styled.div<{ expand: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: flex-end;
  height: 26px;
  padding: 4px 5px;
  width: ${(p) => (p.expand ? 275 : 25)}px;
  font-size: ${styleConstants.font.size.bodyText};
  border-radius: ${(p) => (p.expand ? styleConstants.border.radius : "25px")};
  margin-bottom: 20px;
  overflow: hidden;
  min-height: 20px;
  background-color: ${(p) =>
    p.expand ? p.theme.backgroundColor : "transparent"};
  transition: width 700ms ease-in-out,
    border-radius ${styleConstants.animation.transition};

  svg {
    min-width: 32px;
  }

  &:focus {
    color: red;
  }

  &:hover {
    background: ${(p) => p.theme.backgroundColor};
    width: 275px;
    border-radius: ${styleConstants.border.radius};
  }

  input {
    color: ${(p) => p.theme.textColor};
    margin-left: ${styleConstants.spacing.double};
    flex-grow: 1;
    background: transparent;
    border: 0;
    outline: 0;
  }

  &_icon {
    margin-left: ${styleConstants.spacing.half};
    background: transparent;
    color: white;
  }
`;

interface SearchProps {
  handleSetSearch: (searchTerm: string) => void;
}

const Search = (props: SearchProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const { handleSetSearch } = props;

  const handleKeyPress = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      setSearchValue(event.currentTarget.value);
      handleSetSearch(event.currentTarget.value);
    },
    [handleSetSearch]
  );

  const handleClearSearch = useCallback(() => {
    setSearchValue("");
    handleSetSearch("");
  }, [handleSetSearch]);

  return (
    <SearchWrapper expand={searchValue.length > 0}>
      <SearchIcon />
      <input
        placeholder="Quick search"
        value={searchValue}
        type="text"
        onChange={handleKeyPress}
      />
      {searchValue && (
        <IconButton onClick={handleClearSearch}>
          <ClearIcon />
        </IconButton>
      )}
    </SearchWrapper>
  );
};

export default Search;
