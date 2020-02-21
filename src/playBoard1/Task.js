import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import './task.css';

export default function Task(props) {

    return(
        <Draggable draggableId={props.task.id} index={props.index}> 
        {
            (provided, snapshot) => (
                <div className="item"
                {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                >
                    {props.task.content}
                </div>
            )
        }
        </Draggable>
    );
}