<template>
  <div class="quote-view">
    <button class="back-btn" @click="goBack">← Menu</button>
    <h2>Quote Mode</h2>
    <p>This is the Quote mode page.</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goBack() {
  router.push({ name: 'home' })
}
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
</style> 