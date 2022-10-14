export interface Task {
    tid: Number,
    title: String,
    desc?: String,
    priority: String,
    created: Date,
    due?: Date,
    status: String
}
