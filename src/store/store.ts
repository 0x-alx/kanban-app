import type { Board } from '@/types'
import { reactive } from 'vue'
export const store = reactive({
    selectedBoard: {} as Board,
    onSelectedBoardChange(board: Board) {
        console.log('onSelectedBoardChange', board)
        store.selectedBoard = board
    },
})
