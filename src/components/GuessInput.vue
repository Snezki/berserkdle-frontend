<template>
  <div ref="root" style="position:relative;">
    <form @submit.prevent="submit" autocomplete="off">
      <input
        v-model="guess"
        type="text"
        :placeholder="props.placeholder"
        class="guess-input"
        :class="{ 'success-bg': props.success }"
        @focus="showSuggestions = true; fetchSuggestions()"
        @input="showSuggestions = true"
        @keydown="handleKeydown"
        autocomplete="off"
        :disabled="props.disabled"
      />
      <ul v-if="filteredSuggestions.length && guess && showSuggestions" class="suggestions-list">
        <li
          v-for="(s, i) in filteredSuggestions"
          :key="i"
          @mousedown.prevent="selectSuggestion(s)"
        >
          {{ s }}
        </li>
      </ul>
      <button type="submit" class="submit-btn">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits, defineProps, onMounted, onBeforeUnmount, watch } from 'vue'
import { getCharacterNames } from '../api'

const props = defineProps({
  placeholder: { type: String, default: 'Enter character name' },
  success: { type: Boolean, default: false },
  resetKey: { type: [String, Number], default: '' },
  guessHistory: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: false }
})
const guess = ref('')
const showSuggestions = ref(false)
const root = ref(null)
const suggestions = ref([])
const fetched = ref(false)

const emit = defineEmits(['submit'])

const filteredSuggestions = computed(() => {
  const guessedNames = props.guessHistory.map(g => g.value.toLowerCase())
  return guess.value
    ? suggestions.value.filter(name =>
        name.toLowerCase().includes(guess.value.toLowerCase()) &&
        !guessedNames.includes(name.toLowerCase())
      )
    : suggestions.value.filter(name => !guessedNames.includes(name.toLowerCase()))
})

async function fetchSuggestions() {
  if (!fetched.value) {
    suggestions.value = await getCharacterNames()
    fetched.value = true
  }
}

function submit() {
  const match = suggestions.value.find(
    name => name.toLowerCase() === guess.value.trim().toLowerCase()
  )
  if (match) {
    emit('submit', match)
    guess.value = ''
    showSuggestions.value = false
  }
}

function selectSuggestion(suggestion) {
  guess.value = suggestion
  submit()
  showSuggestions.value = false
}

function handleClickOutside(event) {
  if (root.value && !root.value.contains(event.target)) {
    showSuggestions.value = false
  }
}

function handleKeydown(event) {
  if (event.key === 'Tab' && showSuggestions.value && filteredSuggestions.value.length) {
    event.preventDefault()
    selectSuggestion(filteredSuggestions.value[0])
  }
}

watch(() => props.resetKey, () => {
  guess.value = ''
})

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
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

.suggestions-list {
  position: absolute;
  background: #fff;
  border: 1px solid #ccc;
  width: 220px;
  max-height: 150px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  z-index: 10;
  list-style: none;
  left: 0;
}

.suggestions-list li {
  padding: 8px 12px;
  cursor: pointer;
}

.suggestions-list li:hover {
  background: #eee;
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