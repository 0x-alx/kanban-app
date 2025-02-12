import type { Ref } from 'vue'

export interface Subtask {
    id?: string | number
    title: string
    isCompleted: boolean
    taskId: string
    createdAt: Date | undefined
    updatedAt: Date | undefined
}

export interface Task {
    id: string
    title: string
    description: string
    boardId: string
    columnId: string
    createdAt: Date | undefined
    updatedAt: Date | undefined
    subtasks: Subtask[]
}

export interface Column {
    id: string
    name: string
    createdAt: Date | undefined
    updatedAt: Date | undefined
    boardId: string
    position: number
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
