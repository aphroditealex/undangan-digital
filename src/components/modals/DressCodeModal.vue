<template>
  <div class="dresscode-modal">
    <h2 class="section-title">Busana & Nuansa</h2>
    <p class="section-intro">{{ uiText.intro_text }}</p>

    <h3 class="color-heading">{{ uiText.color_label || 'Warna yang Disarankan' }}</h3>

    <div class="color-palette">
      <div
        v-for="color in store.dresscode"
        :key="color.name"
        class="color-card"
      >
        <div class="color-swatch" :style="{ background: color.color_hex }"></div>
        <div class="color-info">
          <h4>{{ color.name }}</h4>
          <p>{{ color.description }}</p>
          <span class="color-hex">{{ color.color_hex }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useInvitationStore } from '@/stores/invitation'

const store = useInvitationStore()
const uiText = computed(() => store.uiText?.dresscode || {})
</script>

<style scoped>
.dresscode-modal {
  text-align: center;
}

.section-title {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  margin-bottom: var(--space-md);
}

.section-intro {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--color-text-light);
  line-height: 1.6;
  margin-bottom: var(--space-xl);
}

.color-heading {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--space-md);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.color-palette {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.color-card {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md);
  background: var(--color-cream);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-rose-border);
  text-align: left;
}

.color-swatch {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  flex-shrink: 0;
  box-shadow: var(--shadow-sm);
}

.color-info h4 {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 2px;
}

.color-info p {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--color-text-light);
  margin-bottom: 4px;
}

.color-hex {
  font-family: monospace;
  font-size: 11px;
  color: var(--color-text-muted);
}
</style>
