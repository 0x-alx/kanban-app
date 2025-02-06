<script setup lang="ts">
import { Sidebar, Topbar } from '../'
</script>

<template>
    <div class="flex flex-row h-full">
        <div class="hidden h-full md:flex">
            <Sidebar />
        </div>
        <div class="flex-1">
            <Topbar />
            <slot />
        </div>
    </div>
</template>
