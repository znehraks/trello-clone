import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./components/atoms";
import Board from "./components/Board";
import Trash from "./components/Trash";
const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Title = styled.span`
  font-size: 56px;
  font-weight: 600;
  margin-bottom: 5px;
`;
const SubTitle = styled(Title)`
  font-size: 18px;
  margin-bottom: 10px;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

const App = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  localStorage.setItem("toDos", JSON.stringify(toDos));
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      //same board movement
      setToDos((allBoards) => {
        //area of starting drag
        const boardCopy = [...allBoards[source.droppableId]];
        //temp save before deleted
        const taskObj = boardCopy[source.index];
        // 1) Delete item on source.index
        boardCopy.splice(source.index, 1);
        // 2) put back the item on destination.index
        boardCopy.splice(destination?.index, 0, taskObj);

        //new toDos[source.droppableId] replaces previous
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    } else if (destination.droppableId === "trash") {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    } else if (destination.droppableId !== source.droppableId) {
      //cross board movement
      setToDos((allBoards) => {
        const sourceboardCopy = [...allBoards[source.droppableId]];
        const taskObj = sourceboardCopy[source.index];
        sourceboardCopy.splice(source.index, 1);

        const destBoardCopy = [...allBoards[destination.droppableId]];
        destBoardCopy.splice(destination.index, 0, taskObj);

        return {
          ...allBoards,
          [source.droppableId]: sourceboardCopy,
          [destination.droppableId]: destBoardCopy,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Title>Memo</Title>
        <SubTitle>"Drag" and "Drop" your memo</SubTitle>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
        <Trash />
      </Wrapper>
    </DragDropContext>
  );
};

export default App;
