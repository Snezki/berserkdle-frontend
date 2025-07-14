<template>
  <form @submit.prevent="submit">
    <input
      v-model="guess"
      type="text"
      :placeholder="props.placeholder"
      class="guess-input"
      :class="{ 'success-bg': props.success }"
    />
    <button type="submit" class="submit-btn">Submit</button>
  </form>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue'
const emit = defineEmits(['submit'])
const props = defineProps({
  placeholder: { type: String, default: 'Enter character name' },
  success: { type: Boolean, default: false }
})
const guess = ref('')

function submit() {
  emit('submit', guess.value)
  guess.value = ''
}
</script>

<style scoped>
.guess-input {
  margin-top: 20px;
  padding: 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 220px;
  transition: background 0.2s;
}
.success-bg {
  background: #b6fcb6 !important;
}
.submit-btn {
  margin-top: 10px;
  padding: 10px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  background: #222;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s;
}
.submit-btn:hover {
  background: #444;
}
</style> 