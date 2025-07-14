<template>
  <div class="home-view">
    <img src="@/assets/logo-removebg-preview.png" alt="Berserkdle Logo" class="logo" />
    <div class="menu-buttons">
      <button v-for="mode in modes" :key="mode.name" @click="selectMode(mode)">
        <img v-if="mode.icon" :src="mode.icon" :alt="mode.label" class="mode-icon" />
        <span>{{ mode.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const modes = [
  { name: 'classic', label: 'Classic', icon: '' },
  { name: 'quote', label: 'Quote', icon: '' },
  // Add more modes as needed
]

function selectMode(mode) {
  router.push({ name: mode.name })
}
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
}
.logo {
  width: 380px;
  margin-bottom: 20px;
}
.menu-buttons {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
}
button {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  font-size: 1.2rem;
  border: none;
  border-radius: 12px;
  background: #222;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover {
  background: #444;
}
.mode-icon {
  width: 32px;
  height: 32px;
}
</style>