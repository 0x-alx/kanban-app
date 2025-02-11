import type { Board, Subtask, Task } from '@/types'
import { reactive } from 'vue'

interface Store {
    selectedBoard: Board
    selectedTask: Task
    isSidebarHidden: boolean
    showEditTaskModal: boolean
    onSelectedBoardChange: (board: Board) => void
    toggleSidebar: () => void
    setShowEditTaskModal: (show: boolean) => void
    setSelectedTask: (task: Task) => void
    updateTaskColumn: (taskId: string, columnId: string) => void
    updateTaskSubtasks: (taskId: string, subtasks: Subtask[]) => void
}

export const store = reactive<Store>({
    selectedBoard: {
        id: '',
        name: '',
        createdAt: undefined,
        updatedAt: undefined,
    },
    selectedTask: {
        id: '',
        title: '',
        description: '',
        boardId: '',
        columnId: '',
        createdAt: undefined,
        updatedAt: undefined,
        subtasks: [],
    },
    isSidebarHidden: false,
    showEditTaskModal: false,
    onSelectedBoardChange(board: any) {
        this.selectedBoard = board
    },
    toggleSidebar() {
        this.isSidebarHidden = !this.isSidebarHidden
    },
    setShowEditTaskModal(show: boolean) {
        this.showEditTaskModal = show
    },
    setSelectedTask(task: Task) {
        this.selectedTask = task
    },
    updateTaskColumn(taskId: string, columnId: string) {
        if (this.selectedTask.id === taskId) {
            this.selectedTask.columnId = columnId
        }
    },
    updateTaskSubtasks(taskId: string, subtasks: Subtask[]) {
        if (this.selectedTask.id === taskId) {
            this.selectedTask.subtasks = subtasks
        }
    },
})
