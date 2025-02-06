<script setup lang="ts">
defineProps<{
    label: string
    options: {
        value: string
        label: string
    }[]
}>()
</script>
<template>
    <div class="flex flex-col gap-2">
        <label class="text-sm text-gray-500 font-bold">{{ label }}</label>
        <select
            class="w-full p-2 rounded-md border border-gray-300 bg-surface text-gray-500 font-bold"
        >
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
                class="text-sm text-gray-500"
            >
                {{ option.label }}
            </option>
        </select>
    </div>
</template>
