<script setup lang="ts">
import { Layout, Board } from './components'
import { createTheme } from '@/utils/useTheme'
// Initialize theme provider
createTheme()
</script>

<template>
    <Layout>
        <Board />
    </Layout>
</template>
