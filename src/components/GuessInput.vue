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
import { ref, computed, defineEmits, defineProps, onMounted, onBeforeUnmount } from 'vue'
import { getCharacterNames } from '../api'
const emit = defineEmits(['submit'])
const props = defineProps({
  placeholder: { type: String, default: 'Enter character name' },
  success: { type: Boolean, default: false }
})
const guess = ref('')
const showSuggestions = ref(false)
const root = ref(null)
const suggestions = ref([])
const fetched = ref(false)

const filteredSuggestions = computed(() =>
  guess.value
    ? suggestions.value.filter(name =>
        name.toLowerCase().includes(guess.value.toLowerCase())
      )
    : []
)

async function fetchSuggestions() {
  if (!fetched.value) {
    suggestions.value = await getCharacterNames()
    fetched.value = true
  }
}

function submit() {
  // Only allow submission if the guess matches a character name (case-insensitive)
  const match = suggestions.value.find(
    name => name.toLowerCase() === guess.value.trim().toLowerCase()
  )
  if (match) {
    emit('submit', match)
    guess.value = ''
    showSuggestions.value = false
  }
  // Otherwise, do nothing (or you could show a warning if desired)
}

function selectSuggestion(suggestion) {
  guess.value = suggestion
  emit('submit', suggestion)
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