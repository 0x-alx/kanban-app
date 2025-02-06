<script setup lang="ts">
import { ref } from 'vue'
import { Layout, BoardLayout } from './components'
import { createTheme } from '@/utils/useTheme'
import data from '@/data.json'
import { store } from '@/store/store'
// Initialize theme provider
createTheme()
</script>

<template>
    <Layout>
        <BoardLayout />
    </Layout>
</template>
