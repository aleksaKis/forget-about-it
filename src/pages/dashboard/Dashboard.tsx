import React, { Fragment, useEffect, useState } from "react";
import AddTodo from "../../common/todo/add/AddTodo";
import TodoList from "../../common/todo/list/TodoList";
import classes from "./Dashboard.module.scss";
import Search from "../../components/search/Search";
import { useAppDispatch } from "../../store/hooks";
import {
  updateTodo,
  removeAllTodos,
  selectTodos,
  fetchTodos,
  removeTodoById,
  addTodo,
} from "../../common/todo/slice/reducer";
import RemoveAllTodos from "../../common/todo/remove-all/RemoveAllTodos";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { AddTodoPayload } from "../../common/todo/slice/types";

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export function Dashboard() {
  const todos = useSelector(selectTodos);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleTodoRemove = (id: number) => {
    dispatch(removeTodoById(id));
  };

  const handleTodoUpdate = (index: number, description: string) => {
    dispatch(updateTodo({ index, description }));
  };

  const handleRemoveAllTodos = () => {
    dispatch(removeAllTodos());
  };

  const handleAddTodo = (todo: AddTodoPayload): void => {
    dispatch(addTodo(todo));
  };

  return (
    <Fragment>
      <Helmet>
        <title>Dashboard - Todo</title>
        <meta name="description" content="Todo app dashboard" />
      </Helmet>
      <div className={classes.todo}>
        {todos.length > 0 && (
          <Header>
            <RemoveAllTodos onRemoveAll={handleRemoveAllTodos} />
            <Search handleSetSearch={setSearch} />
          </Header>
        )}
        <TodoList
          todos={todos}
          handleRemove={handleTodoRemove}
          handleUpdate={handleTodoUpdate}
          filter={search}
        />
        <AddTodo onAdd={handleAddTodo} />
      </div>
    </Fragment>
  );
}
