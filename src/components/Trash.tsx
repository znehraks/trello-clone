import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import trashcanClosed from "../components/images/trashcanClosed.svg";
import trashcanOpened from "../components/images/trashcanOpened.svg";

interface IWrapperProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Wrapper = styled.div<IWrapperProps>`
  width: 100%;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "tomato"
      : props.isDraggingFromThis
      ? "#dfe6e9"
      : "white"};
  transition: background-color 0.3s ease-in-out;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding: 15px;
  img {
    width: 6%;
  }
`;

const Trash = () => {
  return (
    <Droppable droppableId="trash">
      {(provided, snapshot) => (
        <>
          <Wrapper
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <img
              src={snapshot.isDraggingOver ? trashcanOpened : trashcanClosed}
              alt="delete"
            />
          </Wrapper>
          {provided.placeholder}
        </>
      )}
    </Droppable>
  );
};
export default Trash;
