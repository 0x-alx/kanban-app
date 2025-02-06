<script setup lang="ts">
defineProps<{
    label: string
}>()
</script>

<template>
    <button
        class="flex items-center gap-2 text-white bg-primary rounded-full px-4 py-2 hover:bg-primary-light transition-colors font-bold cursor-pointer"
    >
        <span>{{ label }}</span>
    </button>
</template>
