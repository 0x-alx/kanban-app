<script setup lang="ts">
/**
 * @description Composant qui affiche la liste des tableaux (boards) dans la barre latérale.
 * Il gère l'affichage, la sélection et la création des tableaux.
 *
 * @inject data - Injection des données contenant la liste des tableaux
 * @uses BoardListItem - Composant enfant qui affiche un tableau individuel
 * @uses CreateBoardButton - Composant pour créer un nouveau tableau
 * @uses store - Store global pour gérer l'état de l'application
 */

import BoardListItem from './BoardListItem.vue'
import CreateBoardButton from './CreateBoardButton.vue'
import { ref, onMounted, inject, watch } from 'vue'
import { store } from '@/store/store'
import type { Board } from '@/types'
import type { Ref } from 'vue'

interface BoardData {
    boards: Board[]
}

const data = inject<Ref<BoardData | null>>('data')
if (!data) {
    throw new Error('Data injection not found')
}

const boards = ref<Board[]>([])

/**
 * Surveille les changements dans les données et traite les tableaux
 * - Génère des IDs uniques pour chaque colonne si non existant (format: col-${boardIndex}-${columnIndex})
 * - Génère des IDs uniques pour chaque tâche si non existant (format: task-${boardIndex}-${columnIndex}-${taskIndex})
 * - Génère des IDs uniques pour chaque sous-tâche si non existant
 * - Sélectionne automatiquement le premier tableau si aucun n'est sélectionné
 */
watch(
    data,
    (newData) => {
        if (!newData) {
            console.log('No data available')
            return
        }

        console.log('Raw data:', newData) // Debug raw data

        boards.value = newData.boards.map((board: Board, boardIndex: number) => ({
            ...board,
            columns: board.columns.map((column, columnIndex: number) => {
                const columnWithId = {
                    ...column,
                }
                if (!columnWithId.id) {
                    columnWithId.id = `col-${boardIndex}-${columnIndex}`
                }
                return {
                    ...columnWithId,
                    tasks: column.tasks.map((task, taskIndex: number) => {
                        const taskWithId = {
                            ...task,
                        }
                        if (!taskWithId.id) {
                            taskWithId.id = `task-${boardIndex}-${columnIndex}-${taskIndex}`
                        }
                        return {
                            ...taskWithId,
                            subtasks: task.subtasks.map((subtask, subtaskIndex: number) => ({
                                ...subtask,
                                id:
                                    subtask.id ||
                                    `subtask-${boardIndex}-${columnIndex}-${taskIndex}-${subtaskIndex}`,
                            })),
                        }
                    }),
                }
            }),
        }))

        console.log('Processed boards:', boards.value) // Debug processed boards
    },
    { immediate: true },
)

// Add watch for store changes
watch(
    () => store.selectedBoard,
    (newBoard) => {
        console.log('Store board changed:', newBoard)
    },
)

/**
 * Au montage du composant:
 * - Vérifie s'il existe des tableaux
 * - Sélectionne le premier tableau disponible comme tableau par défaut
 */
onMounted(() => {
    console.log('Component mounted')
    console.log('Initial boards:', boards.value)
    console.log('Initial store board:', store.selectedBoard)
})

/**
 * Gère le clic sur un tableau
 * @param {Board} board - Le tableau sélectionné par l'utilisateur
 * Déclenche le changement de tableau sélectionné dans le store global
 */
const handleBoardClick = (board: Board) => {
    store.onSelectedBoardChange(board)
}
</script>

<template>
    <div class="flex w-full flex-col gap-4 h-full mt-14">
        <h1
            class="uppercase text-gray text-xs leading-[var(--line-height-heading-s)] tracking-[var(--letter-spacing-heading-s)] font-bold ml-8 xl:ml-12"
        >
            ALL BOARDS ({{ boards.length }})
        </h1>
        <BoardListItem
            v-for="board in boards"
            :key="board.name"
            :title="board.name"
            @click="() => handleBoardClick(board)"
            :selected="store.selectedBoard?.name === board.name"
        />
        <CreateBoardButton :title="'+ Create New Board'" />
    </div>
</template>
