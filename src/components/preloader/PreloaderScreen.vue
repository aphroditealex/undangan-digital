<template>
  <div
    class="preloader"
    :style="{ backgroundImage: `url(${config.background_url})` }"
  >
    <!-- Decorations -->
    <div class="preloader-decorations">
      <!-- <img
        v-for="dec in config.decorations"
        :key="dec.id"
        :src="dec.image_url"
        :alt="dec.id"
        :class="['preloader-decoration', `deco-${dec.id}`]"
      /> -->
    </div>

    <!-- Main indicator (pendulum) -->
    <div class="preloader-center">
      <img
        :src="config.main_indicator?.image_url"
        alt="Loading"
        class="preloader-indicator"
      />
      <!-- <img
        :src="config.text_indicator?.image_url"
        alt="Loading..."
        class="preloader-text"
      /> -->
      <div class="loading-bar">
        <div class="loading-bar-fill" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useInvitationStore } from "@/stores/invitation";

const store = useInvitationStore();
const progress = ref(0);
const config = computed(() => store.preloaderConfig);

onMounted(() => {
  // Simulate loading progress
  const interval = setInterval(() => {
    progress.value += Math.random() * 15 + 5;
    if (progress.value >= 100) {
      progress.value = 100;
      clearInterval(interval);
      setTimeout(() => {
        store.setScreen("intro");
      }, 500);
    }
  }, 300);
});
</script>

<style scoped>
.preloader {
  position: absolute;
  inset: 0;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.preloader-decorations {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.preloader-decoration {
  position: absolute;
  animation: breath 3s ease-in-out infinite;
}

.deco-giftbox-xl {
  top: 12%;
  left: 6%;
  width: 112px;
  animation-delay: 0s;
}

.deco-giftbox-sm {
  bottom: 24%;
  right: 24%;
  width: 80px;
  animation-delay: 0.5s;
}

.deco-love-xl {
  top: 25%;
  right: 5%;
  width: 96px;
  animation-delay: 1s;
}

.deco-love-sm {
  bottom: 45%;
  left: 8%;
  width: 48px;
  animation-delay: 1.5s;
}

.preloader-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.preloader-indicator {
  width: 200px;
  height: auto;
  transform-origin: top center;
  animation: pulse 2s ease-in-out infinite;
}

.preloader-text {
  width: 100px;
  height: auto;
  animation: pulse 1.5s ease-in-out infinite;
}

.loading-bar {
  width: 160px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin-top: var(--space-sm);
}

.loading-bar-fill {
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--color-primary),
    var(--color-primary-light)
  );
  border-radius: 2px;
  transition: width 0.3s ease;
}
</style>
