<template>
  <div class="floating-wishes">
    <TransitionGroup name="wish">
      <div v-for="wish in visibleWishes" :key="wish.id" class="wish-bubble">
        <span class="wish-author">{{ wish.guest_book.name }}</span>
        <p class="wish-message">{{ wish.message }}</p>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useInvitationStore } from "@/stores/invitation";

const store = useInvitationStore();
const currentIndex = ref(0);

const visibleWishes = computed(() => {
  const msgs = store.messages;
  if (!msgs.length) return [];
  // Show 2 wishes at a time, cycling through
  const start = currentIndex.value % msgs.length;
  const result = [];
  for (let i = 0; i < Math.min(2, msgs.length); i++) {
    result.push(msgs[(start + i) % msgs.length]);
  }
  return result;
});

let interval = null;
onMounted(() => {
  interval = setInterval(() => {
    currentIndex.value++;
  }, 5000);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>

<style scoped>
.floating-wishes {
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  padding: var(--space-md);
  padding-bottom: 0;
  z-index: 25;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  max-height: 40%;
  max-width: 90%;
  overflow: hidden;
}

.wish-bubble {
  background: rgba(255, 255, 255, 0.95);
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-md);
  box-shadow: var(--shadow-sm);
  pointer-events: auto;
  animation: fadeInUp 0.5s ease;
  max-width: 75%;
  border: 1px solid var(--color-rose-border);
}

.wish-author {
  display: inline-block;
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 700;
  color: var(--color-primary-dark);
  background: var(--color-rose-light);
  padding: 2px 8px;
  border-radius: 6px;
  margin-bottom: 4px;
  border: 1px solid var(--color-rose-border);
}

.wish-message {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--color-text);
  line-height: 1.4;
  margin-top: 4px;
}

/* Transition animations */
.wish-enter-active {
  transition: all 0.5s ease;
}
.wish-leave-active {
  transition: all 0.3s ease;
}
.wish-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.wish-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
