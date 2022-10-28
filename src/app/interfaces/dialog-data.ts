import { Task } from "./task";

export interface DialogData {
    title: String, // create or update
    task: Task
}

export interface DialogResult{
    task: Task,
    delete?: boolean
}