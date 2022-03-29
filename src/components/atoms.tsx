import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}
interface IToDoState {
  [key: string]: ITodo[];
}
export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: localStorage.getItem("toDos")
    ? JSON.parse(localStorage.getItem("toDos") + "")
    : {
        "To Do": [],
        Doing: [],
        Done: [],
      },
});
