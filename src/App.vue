<template>
  <router-view />
</template>

<style>
/* Global styles reset for route container */
#app {
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  background: #f5f5f5; /* Light background outside the mobile wrapper */
}

/* Ensure mobile shell only applies to the app-container (inside views) */
</style>
