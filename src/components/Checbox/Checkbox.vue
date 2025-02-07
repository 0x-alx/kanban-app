<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTheme } from '@/utils/useTheme'
import type { Subtask } from '@/types'

const props = defineProps<{
    subtask: Subtask
}>()

const isChecked = ref(props.subtask.isCompleted)
const { theme } = useTheme()

const styles = computed(() => {
    if (theme.value === 'dark') {
        return {
            backgroundColor: 'bg-dark-secondary',
            color: 'text-white',
        }
    }
    return {
        backgroundColor: 'bg-gray-lighter',
        color: 'text-black',
    }
})
</script>

<template>
    <div
        class="flex w-full rounded-md items-center gap-4 px-4 py-6"
        :class="styles.backgroundColor"
    >
        <input
            type="checkbox"
            v-model="isChecked"
            class="w-4 h-4 rounded-sm cursor-pointer appearance-none border border-gray checked:bg-primary checked:border-primary checked:bg-[url('@/assets/icon-check.svg')] checked:bg-no-repeat checked:bg-center"
        />
        <span
            class="text-sm font-bold"
            :class="[isChecked ? 'text-gray line-through' : styles.color]"
            >{{ subtask.title }}</span
        >
    </div>
</template>
