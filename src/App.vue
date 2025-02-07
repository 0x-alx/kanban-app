<script setup lang="ts">
import { ref, provide } from 'vue'
import { Layout, BoardLayout } from './components'
import { createTheme } from '@/utils/useTheme'
import { store } from '@/store/store'
import type { Board } from '@/types'

// Initialize theme provider
createTheme()

interface BoardResponse {
    boards: Board[]
}

const data = ref<BoardResponse | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

const fetchData = async () => {
    isLoading.value = true
    error.value = null

    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/boards`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const responseData: BoardResponse = await response.json()
        data.value = responseData

        // Set initial board if available
        if (responseData.boards.length > 0) {
            store.onSelectedBoardChange(responseData.boards[0])
        }
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'An error occurred'
        console.error('Fetch error:', e)
    } finally {
        isLoading.value = false
    }
}

// Provide all necessary state to child components
provide('data', data)
provide('isLoading', isLoading)
provide('error', error)

fetchData()
</script>

<template>
    <Layout>
        <BoardLayout />
    </Layout>
</template>
