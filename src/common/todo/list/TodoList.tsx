import TodoItem from "../item/TodoItem";
import { Fragment } from "react";
import classes from "./TodoList.module.scss";
import { ReactComponent as FrownIcon } from "../../../components/icons/frown-solid.svg";
import { Todo } from "../../../store/types";

interface TodoListProps {
  filter: string;
  todos: Todo[];
  handleRemove: (id: number) => void;
  handleUpdate: (index: number, description: string) => void;
}

function TodoList(props: TodoListProps) {
  const { filter, todos, handleRemove, handleUpdate } = props;
  if (todos.length) {
    return (
      <Fragment>
        <ul className={classes.todo_list}>
          {todos.map(
            (todoItem, index) =>
              todoItem.description.includes(filter) && (
                <TodoItem
                  onRemove={handleRemove}
                  onUpdate={handleUpdate}
                  key={todoItem.id}
                  index={index}
                  item={todoItem}
                />
              )
          )}
        </ul>
      </Fragment>
    );
  }
  return (
    <div className={classes.empty_list}>
      <FrownIcon />
      <h2>To-do is empty</h2>
      <span>Click plus button to add todo!</span>
    </div>
  );
}

export default TodoList;
