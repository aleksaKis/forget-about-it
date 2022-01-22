export interface UpdateTodoPayload {
  index: number;
  description: string;
}

export interface AddTodoPayload {
  description: string;
  isProtected?: boolean;
}
