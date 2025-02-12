<script setup lang="ts">
defineProps<{
    label: string
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void
}>()
</script>

<template>
    <button
        :type="type || 'button'"
        class="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-light transition-colors font-bold cursor-pointer"
        @click="onClick"
    >
        {{ label }}
    </button>
</template>
