import AddTodo from "../add/AddTodo";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { render } from "../../../testing/test-utils";

describe("AddTodo", () => {
  it("should display todo input when plus icon is clicked", () => {
    render(<AddTodo />);
    const plusButton = screen.getByTestId("plus_button_open");
    userEvent.click(plusButton);

    const addTodo = screen.getByTestId("add_todo_wrapper");
    expect(addTodo).toBeInTheDocument();
  });

  it("should close input box when user clicks add todo button", () => {
    render(<AddTodo />);
    const plusButton = screen.getByTestId("plus_button_open");
    userEvent.click(plusButton);

    const addTodo = screen.getByTestId("add_todo_wrapper");
    expect(addTodo).toBeInTheDocument();

    const input = screen.getByRole("form");
    userEvent.type(input, "test");

    const finishButton = screen.getByTestId("finish_add_todo");
    userEvent.click(finishButton);

    expect(addTodo).not.toBeInTheDocument();
  });
});
