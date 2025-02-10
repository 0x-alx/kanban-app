<script lang="ts" setup>
import { store } from '@/store/store'

const props = defineProps<{
    isOpen: boolean
}>()
</script>

<template>
    <div
        v-if="props.isOpen"
        class="fixed flex items-center justify-center inset-0 bg-black/30 backdrop-blur-xs z-50"
        @click="store.setShowEditTaskModal(false)"
    >
        <slot />
    </div>
</template>
