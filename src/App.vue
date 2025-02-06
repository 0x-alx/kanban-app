<script setup lang="ts">
import { Layout } from './components'
import { createTheme } from '@/utils/useTheme'

// Initialize theme provider
createTheme()
</script>

<template>
    <Layout>
        <h1 class="text-dark">Layout</h1>
    </Layout>
</template>
