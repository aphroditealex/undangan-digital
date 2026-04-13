<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-container">
      <!-- Mac-style window header -->
      <div class="modal-header">
        <div class="window-dots">
          <span class="dot dot-red" @click="$emit('close')"></span>
          <span class="dot dot-yellow"></span>
          <span class="dot dot-green"></span>
        </div>
        <span class="modal-header-title">Dikondangin</span>
        <div class="window-dots-placeholder"></div>
      </div>

      <!-- Modal content -->
      <div class="modal-body">
        <!-- <div class="modal-top-bar"> -->
        <!-- <button class="modal-back-btn" @click="$emit('close')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M19 12H5"></path>
              <path d="M12 19l-7-7 7-7"></path>
            </svg>
          </button> -->
        <!-- <div class="flex-spacer"></div>
          <button class="modal-close-btn" @click="$emit('close')">×</button> -->
        <!-- </div> -->
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(["close"]);
</script>

<style scoped>
.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: var(--space-lg);
  animation: fadeIn 0.2s ease;
}

.modal-container {
  width: 100%;
  max-width: 420px;
  max-height: 85vh;
  background: var(--color-modal-bg);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  animation: scaleIn 0.3s ease;
  display: flex;
  flex-direction: column;
}

/* Mac-style window header */
.modal-header {
  background: var(--color-modal-header);
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.window-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.dot:hover {
  opacity: 0.8;
}
.dot-red {
  background: #ff5f57;
}
.dot-yellow {
  background: #febc2e;
}
.dot-green {
  background: #28c840;
}

.modal-header-title {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--color-text-light);
}

.window-dots-placeholder {
  width: 44px;
}

/* Modal body */
.modal-body {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-top-bar {
  display: flex;
  align-items: center;
  padding: var(--space-sm) var(--space-md);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
}

.flex-spacer {
  flex: 1;
}

.modal-back-btn {
  padding: 4px;
  color: var(--color-text-light);
  transition: color var(--transition-fast);
}
.modal-back-btn:hover {
  color: var(--color-text);
}

.modal-close-btn {
  font-size: 24px;
  line-height: 1;
  color: var(--color-text-light);
  padding: 0 4px;
  transition: color var(--transition-fast);
}
.modal-close-btn:hover {
  color: var(--color-text);
}

.modal-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-lg);
}
</style>
