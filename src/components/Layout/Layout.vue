<script setup lang="ts">
import { Sidebar, Topbar } from '../'
</script>

<template>
  <div class="flex flex-row h-full">
    <Sidebar />
    <div class="flex-1">
      <Topbar />
      <div class="flex-1 p-6">
        <slot />
      </div>
    </div>
  </div>
</template>
