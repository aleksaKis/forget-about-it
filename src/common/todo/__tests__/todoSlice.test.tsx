import reducer, { addTodo, removeTodoById, updateTodo } from "../slice/reducer";
import {
  initialStateWithSavedTodo,
  savedTodo,
} from "../../../testing/__mocks__/todoSlice";

const initialState = {
  todos: [],
};

describe("TodoSlice", () => {
  beforeEach(() => {
    // hardcore date for test purpose
    Date.now = jest.fn(() => 1572393600000);
  });

  it("should return the initial state", () => {
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should add todo todo too existing list", () => {
    const dateAsNumber = Date.now();
    const newDate = new Date(dateAsNumber).toISOString();
    const newTodoPayload = { description: "new todo", isProtected: false };
    expect(reducer(initialState, addTodo(newTodoPayload))).toEqual({
      todos: [
        ...initialState.todos,
        {
          id: 1,
          createdAt: newDate,
          description: "new todo",
          isProtected: false,
        },
      ],
    });
  });

  it("should remove todo with provided ID from existing list", () => {
    expect(
      reducer(initialStateWithSavedTodo, removeTodoById(savedTodo.id))
    ).toEqual({
      todos: [],
    });
  });

  it("should update todo at provided index in existing list", () => {
    const expectedNewTodo = { ...savedTodo, description: "Updated" };
    expect(
      reducer(
        initialStateWithSavedTodo,
        updateTodo({
          index: 0,
          description: "Updated",
        })
      )
    ).toEqual({
      todos: [expectedNewTodo],
    });
  });
});
