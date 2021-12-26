export interface AddTodoState {
  editMode: boolean;
  protected: boolean;
  description: string;
}

export namespace AddTodoActions {
  export enum Type {
    SET_EDIT_MODE = "SET_EDIT_MODE",
    SET_PROTECTED = "SET_PROTECTED",
    SET_DESCRIPTION = "SET_DESCRIPTION",

    RESET_DESCRIPTION = "RESET_DESCRIPTION",

    SET_DESCRIPTION_AND_EDIT_MODE = "SET_DESCRIPTION_AND_EDIT_MODE",
    SET_DESCRIPTION_AND_USE_EMOJI = "SET_DESCRIPTION_AND_USE_EMOJI",
  }
  export type Any =
    | { type: Type.SET_EDIT_MODE; isEditMode: boolean }
    | { type: Type.SET_PROTECTED; isProtected: boolean }
    | { type: Type.SET_DESCRIPTION; description: string }
    | { type: Type.RESET_DESCRIPTION }
    | {
        type: Type.SET_DESCRIPTION_AND_EDIT_MODE;
        description: string;
        editMode: boolean;
      };
}

export function AddTodoReducer(
  state: AddTodoState,
  action: AddTodoActions.Any
): AddTodoState {
  switch (action.type) {
    case AddTodoActions.Type.SET_EDIT_MODE:
      return { ...state, editMode: action.isEditMode };
    case AddTodoActions.Type.SET_PROTECTED:
      return { ...state, protected: action.isProtected };
    case AddTodoActions.Type.SET_DESCRIPTION:
      return { ...state, description: action.description };
    case AddTodoActions.Type.RESET_DESCRIPTION:
      return { ...state, description: "", editMode: false, protected: false };

    case AddTodoActions.Type.SET_DESCRIPTION_AND_EDIT_MODE:
      return {
        ...state,
        description: action.description,
        editMode: action.editMode,
      };

    default:
      throw new Error(`[Add Todo state] unknown action passed: ${action}`);
  }
}

export const initialState = {
  editMode: false,
  protected: false,
  description: "",
};
