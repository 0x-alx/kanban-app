<script setup lang="ts">
import { Sidebar, Topbar } from '../'
</script>

<template>
    <div class="flex flex-row h-full w-full overflow-x-hidden">
        <div class="hidden h-full md:flex">
            <Sidebar />
        </div>
        <div class="flex flex-col w-full overflow-x-hidden">
            <Topbar />
            <slot />
        </div>
    </div>
</template>
