<template>
  <div class="interactive-room" :class="{ 'night-mode': !store.isLightOn }">
    <!-- Room Background -->
    <div
      class="room-background"
      :style="{
        backgroundImage: `url(${store.mainContentConfig.background_url})`,
      }"
    >
      <!-- Sparkle overlay -->
      <div class="sparkle-overlay" v-if="store.isLightOn">
        <div
          v-for="i in 12"
          :key="i"
          class="sparkle"
          :style="getRandomSparkleStyle(i)"
        ></div>
      </div>

      <!-- Clickable Decorations -->
      <RoomDecoration
        v-for="decoration in store.decorations"
        :key="decoration.id"
        :decoration="decoration"
        @click="store.openModal(decoration.modal_type)"
      />

      <!-- Bottom Bar (inside room-background so it overlays the bg) -->
      <div class="bottom-bar">
        <button
          class="bottom-btn add-wish-btn"
          @click="store.openModal('guestbook')"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button
          class="bottom-btn toggle-wishes-btn"
          @click="store.toggleWishes"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
          >
            <polyline
              :points="store.showWishes ? '18 15 12 9 6 15' : '6 9 12 15 18 9'"
            ></polyline>
          </svg>
        </button>
        <button class="bottom-btn wishes-label-btn" @click="store.toggleWishes">
          {{ store.showWishes ? "Sembunyikan Ucapan" : "Lihat Ucapan" }}
        </button>
      </div>
    </div>

    <!-- Navigation Controls -->
    <NavigationControls />

    <!-- Floating Wishes -->
    <FloatingWishes v-if="store.showWishes" />
  </div>
</template>

<script setup>
import { useInvitationStore } from "@/stores/invitation";
import RoomDecoration from "./RoomDecoration.vue";
import FloatingWishes from "./FloatingWishes.vue";
import NavigationControls from "@/components/ui/NavigationControls.vue";

const store = useInvitationStore();

function getRandomSparkleStyle(i) {
  const top = Math.random() * 80 + 5;
  const left = Math.random() * 90 + 5;
  const delay = Math.random() * 4;
  const size = Math.random() * 4 + 2;
  return {
    top: `${top}%`,
    left: `${left}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${delay}s`,
  };
}
</script>

<style scoped>
.interactive-room {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  z-index: 50;
}

/* Night mode: dark overlay on background only, decorations stay bright */
.room-background::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 20, 0.65);
  z-index: 5;
  opacity: 0;
  transition: opacity var(--transition-slow);
  pointer-events: none;
}

.interactive-room.night-mode .room-background::before {
  opacity: 1;
}

.room-background {
  flex: 1;
  position: relative;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
}

/* Sparkle overlay */
.sparkle-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
}

.sparkle {
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: sparkle 3s ease-in-out infinite;
  box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.6);
}

/* Bottom bar — overlays on room background */
.bottom-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  z-index: 30;
}

.bottom-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  transition: all var(--transition-fast);
}

.add-wish-btn,
.toggle-wishes-btn {
  width: 36px;
  height: 36px;
  border: 1.5px solid var(--color-primary);
  border-radius: var(--radius-sm);
  background: var(--color-white);
  flex-shrink: 0;
}

.add-wish-btn:hover,
.toggle-wishes-btn:hover {
  background: var(--color-rose-light);
}

.wishes-label-btn {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text);
  padding: var(--space-sm) var(--space-md);
  background: var(--color-white);
  border: 1.5px solid var(--color-primary);
  border-radius: var(--radius-sm);
  white-space: nowrap;
}

.wishes-label-btn:hover {
  background: var(--color-rose-light);
}
</style>
