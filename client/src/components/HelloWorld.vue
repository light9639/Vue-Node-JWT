<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>
