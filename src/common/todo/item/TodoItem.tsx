import { ReactComponent as CheckIcon } from "../../../components/icons/check-solid.svg";
import { ReactComponent as LockIcon } from "../../../components/icons/lock-solid.svg";
import styles from "./TodoItem.module.scss";
import { useState } from "react";
import { IconButton } from "../../../components/buttons/icon";
import { ReactComponent as PenIcon } from "../../../components/icons/pen-solid.svg";
import { ReactComponent as TrashIcon } from "../../../components/icons/trash-solid.svg";
import styled from "styled-components";
import { styleConstants } from "../../../styles/style-contatns";
import { Todo } from "../../../store/types";
import { TextInput } from "../../../components/text-input/TextInput";
import { DATE_OPTIONS } from "./constants";

interface TodoItemProps {
  item: Todo;
  index: number;
  onRemove: (id: number) => void;
  onUpdate: (index: number, description: string) => void;
}

const TodoItemWrapper = styled.li`
  filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.75));
  background: ${(p) => p.theme.backgroundColor}e8;
  background: linear-gradient(
    90deg,
    ${(p) => p.theme.backgroundAlt} 0%,
    ${(p) => p.theme.backgroundColor} 100%
  );
  color: ${(p) => p.theme.textColor};
  letter-spacing: 1.5px;
  border-radius: ${styleConstants.border.radius};
  display: flex;
  flex-direction: row;
  width: 50%;
  padding: ${styleConstants.spacing.regular};
  justify-content: space-between;
  align-items: center;
  overflow-wrap: anywhere;

  & > * {
    width: 100%;
    margin: 5px;
  }
`;

const RightWrapper = styled.div`
  flex-direction: column;
  gap: 5px;
  justify-content: space-between;
  align-items: flex-end;
  width: 35%;
  display: flex;
`;

const ItemIndex = styled.span`
  display: flex;
  align-items: center;
  align-self: stretch;
  justify-content: center;
  color: ${(p) => p.theme.primary};
  font-weight: bolder;
  width: 20%;
`;

const SideDetails = styled.span`
  align-self: flex-end;
  justify-content: flex-end;
  color: ${(p) => p.theme.detail};
  font-size: ${styleConstants.font.size.small};
  text-align: end;
`;

const TodoItem = (props: TodoItemProps) => {
  const { item, index, onRemove, onUpdate } = props;
  const date = new Date(item.createdAt).toLocaleDateString(
    "en-US",
    DATE_OPTIONS
  );

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(item.description);

  const handleRemoveTodo = (): void => {
    if (!item.isProtected) {
      onRemove(item.id);
    }
  };

  const handleUpdateTodo = (): void => {
    onUpdate(index, inputValue);
    setIsEditing(false);
  };

  const enableEditMode = (): void => {
    setIsEditing(true);
  };

  const handleInputChange = (value: string): void => {
    setInputValue(value);
  };

  const description = isEditing ? (
    <TextInput
      focus={true}
      data-testid="description-input"
      initialValue={item.description}
      onValueChange={handleInputChange}
    />
  ) : (
    <span aria-label="description">{item.description}</span>
  );

  const editIcon = isEditing ? (
    <IconButton
      data-testid="finish-button"
      className={[styles.todo_item_button, styles.edit].join(" ")}
      onClick={handleUpdateTodo}
      title="Confirm edit"
    >
      <CheckIcon />
    </IconButton>
  ) : (
    <IconButton
      data-testid="edit-button"
      className={[styles.todo_item_button, styles.edit].join(" ")}
      onClick={enableEditMode}
      title="Edit description"
    >
      <PenIcon />
    </IconButton>
  );

  const trashIcon = !item.isProtected ? (
    <IconButton
      className={[styles.todo_item_button, styles.delete].join(" ")}
      data-testid="remove-item"
      onClick={handleRemoveTodo}
      title="Remove"
    >
      <TrashIcon />
    </IconButton>
  ) : (
    <IconButton
      data-testid="locked-item"
      title="Locked"
      className={[styles.todo_item_button, styles.delete].join(" ")}
    >
      <LockIcon />
    </IconButton>
  );

  return (
    <TodoItemWrapper>
      <ItemIndex>{index + 1}</ItemIndex>
      {description}
      <RightWrapper>
        <div className={styles.buttons}>
          {editIcon}
          {trashIcon}
        </div>
        <SideDetails>id: {item.id}</SideDetails>
        <SideDetails>{date}</SideDetails>
      </RightWrapper>
    </TodoItemWrapper>
  );
};

export default TodoItem;
