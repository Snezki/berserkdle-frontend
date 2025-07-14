<template>
  <header class="app-header">
    <img
      src="@/assets/logo-removebg-preview.png"
      alt="Berserkdle Logo"
      class="header-logo"
      @click="goHome"
    />
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goHome() {
  router.push({ name: 'home' })
}
</script>

<style scoped>
.app-header {
  width: 100%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-logo {
  margin-top: 20px;
  height: 150px;
  object-fit: contain;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(.4,2,.6,1);
}
.header-logo:hover {
  transform: scale(1.15);
}
</style> 