<script setup lang="ts">
import BoardListItem from './BoardListItem.vue'
import CreateBoardButton from './CreateBoardButton.vue'
import data from '@/data.json'
import { ref } from 'vue'

// Initialize with the first board's id or 0 if no boards
const selectedBoard = ref(data.boards[0]?.name ?? '')
const boards = ref(data.boards)
const onBoardClick = (name: string) => {
    selectedBoard.value = name
}
</script>

<template>
    <div class="flex w-full flex-col gap-4 h-full mt-14">
        <h1
            class="uppercase text-gray text-xs leading-[var(--line-height-heading-s)] tracking-[var(--letter-spacing-heading-s)] font-bold ml-12"
        >
            ALL BOARDS ({{ boards.length }})
        </h1>
        <BoardListItem
            v-for="board in boards"
            :key="board.name"
            :title="board.name"
            :onClick="() => onBoardClick(board.name)"
            :selected="selectedBoard === board.name"
        />
        <CreateBoardButton :title="'+ Create New Board'" />
    </div>
</template>
