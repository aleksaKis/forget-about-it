import AddTodo from "../add/AddTodo";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { render } from "../../../testing/custom_render";
import { noop } from "../../../testing/utils/constants";

const FAKE_TODO_TEXT = "TEST TEST";

describe("AddTodo", () => {
  it("should display input field when plus icon is clicked", () => {
    render(<AddTodo onAdd={noop} />);
    const plusButton = screen.getByTestId("plus_button_open");
    userEvent.click(plusButton);
    const addTodo = screen.getByTestId("add_todo_wrapper");
    expect(addTodo).toBeInTheDocument();
  });

  it("should hide input when new todo is created", () => {
    const handleOnAdd = jest.fn();
    render(<AddTodo onAdd={handleOnAdd} />);
    const plusButton = screen.getByTestId("plus_button_open");
    userEvent.click(plusButton);

    const addTodo = screen.getByTestId("add_todo_wrapper");
    const input = screen.getByRole("form");

    userEvent.type(input, FAKE_TODO_TEXT);
    const finishButton = screen.getByTestId("finish_add_todo");
    userEvent.click(finishButton);
    expect(addTodo).not.toBeInTheDocument();
    expect(handleOnAdd).toHaveBeenCalledWith({
      description: FAKE_TODO_TEXT,
      isProtected: false,
    });
  });

  it("should set new todo as protected when lock button is clicked", () => {
    const handleOnAdd = jest.fn();
    render(<AddTodo onAdd={handleOnAdd} />);
    const plusButton = screen.getByTestId("plus_button_open");
    userEvent.click(plusButton);

    const addTodo = screen.getByTestId("add_todo_wrapper");
    const input = screen.getByRole("form");
    const lockKey = screen.getByTestId("protect-todo");

    userEvent.type(input, FAKE_TODO_TEXT);
    userEvent.click(lockKey);
    const finishButton = screen.getByTestId("finish_add_todo");
    userEvent.click(finishButton);
    expect(addTodo).not.toBeInTheDocument();
    expect(handleOnAdd).toHaveBeenCalledWith({
      description: FAKE_TODO_TEXT,
      isProtected: true,
    });
  });

  it("should NOT save todo when input field is left empty and add is clicked", () => {
    const WHITE_SPACE_TEXT = " ";
    const handleOnAddTodo = jest.fn();
    render(<AddTodo onAdd={handleOnAddTodo} />);
    const plusButton = screen.getByTestId("plus_button_open");
    userEvent.click(plusButton);
    const input = screen.getByRole("form");
    userEvent.type(input, WHITE_SPACE_TEXT);
    const finishButton = screen.getByTestId("finish_add_todo");
    userEvent.click(finishButton);
    expect(handleOnAddTodo).not.toHaveBeenCalled();
  });
});
