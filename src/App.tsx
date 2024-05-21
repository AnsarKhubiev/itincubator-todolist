import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const Tasks_1: TaskType[] = [
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ];

    const Tasks_2: TaskType[] = [
        // {id: 5, title: "Milk", isDone: true},
        // {id: 6, title: "Bread", isDone: false},
        // {id: 7, title: "Water", isDone: false},
    ]

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={Tasks_1} date="22.04.24"/>
            <Todolist title="What to buy" tasks={Tasks_2}/>
        </div>
    );
}

export default App;
