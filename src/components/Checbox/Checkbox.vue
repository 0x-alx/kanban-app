<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/utils/useTheme'
import type { Subtask } from '@/types'

interface Props {
    /** L'objet sous-tâche contenant le titre et d'autres propriétés */
    subtask: Subtask
    /** L'état coché de la case à cocher */
    modelValue: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
    /** Émis lors du changement d'état de la case à cocher */
    (e: 'update:modelValue', value: boolean): void
}>()

const { theme } = useTheme()

/**
 * Propriété calculée qui gère la liaison bidirectionnelle de l'état de la case à cocher
 * Utilise v-model avec les fonctions get/set
 */
const isChecked = computed({
    get() {
        return props.modelValue
    },
    set(value: boolean) {
        emit('update:modelValue', value)
    },
})

/**
 * Styles calculés en fonction du thème actuel
 */
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
        <!-- Input de case à cocher avec style personnalisé -->
        <input
            type="checkbox"
            v-model="isChecked"
            class="min-w-4 min-h-4 rounded-sm cursor-pointer appearance-none border border-gray checked:bg-primary checked:border-primary checked:bg-[url('@/assets/icon-check.svg')] checked:bg-no-repeat checked:bg-center"
        />
        <!-- Titre de la sous-tâche avec style conditionnel basé sur l'état coché -->
        <span
            class="text-sm font-bold"
            :class="[isChecked ? 'text-gray line-through' : styles.color]"
            >{{ subtask.title }}</span
        >
    </div>
</template>
