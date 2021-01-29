<template>
  <Navbar />
  <GamesTable />
</template>

<script setup>
import GamesTable from './components/GamesTable.vue'
import Navbar from './components/Navbar.vue'
import LoginModal from './components/LoginModal.vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
