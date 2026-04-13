<template>
  <div
    class="intro-screen"
    :style="{ backgroundImage: `url(${config.background_url})` }"
  >
    <!-- Spacer to push content down -->
    <div class="intro-spacer"></div>

    <!-- Title text — no card, directly on background -->
    <div class="intro-text-area">
      <p class="intro-prefix">{{ config.title?.prefix || "The Wedding of" }}</p>
      <h1 class="intro-names">{{ store.coupleNames }}</h1>
    </div>

    <!-- Guest greeting -->
    <div class="intro-guest-area">
      <p class="intro-greeting">{{ store.guestGreeting }}</p>
      <p class="intro-guest-name">{{ store.guestName }}</p>
    </div>

    <!-- Flexible spacer between text and button -->
    <div class="intro-spacer-flex"></div>

    <!-- Start Button -->
    <div class="intro-button-wrapper">
      <button class="intro-start-btn" @click="enterRoom">
        <img
          :src="
            config.button?.default_image ||
            '/assets/templates/aruma/btn-loadingscreen.webp'
          "
          alt="START"
          class="start-btn-img"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useInvitationStore } from "@/stores/invitation";

const store = useInvitationStore();
const config = computed(() => store.introConfig);

function enterRoom() {
  // Play click sound
  const audio = new Audio("/assets/music/waterdrop-click.mp3");
  audio.volume = 0.3;
  audio.play().catch(() => {});

  // Start music
  store.toggleMusic();

  // Transition to room
  store.setScreen("room");

  // Show welcome modal after a brief delay
  setTimeout(() => {
    store.openModal("welcome");
  }, 800);
}
</script>

<style scoped>
.intro-screen {
  position: absolute;
  inset: 0;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  /* background-color: #c8b8a8; */
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 90;
}

/* Push title down to ~28% of screen */
.intro-spacer {
  flex: 0 0 34%;
}

/* Title area — centered, no card */
.intro-text-area {
  text-align: center;
  width: 80%;
  animation: fadeInUp 0.8s ease forwards;
}

.intro-prefix {
  font-family: var(--font-display);
  font-size: clamp(10px, 3.5vw, 14px);
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: clamp(1px, 1vw, 3px);
  text-transform: uppercase;
  margin-bottom: var(--space-xs);
  text-shadow: 0 1px 4px rgba(255, 255, 255, 0.5);
}

.intro-names {
  font-family: var(--font-display);
  font-size: clamp(22px, 7vw, 32px);
  font-weight: 900;
  color: #1a1a1a;
  line-height: 1.15;
  text-transform: uppercase;
  letter-spacing: clamp(1px, 1vw, 2px);
  text-shadow: 0 1px 6px rgba(255, 255, 255, 0.6);
}

/* Guest greeting */
.intro-guest-area {
  text-align: center;
  width: 80%;
  margin-top: clamp(20px, 3vw, var(--space-md));
  animation: fadeInUp 1s ease 0.2s both;
}

.intro-greeting {
  font-family: var(--font-body);
  font-size: clamp(13px, 4vw, 16px);
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 2px;
  text-shadow: 0 1px 4px rgba(255, 255, 255, 0.5);
}

.intro-guest-name {
  font-family: var(--font-display);
  font-size: clamp(16px, 5.5vw, 20px);
  font-weight: 700;
  color: #1a1a1a;
  text-shadow: 0 1px 4px rgba(255, 255, 255, 0.5);
}

/* Flexible spacer pushes button toward bottom */
.intro-spacer-flex {
  flex: 1;
}

/* Button at bottom */
.intro-button-wrapper {
  padding-bottom: 12%;
  animation: fadeInUp 1s ease 0.4s both;
}

.intro-start-btn {
  transition: transform var(--transition-spring);
}

.intro-start-btn:hover {
  transform: scale(1.05);
}

.intro-start-btn:active {
  transform: scale(0.95);
}

.start-btn-img {
  width: clamp(120px, 45vw, 160px);
  height: auto;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
}
</style>
