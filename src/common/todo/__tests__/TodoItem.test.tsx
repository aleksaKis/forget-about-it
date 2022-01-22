import { render, screen, fireEvent } from "../../../testing/custom_render";
import TodoItem from "../item/TodoItem";
import { mockTodoItem } from "../../../testing/__mocks__/mockTodoItem";
import userEvent from "@testing-library/user-event";
import { mockProtectedTodoItem } from "../../../testing/__mocks__/mockProtectedTodoItem";
import { noop } from "../../../testing/utils/constants";

const TWO_DIGIT = "2-digit";
const DATE_OPTIONS = {
  day: "numeric",
  month: "numeric",
  year: TWO_DIGIT,
  hour: TWO_DIGIT,
} as const;

const FAKE_INDEX = 1;

const localDateString = new Date(mockTodoItem.createdAt).toLocaleDateString(
  "en-US",
  DATE_OPTIONS
);
describe("TodoItem", () => {
  it("should display correct items details", () => {
    render(
      <TodoItem
        onRemove={noop}
        onUpdate={noop}
        item={mockTodoItem}
        index={FAKE_INDEX}
      />
    );

    expect(screen.getByText(`${mockTodoItem.id}`)).toBeInTheDocument();
    expect(screen.getByText(mockTodoItem.description)).toBeInTheDocument();
    expect(screen.getByText(localDateString)).toBeInTheDocument();
  });

  it("should NOT display input on component first mount", () => {
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

  it("should allow edit of todo description when edit mode is toggled", () => {
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

  it("should remove current todo when trash icon is clicked", () => {
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

  it("should NOT allow removing protected todo", () => {
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
