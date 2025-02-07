export interface Subtask {
    id?: string | number
    title?: string
    isCompleted: boolean
}

export interface Task {
    id: string | number
    title: string
    description: string
    status: string
    subtasks: Subtask[]
}

export interface Column {
    id: string | number
    name: string
    tasks: Task[]
}

export interface Board {
    name: string
    columns: Column[]
}

export interface Theme {
    value: 'light' | 'dark'
    toggleTheme: () => void
    initTheme: () => void
}
