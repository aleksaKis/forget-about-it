import React, { useCallback, useReducer } from "react";
import classes from "./AddTodo.module.scss";
import { AddTodoActions, AddTodoReducer, initialState } from "./reducer";
import { PrimaryButton } from "../../../components/buttons/primary";
import { IconButton } from "../../../components/buttons/icon";
import { ReactComponent as PlusIcon } from "../../../components/icons/plus-solid.svg";
import { ReactComponent as LockIcon } from "../../../components/icons/lock-solid.svg";
import styled from "styled-components";
import { GlobalHotKeys } from "react-hotkeys";
import { TextInput } from "../../../components/text-input/TextInput";
import { AddTodoPayload } from "../slice/types";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 10px;
  filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.75));
  background: ${(p) => p.theme.backgroundColor}e8;
  border-radius: 7px;
  position: relative;
`;

interface AddTodoProps {
  onAdd: (todo: AddTodoPayload) => void;
}

const AddTodo = (props: AddTodoProps): JSX.Element => {
  const { onAdd } = props;
  const [state, dispatch] = useReducer(AddTodoReducer, initialState);

  const resetDescription = useCallback((): void => {
    dispatch({
      type: AddTodoActions.Type.RESET_DESCRIPTION,
    });
  }, []);

  const dispatchAddTodo = useCallback((): void => {
    const newTodo: AddTodoPayload = {
      description: state.description,
      isProtected: state.isProtected,
    };
    if (newTodo.description.trim()) {
      onAdd(newTodo);
    }
    resetDescription();
  }, [resetDescription, state.description, state.isProtected, onAdd]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent): void => {
      if (event.key === "Enter") {
        dispatchAddTodo();
      }
    },
    [dispatchAddTodo]
  );

  const handleProtected = useCallback((): void => {
    dispatch({
      type: AddTodoActions.Type.SET_PROTECTED,
      isProtected: !state.isProtected,
    });
  }, [state.isProtected]);

  const handleDescriptionChange = useCallback((value: string): void => {
    dispatch({
      type: AddTodoActions.Type.SET_DESCRIPTION,
      description: value,
    });
  }, []);

  const enableEditMode = useCallback(() => {
    dispatch({
      type: AddTodoActions.Type.SET_EDIT_MODE,
      isEditMode: true,
    });
  }, []);

  const keyMap = {
    ENABLE_EDIT: "+",
  };

  const keyHandlers = {
    ENABLE_EDIT: enableEditMode,
  };

  // todo replace global-hot-keys with event keydown listeners
  if (state.editMode) {
    return (
      <GlobalHotKeys keyMap={keyMap} handlers={keyHandlers}>
        <Container
          onSubmit={dispatchAddTodo}
          data-testid="add_todo_wrapper"
          className={classes.add_todo}
          onKeyDown={handleKeyDown}
        >
          <TextInput
            focus={true}
            initialValue={state.description}
            onValueChange={handleDescriptionChange}
          />
          <input
            data-testid="protect-todo"
            type="checkbox"
            id="checkboxChip"
            className={classes.protect}
            onChange={handleProtected}
          />
          <label htmlFor="checkboxChip" title="Disallow removal">
            <LockIcon />
          </label>
          <PrimaryButton
            data-testid="finish_add_todo"
            onClick={dispatchAddTodo}
            className={classes.add_todo_button}
          >
            Add
          </PrimaryButton>
        </Container>
      </GlobalHotKeys>
    );
  } else {
    return (
      <GlobalHotKeys keyMap={keyMap} handlers={keyHandlers}>
        <IconButton
          aria-label="open"
          role="button"
          data-testid="plus_button_open"
          onClick={enableEditMode}
          title="Add new todo to list"
        >
          <PlusIcon />
        </IconButton>
      </GlobalHotKeys>
    );
  }
};

export default AddTodo;
