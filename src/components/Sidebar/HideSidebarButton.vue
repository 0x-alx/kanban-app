<script setup lang="ts">
import { ref, watch } from 'vue'
import { provide } from 'vue'
</script>

<template>
    <button
        class="flex items-center gap-2 text-heading-m text-gray hover:text-primary transition-colors font-bold cursor-pointer"
    >
        <img src="@/assets/icon-hide-sidebar.svg" />
        <span>Hide Sidebar</span>
    </button>
</template>
