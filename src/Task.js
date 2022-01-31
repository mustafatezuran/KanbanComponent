import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { EditOutlined } from '@ant-design/icons';
const Container = styled.div`
    border: 1px solid lightgrey;
    padding:4px;
    margin-bottom:4px;
    border-radius:2px;
    background-color:${props => (props.isDragging ? '#e0ffe0' : 'white')};
`
function Task(props) {
    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    <div onClick={e => (e.target.closest('span') == null ? window.location.href = '/detail?id=' + props.task.id : false)}>
                        {props.task.content}
                        <br />
                        {props.task.customer}
                        <br />
                        TRY {props.task.amount.toFixed(2)}
                        <span id={'btn' + props.task.id} style={{ float: 'right' }} onClick={() => console.log("Drawer: " + props.task.id)}>
                            <EditOutlined />
                        </span>
                    </div>
                </Container>
            )}
        </Draggable>
    )
}

export default Task
