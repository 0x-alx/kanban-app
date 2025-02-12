<script setup lang="ts">
defineProps<{
    label: string
    options: {
        value: string
        label: string
    }[]
    selectedValue: string
    handleChange: (value: string) => void
}>()
</script>
<template>
    <div class="flex flex-col gap-2">
        <label class="text-sm text-gray-500 font-bold">{{ label }}</label>
        <select
            class="w-full p-2 rounded-md border border-gray-300 bg-surface text-gray-500 font-bold"
            @change="(e) => handleChange((e.target as HTMLSelectElement).value)"
        >
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
                class="text-sm text-gray-500"
                :selected="option.value === selectedValue"
            >
                {{ option.label }}
            </option>
        </select>
    </div>
</template>
