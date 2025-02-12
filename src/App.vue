<script setup lang="ts">
import { store } from '@/store/store'
import type { Board } from '@/types'
import { createTheme } from '@/utils/useTheme'
import { provide, ref } from 'vue'
import { BoardLayout, Layout } from './components'
createTheme()

const data = ref<any>(null)
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
        const responseData: Board[] = await response.json()
        data.value = responseData
        console.log('App.vue => initial board fetch', responseData)
        console.log('App.vue => set store board', responseData[0])
        store.onSelectedBoardChange(responseData[0])
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
