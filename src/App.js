import React, { useState } from 'react'
import styled from 'styled-components'
import dataset from './dataset'
import Column from './Column'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
    display : flex;
`

const App = () => {
  const [data, setData] = useState(dataset)

  const addColumn = (column, destinationIndex) => {

    for (var key in data.columns) {

      if (data.columns[key].title === column.trim()) {
        alert("Aynı adda başka bir aşama var!");
        return;
      }

    }

    var columnId = "column-" + Math.random() * 2;

    const newColumnOrder = Array.from(data.columnOrder);
    newColumnOrder.splice(destinationIndex, 0, columnId);

    var newcolumn = { id: columnId, title: column.trim(), taskIds: [] };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [columnId]: newcolumn
      },
      columnOrder: newColumnOrder
    }

    setData(newState)

  }

  const removeColumn = (id) => {

    const newColumns = { ...data.columns };
    
    if (!newColumns[id]) return;

    if (data.columnOrder.length === 1) {
      alert("Tek aşama için silme işlemi yapılamamaktadır.");
      return;
    }  
    
    if (newColumns[id].taskIds.length > 0) {
      alert("Bu aşama ile ilişkili satış fırsatlarını başka bir aşamaya aktarınız.");
      return;
    }      

    delete newColumns[id];

    const orderIndex = data.columnOrder.findIndex(item => item === id)
    if (orderIndex < 0) return;

    const newColumnOrder = [...data.columnOrder];
    newColumnOrder.splice(orderIndex, 1);

    const newState = {
      ...data,
      columns: newColumns,
      columnOrder: newColumnOrder
    }

    setData(newState)
  };

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;
    //If there is no destination
    if (!destination) { return }

    //If source and destination is the same
    if (destination.droppableId === source.droppableId && destination.index === source.index) { return }

    //If you're dragging columns
    if (type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const newState = {
        ...data,
        columnOrder: newColumnOrder
      }
      setData(newState)
      return;
    }

    //Anything below this happens if you're dragging tasks
    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    //If dropped inside the same column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }
      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn
        }
      }
      setData(newState)
      return;
    }

    //If dropped in a different column
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }

    setData(newState)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {data.columnOrder.map((id, index) => {
              const column = data.columns[id]
              const tasks = column.taskIds.map(taskId => data.tasks[taskId])

              return <Column key={column.id} column={column} tasks={tasks} index={index} move={onDragEnd} columnLength={data.columnOrder.length} onSubmit={addColumn} removeColumn={removeColumn} />
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default App
