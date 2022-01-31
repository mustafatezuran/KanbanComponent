const dataset = {
    tasks: {
        "task-1": { id: "task-1", content: "Deal For Ted Watson", customer: "Ted Watson", amount:950 },
        "task-2": { id: "task-2", content: "Deal For Emily", customer: "Emily", amount:1850 },
        "task-3": { id: "task-3", content: "Deal For Andrew", customer: "Andrew", amount:2050 },
        "task-4": { id: "task-4", content: "Deal Example", customer: "Example Customer", amount:785 }
    },
    columns: {
        "column-1": { id: "column-1", title: "Qualification", taskIds: ['task-1'] },
        "column-2": { id: "column-2", title: "Needs Analysis", taskIds: ['task-2', 'task-3'] },
        "column-3": { id: "column-3", title: "Proposal/Price Quote", taskIds: [] },
        "column-4": { id: "column-4", title: "Negotiation/Review", taskIds: ["task-4"] },
        "column-5": { id: "column-5", title: "Closed Won", taskIds: [] },
        "column-6": { id: "column-6", title: "Closed Lost", taskIds: [] }
        
    },
    columnOrder: ["column-1", "column-2", "column-3", "column-4", "column-5", "column-6"]
}

export default dataset