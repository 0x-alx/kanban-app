<script setup lang="ts">
import { ref, watch } from 'vue'
import { store } from '@/store/store'
</script>

<template>
    <button
        class="flex items-center gap-2 text-heading-m text-gray hover:text-primary transition-colors font-bold cursor-pointer"
        @click="store.toggleSidebar()"
    >
        <img src="@/assets/icon-hide-sidebar.svg" />
        <span>Hide Sidebar</span>
    </button>
</template>
