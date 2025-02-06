import type { Board, Task } from '@/types'
import { reactive } from 'vue'
export const store = reactive({
    selectedBoard: {} as Board,
    onSelectedBoardChange(board: Board) {
        console.log('onSelectedBoardChange', board)
        this.selectedBoard = board
    },
    isSidebarHidden: false,
    toggleSidebar() {
        console.log('toggleSidebar', store.isSidebarHidden)
        this.isSidebarHidden = !this.isSidebarHidden
    },
    showEditTaskModal: false,
    setShowEditTaskModal(show: boolean) {
        console.log('setShowEditTaskModal', show)
        this.showEditTaskModal = show
    },
    selectedTask: {} as Task,
    setSelectedTask(task: Task) {
        this.selectedTask = task
    },
})
