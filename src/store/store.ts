import type { Board, Task } from '@/types'
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
        status: '',
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
})
