<template>
  <div class="app-container">
    <!-- Preloader -->
    <Transition name="fade">
      <PreloaderScreen v-if="store.currentScreen === 'preloader'" />
    </Transition>

    <!-- Intro / Cover -->
    <Transition name="fade">
      <IntroScreen v-if="store.currentScreen === 'intro'" />
    </Transition>

    <!-- Main Interactive Room -->
    <Transition name="fade">
      <InteractiveRoom v-if="store.currentScreen === 'room'" />
    </Transition>

    <!-- Modal System -->
    <Transition name="scale">
      <BaseModal v-if="store.activeModal" @close="store.closeModal()">
        <WelcomeModal v-if="store.activeModal === 'welcome'" />
        <BrideGroomModal v-if="store.activeModal === 'bride-groom'" />
        <!-- <DressCodeModal v-if="store.activeModal === 'dresscode'" /> -->
        <!-- <LoveStoryModal v-if="store.activeModal === 'love-story'" /> -->
        <GalleryModal v-if="store.activeModal === 'gallery-book'" />
        <LocationModal v-if="store.activeModal === 'location'" />
        <RSVPModal v-if="store.activeModal === 'guestbook'" />
        <GiftModal v-if="store.activeModal === 'giftbox'" />
      </BaseModal>
    </Transition>

    <!-- Music Player (always mounted but hidden) -->
    <MusicPlayer />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { useInvitationStore } from "@/stores/invitation";
import PreloaderScreen from "@/components/preloader/PreloaderScreen.vue";
import IntroScreen from "@/components/intro/IntroScreen.vue";
import InteractiveRoom from "@/components/room/InteractiveRoom.vue";
import BaseModal from "@/components/modals/BaseModal.vue";
import WelcomeModal from "@/components/modals/WelcomeModal.vue";
import BrideGroomModal from "@/components/modals/BrideGroomModal.vue";
// import DressCodeModal from "@/components/modals/DressCodeModal.vue";
// import LoveStoryModal from "@/components/modals/LoveStoryModal.vue";
import GalleryModal from "@/components/modals/GalleryModal.vue";
import LocationModal from "@/components/modals/LocationModal.vue";
import RSVPModal from "@/components/modals/RSVPModal.vue";
import GiftModal from "@/components/modals/GiftModal.vue";
import MusicPlayer from "@/components/ui/MusicPlayer.vue";

const store = useInvitationStore();

// --- Prevent all browser zoom ---
function preventZoomKeyboard(e) {
  // Block Ctrl+Plus, Ctrl+Minus, Ctrl+0 (zoom reset)
  if (
    (e.ctrlKey || e.metaKey) &&
    (e.key === "+" || e.key === "-" || e.key === "=" || e.key === "0")
  ) {
    e.preventDefault();
  }
}

function preventZoomWheel(e) {
  // Block Ctrl+Scroll (zoom)
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault();
  }
}

function preventZoomGesture(e) {
  // Block pinch-to-zoom gesture on Safari/iOS
  e.preventDefault();
}

onMounted(() => {
  store.loadInvitation();

  // Attach zoom-prevention listeners
  document.addEventListener("keydown", preventZoomKeyboard);
  document.addEventListener("wheel", preventZoomWheel, { passive: false });
  document.addEventListener("gesturestart", preventZoomGesture);
  document.addEventListener("gesturechange", preventZoomGesture);
  document.addEventListener("gestureend", preventZoomGesture);

  // Block double-tap zoom on mobile
  let lastTouchEnd = 0;
  document.addEventListener(
    "touchend",
    (e) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    },
    { passive: false },
  );
});

onUnmounted(() => {
  document.removeEventListener("keydown", preventZoomKeyboard);
  document.removeEventListener("wheel", preventZoomWheel);
  document.removeEventListener("gesturestart", preventZoomGesture);
  document.removeEventListener("gesturechange", preventZoomGesture);
  document.removeEventListener("gestureend", preventZoomGesture);
});
</script>

<style scoped>
.app-container {
  width: 100%;
  height: 100%;
  max-width: 480px;
  position: relative;
  overflow: hidden;
  background: var(--color-bg-dark);
  /* box-shadow: 0 0 60px rgba(0, 0, 0, 0.5); */
}
</style>
