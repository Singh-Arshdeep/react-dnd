import React, { useState } from 'react';
import initialData from './initialData';
import Column from './Column';
import {DragDropContext} from "react-beautiful-dnd";

export default function Controller() {
    const [data, setData] = useState(initialData);

    let onDragEnd = (result) => {
        console.log(result);

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