import { render, screen, fireEvent } from "../../../testing/test-utils";
import TodoItem from "../item/TodoItem";
import { mockTodoItem } from "../../../testing/__mocks__/mockTodoItem";
import userEvent from "@testing-library/user-event";
import { mockProtectedTodoItem } from "../../../testing/__mocks__/mockProtectedTodoItem";

const TWO_DIGIT = "2-digit";
const DATE_OPTIONS = {
  day: "numeric",
  month: "numeric",
  year: TWO_DIGIT,
  hour: TWO_DIGIT,
};

const FAKE_INDEX = 1;

// mismatch type for DATE_OPTIONS
const localDateString = new Date(mockTodoItem.createdAt).toLocaleDateString(
  "en-US",
  // @ts-ignore
  DATE_OPTIONS
);
describe("TodoItem", () => {
  it("should display correct items details", () => {
    render(
      <TodoItem
        onRemove={() => {}}
        onUpdate={() => {}}
        item={mockTodoItem}
        index={FAKE_INDEX}
      />
    );

    expect(screen.getByText(`${mockTodoItem.id}`)).toBeInTheDocument();
    expect(screen.getByText(mockTodoItem.description)).toBeInTheDocument();
    expect(screen.getByText(localDateString)).toBeInTheDocument();
  });

  it("should not display input field on component mounting", () => {
    const todoItem = render(
      <TodoItem
        onRemove={() => {}}
        onUpdate={() => {}}
        item={mockTodoItem}
        index={FAKE_INDEX}
      />
    );
    const inputFiled = todoItem.container.querySelector(
      ".edit_input"
    ) as HTMLInputElement;
    expect(inputFiled).not.toBeInTheDocument();
    expect(screen.getByText(mockTodoItem.description)).toBeInTheDocument();
  });

  it("should allow editing todos", () => {
    const handleUpdateMock = jest.fn();
    render(
      <TodoItem
        onRemove={() => {}}
        onUpdate={handleUpdateMock}
        item={mockTodoItem}
        index={FAKE_INDEX}
      />
    );
    const NEW_DESCRIPTION = `${mockTodoItem.description} enhanced`;
    const editButton = screen.getByTestId("edit-button");

    fireEvent(
      editButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    userEvent.keyboard(" enhanced");
    const finishButton = screen.getByTestId("finish-button");
    fireEvent(
      finishButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(handleUpdateMock).toHaveBeenCalledWith(FAKE_INDEX, NEW_DESCRIPTION);
  });

  it("should remove todo on trash can click", () => {
    const mockedOnRemoveHandler = jest.fn();
    render(
      <TodoItem
        onRemove={mockedOnRemoveHandler}
        onUpdate={() => {}}
        item={mockTodoItem}
        index={FAKE_INDEX}
      />
    );
    const trashButton = screen.getByTestId("remove-item");
    userEvent.click(trashButton);
    expect(mockedOnRemoveHandler).toBeCalledWith(mockTodoItem.id);
  });

  it("should not allow removing protected todo", () => {
    const mockedOnRemoveHandler = jest.fn();

    render(
      <TodoItem
        onRemove={mockedOnRemoveHandler}
        onUpdate={() => {}}
        item={mockProtectedTodoItem}
        index={FAKE_INDEX}
      />
    );
    const trashButton = screen.getByTestId("locked-item");
    userEvent.click(trashButton);
    expect(mockedOnRemoveHandler).not.toBeCalled();
  });
});
