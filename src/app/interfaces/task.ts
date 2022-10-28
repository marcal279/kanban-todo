export interface Task {
    tid?: string,
    title: string,
    desc?: string,
    priority: string,
    created: Date,
    due?: Date,
    status: string
}