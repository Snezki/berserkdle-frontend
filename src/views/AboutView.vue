<template>
  <div class="home">
    <HelloWorld msg="WELCOME TO BERSERKDLE"/>
    <div v-if="dailyQuestion">
      <h2>Today's Question</h2>
      <p>{{ dailyQuestion.question }}</p>
      <p>{{ dailyQuestion.quotes }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
import { ref, onMounted } from 'vue'
import { getDailyQuestionCharacter } from '@/api'

const dailyQuestion = ref(null)
const fetchDailyQuestion = async () => {
  try {
    const data = await getDailyQuestionCharacter()
    dailyQuestion.value = data
  } catch (error) {
    console.error('Error fetching daily question: ', error)
  }
}

onMounted(() => {
  fetchDailyQuestion()
})
</script>
