<script setup lang="ts">
import { store } from '@/store/store'
import { inject, onMounted } from 'vue'
import BoardListItem from './BoardListItem.vue'
import CreateBoardButton from './CreateBoardButton.vue'

const boards = inject<any>('data')

if (!boards) {
    throw new Error('Data injection not found')
}

onMounted(() => {
    console.log('BoardList.vue => Component mounted')
    console.log('BoardList.vue => Initial boards:', boards.value)
    console.log('BoardList.vue => Initial store board:', store.selectedBoard)
})

const handleBoardClick = (board: any) => {
    store.onSelectedBoardChange(board)
}
</script>

<template>
    <div class="flex w-full flex-col gap-4 h-full mt-14">
        <h1
            class="uppercase text-gray text-xs leading-[var(--line-height-heading-s)] tracking-[var(--letter-spacing-heading-s)] font-bold ml-8 xl:ml-12"
        >
            ALL BOARDS ({{ boards?.length }})
        </h1>
        <BoardListItem
            v-for="board in boards"
            :key="board.id"
            :title="board.name"
            @click="() => handleBoardClick(board)"
            :selected="store.selectedBoard?.id === board.id"
        />
        <CreateBoardButton :title="'+ Create New Board'" />
    </div>
</template>
