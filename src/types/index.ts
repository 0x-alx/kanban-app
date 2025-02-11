import type { Ref } from 'vue'

export interface Subtask {
    id?: string | number
    title: string
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
    id: string
    name: string
    createdAt: Date | undefined
    updatedAt: Date | undefined
}

export interface Theme {
    value: 'light' | 'dark'
    toggleTheme: () => void
    initTheme: () => void
}

export interface ThemeContext {
    theme: Ref<Theme>
    toggleTheme: () => void
    initTheme: () => void
}

export interface Store {
    selectedBoard: Board
    selectedTask: Task
    isSidebarHidden: boolean
    showEditTaskModal: boolean
    onSelectedBoardChange: (board: Board) => void
    toggleSidebar: () => void
    setShowEditTaskModal: (show: boolean) => void
    setSelectedTask: (task: Task) => void
}

export interface SelectOption {
    value: string
    label: string
}
