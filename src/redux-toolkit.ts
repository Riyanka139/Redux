import { configureStore, createSlice, getDefaultMiddleware, PayloadAction } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { v1 as uuid } from "uuid";

import { Todo } from "./type";

const todosIntialState: Todo[] = [
  {
    id: uuid(),
    desc: "Learn React",
    isComplete: true,
  },
  {
    id: uuid(),
    desc: "Learn Redux",
    isComplete: true,
  },
  {
    id: uuid(),
    desc: "Learn Redux-ToolKit",
    isComplete: false,
  },
];

const todoSlice = createSlice({
  name: "todo",
  initialState: todosIntialState,
  reducers: {
    create: {
      reducer: (
        state,
        {
          payload,
        }: PayloadAction<{ id: string; desc: string; isComplete: boolean }>
      ) => {
        state.push(payload);
      },
      prepare: ({ desc }: { desc: string }) => {
        return { payload: { id: uuid(), desc, isComplete: false } };
      },
    },
    edit(state, { payload }: PayloadAction<{ id: string; desc: string }>) {
      const todoEdit = state.find((todo) => todo.id === payload.id);
      if (todoEdit) todoEdit.desc = payload.desc;
    },
    toggle(
      state,
      { payload }: PayloadAction<{ id: string; isComplete: boolean }>
    ) {
      const todoToggle = state.find((todo) => todo.id === payload.id);
      if (todoToggle) todoToggle.isComplete = payload.isComplete;
    },
    delete(state, { payload }: PayloadAction<{ id: string }>) {
      const index = state.findIndex((todo) => todo.id === payload.id);
      if (index !== -1) state.splice(index, 1);
    },
  },
});

const selectedTodoSlice = createSlice({
  name: "selectedTodo",
  initialState: null as string | null,
  reducers: {
    select: (state, { payload }: PayloadAction<{ id: string }>) => payload.id,
  },
});

const counterSlice = createSlice({
  name: "counter",
  initialState: 0 as number,
  reducers: {},
  extraReducers: {
    [todoSlice.actions.create.type]: (state) => state + 1,
    [todoSlice.actions.edit.type]: (state) => state + 1,
    [todoSlice.actions.toggle.type]: (state) => state + 1,
    [todoSlice.actions.delete.type]: (state) => state + 1,
  },
});

export const {
  create: createTodoActionCreator,
  edit: editTodoActionCreator,
  toggle: toggleTodoActionCreator,
  delete: deleteTodoActionCreator,
} = todoSlice.actions;

export const { select: selectTodoActionCreator } = selectedTodoSlice.actions;

const reducer = {
  todos: todoSlice.reducer,
  selectedTodo: selectedTodoSlice.reducer,
  counter: counterSlice.reducer,
};

const middleware = [...getDefaultMiddleware(), logger];

export default configureStore({
  reducer,
  middleware
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
