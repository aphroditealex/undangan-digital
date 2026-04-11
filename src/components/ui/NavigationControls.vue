<template>
  <div class="nav-controls">
    <!-- Info button (top-left) -->
    <button class="nav-btn info-btn" @click="store.openModal('welcome')" title="Info">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    </button>

    <!-- Right side buttons -->
    <div class="nav-right">
      <!-- Music toggle -->
      <button class="nav-btn" @click="store.toggleMusic" :title="store.isMusicPlaying ? 'Pause Music' : 'Play Music'">
        <svg v-if="store.isMusicPlaying" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
        <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
          <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2"></line>
        </svg>
      </button>

      <!-- Light toggle -->
      <button class="nav-btn" @click="store.toggleLight" :title="store.isLightOn ? 'Night Mode' : 'Day Mode'">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="M4.93 4.93l1.41 1.41"></path>
          <path d="M17.66 17.66l1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="M6.34 17.66l-1.41 1.41"></path>
          <path d="M19.07 4.93l-1.41 1.41"></path>
        </svg>
      </button>

      <!-- QR Code -->
      <button class="nav-btn" @click="showQRInfo" title="QR Code">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
          <rect x="14" y="14" width="3" height="3"></rect>
          <line x1="21" y1="14" x2="21" y2="21"></line>
          <line x1="14" y1="21" x2="21" y2="21"></line>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useInvitationStore } from '@/stores/invitation'

const store = useInvitationStore()

function showQRInfo() {
  store.openModal('qrcode')
}
</script>

<style scoped>
.nav-controls {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: var(--space-md);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 30;
  pointer-events: none;
}

.nav-right {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.nav-btn {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid var(--color-primary);
  color: var(--color-primary-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-sm);
}

.nav-btn:hover {
  background: var(--color-primary);
  color: var(--color-white);
  transform: scale(1.1);
}

.nav-btn:active {
  transform: scale(0.95);
}
</style>
