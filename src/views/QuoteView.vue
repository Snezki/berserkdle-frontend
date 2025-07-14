<template>
  <div class="quote-view">
    <button class="back-btn" @click="goBack">← Menu</button>
    <h1>{{ question }}</h1>
    <h3>"{{ characterQuote }}"</h3>
    <GuessInput 
      @submit="handleGuess" 
      :success="isCorrect" 
      :reset-key="resetKey" 
      :guess-history="guessHistory" 
      :disabled="isCorrect" 
      :placeholder="answer"
      :suggestions="characterQuote"
    />
    <ul class="guess-list">
      <li v-for="(item, idx) in [...guessHistory].reverse()" :key="idx" :class="item.correct ? 'guess-correct' : 'guess-wrong'">
        {{ item.value }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { getDailyQuote } from '../api'
import GuessInput from '@/components/GuessInput.vue'
const router = useRouter()
const question = ref('')
const answer = ref('')
const characterQuote = ref('')
const isCorrect = ref(false)
const guessHistory = ref([])
const resetKey = ref(0)

function goBack() {
  router.push({ name: 'home' })
}

function getSessionKey() {
  return 'quoteSession_' + (question.value || '')
}

function loadSession() {
  const session = localStorage.getItem(getSessionKey())
  if (session) {
    try {
      const data = JSON.parse(session)
      isCorrect.value = data.isCorrect || false
      guessHistory.value = data.guessHistory || []
    } catch (e) {
      console.error('Error loading session:', e)
    }
  }
}

function saveSession() {
  localStorage.setItem(getSessionKey(), JSON.stringify({
    isCorrect: isCorrect.value,
    guessHistory: guessHistory.value
  }))
}

function handleGuess(guess) {
  const correct = guess.trim().toLowerCase() === answer.value.trim().toLowerCase()
  isCorrect.value = correct
  guessHistory.value.push({ value: guess, correct })
  if (!correct) {
    resetKey.value++
  }
  saveSession()
}

onMounted(async () => {
  const quote = await getDailyQuote()
  question.value = quote.question
  characterQuote.value = quote.quotes
  answer.value = quote.character
  loadSession()
})

watch(question, () => {
  loadSession()
})
</script>

<style scoped>
.quote-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  position: relative;
}

.back-btn {
  position: absolute;
  left: 20px;
  top: 20px;
  padding: 8px 16px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background: #222;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s;
}

.back-btn:hover {
  background: #444;
}

.guess-list {
  list-style: none;
  padding: 0;
  margin-top: 24px;
  width: 240px;
}

.guess-list li {
  padding: 8px 0;
  font-size: 1.1rem;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.guess-correct {
  color: #1a7f1a;
  font-weight: bold;
}

.guess-wrong {
  color: #c00;
  font-weight: bold;
}

</style> 