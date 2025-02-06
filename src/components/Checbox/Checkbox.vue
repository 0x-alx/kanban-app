<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useTheme } from '@/utils/useTheme'

const props = defineProps<{
    subtask: {
        id: string
        title: string
        isCompleted: boolean
    }
}>()

const isChecked = ref(props.subtask.isCompleted)
const theme = useTheme()

const styles = computed(() => {
    if (theme.value === 'dark') {
        return 'bg-dark-secondary'
    }
    return 'bg-gray-lighter'
})
</script>

<template>
    <div class="flex w-full rounded-md items-center gap-4 px-4 py-6" :class="styles">
        <input
            type="checkbox"
            v-model="isChecked"
            class="w-4 h-4 rounded-sm cursor-pointer appearance-none border border-gray checked:bg-primary checked:border-primary checked:bg-[url('@/assets/icon-check.svg')] checked:bg-no-repeat checked:bg-center"
        />
        <span
            class="text-black text-sm font-bold"
            :class="{ 'text-gray line-through': isChecked }"
            >{{ subtask.title }}</span
        >
    </div>
</template>
