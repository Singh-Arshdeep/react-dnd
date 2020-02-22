import React, { useState } from 'react';
import initialData from './initialData';
import Column from './Column';
import { DragDropContext } from "react-beautiful-dnd";

export default function Controller() {
    const [data, setData] = useState(initialData);

    let onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        //Task dropped at the same position
        if (destination.draggableId === source.draggableId &&
            destination.index === source.index) {
            return
        }

        const column = data.columns[source.droppableId];

        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            taskIds: newTaskIds,
        }

        setData(prevState => {
            return {
                ...prevState,
                columns: {
                    ...prevState.columns,
                    [newColumn.id]: newColumn,
                }
            }
        }
        );
        //Call server to update here
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {data.columnOrder.map((columnId) => {
                let column = data.columns[columnId];
                let tasks = column.taskIds.map(taskId => data.tasks[taskId]);

                return (
                    <Column key={column.id} column={column} tasks={tasks} />
                )
            })}
        </DragDropContext>
    );
}