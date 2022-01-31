
import React, { useState } from "react";
import styled from 'styled-components'
import Task from './Task'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Popover } from 'antd';

import { MoreOutlined, CloseOutlined, CheckOutlined, PlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
const Container = styled.div`
    margin: 1rem;
    border: 1px solid lightgrey;
    border-radius: 5px;
    width:200px;
    display:flex;
    flex-direction: column;
    background-color:white;
`;
const Title = styled.h4`
    padding: 0 1rem;
    margin: 1rem 0; 
`;
const TaskList = styled.div`
    padding: 1rem;
    background-color: ${props => (props.isDraggingOver ? '#d5f3ff' : 'inherit')};
    min-height:500px;
`;



function Column(props) {

    const [popoverVisible, setPopoverVisible] = useState(false);
    const [inputText, setInputText] = useState("");
    const [isEditable, setIsEditable] = useState(false);

    const hide = () => {
        setPopoverVisible(false);
    };

    const handleVisibleChange = visible => {
        setPopoverVisible(visible);
    };

    const getColumnSum = () => {

        const amounts = props.tasks.map((task) => task.amount);
        if (amounts.length !== 0) {
            let total = amounts.reduce((a, b) => a + b);
            return total.toFixed(2);
        } else {
            let total = "0.00";
            return total;
        }
    };

    const dragRequest = (id, destinationIndex, sourceIndex) => {
        return {
            combine: null,
            destination: { droppableId: 'all-columns', index: destinationIndex },
            draggableId: id,
            mode: 'FLUID',
            reason: 'DROP',
            source: { index: sourceIndex, droppableId: 'all-columns' },
            type: 'column'
        };
    }

    const submission = (index) => {
        // e.preventDefault();
        if (inputText && props.onSubmit) {
            setInputText("");
            props.onSubmit(inputText, index);
        }
        setIsEditable(false);
    };

    return (
        <div>
            <table><tbody>
                <tr>
                    <td><Draggable draggableId={props.column.id} index={props.index} isDragDisabled={true}>
                        {(provided) => (
                            <Container
                                ref={provided.innerRef}
                                {...provided.draggableProps}>
                                <Title {...provided.dragHandleProps}>{props.column.title}</Title>
                                <div>
                                    <small>Total</small><br />
                                    <span><b>TRY {getColumnSum()}</b> <small>{props.tasks.length} Satış Fırsatı</small></span>
                                    <span style={{ float: 'right' }}>
                                        <Popover
                                            placement="bottom"
                                            style={{ width: 500 }}
                                            content={<div> <p onClick={() => { hide(); console.log("Drawer"); }}>Yeni Satış Fırsatı</p>
                                                <p onClick={() => { hide(); setIsEditable(true) }}>Yeni Aşama</p>
                                                {props.index !== props.columnLength - 1 && <p onClick={() => { hide(); props.move(dragRequest(props.column.id, props.index + 1, props.index)) }}>Sağa Taşı</p>}
                                                {props.index !== 0 && <p onClick={() => { hide(); props.move(dragRequest(props.column.id, props.index - 1, props.index)); }}>Sola Taşı</p>}
                                                <p onClick={() => { hide(); props.removeColumn(props.column.id) }}>Aşamayı Sil</p></div>}
                                            title=""
                                            trigger="click"
                                            visible={popoverVisible}
                                            onVisibleChange={handleVisibleChange}
                                        >
                                            <MoreOutlined />
                                        </Popover>
                                    </span>
                                    <hr /></div>
                                <Droppable droppableId={props.column.id} type='task'>
                                    {(provided, snapshot) => (
                                        <TaskList
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            isDraggingOver={snapshot.isDraggingOver}
                                        >
                                            {props.tasks.length < 1 ? <small>Bu aşamada Satış Fırsatı yok</small> : props.tasks.map((task, index) =><Task key={task.id} task={task} index={index} />)}

                                            {provided.placeholder}

                                            <button onClick={() => console.log("Drawer")}><PlusOutlined /> Satış Fırsatı</button>

                                        </TaskList>

                                    )}


                                </Droppable>
                            </Container>

                        )}
                    </Draggable></td>
                    <td style={{ display: "inline" }}> {isEditable && (
                        <div>
                            <input
                                type="text"
                                value={inputText}
                                placeholder="Aşama ismi girin"
                                required
                                onChange={(event) => setInputText(event.target.value)}
                                autoFocus
                            />
                            <div>
                                <button onClick={() => submission(props.index + 1)}><CheckOutlined /></button>
                                <button onClick={() => setIsEditable(false)}><CloseOutlined /></button>
                            </div>
                        </div>
                    )}</td>
                </tr></tbody>
            </table>


        </div>
    )
}

export default Column
