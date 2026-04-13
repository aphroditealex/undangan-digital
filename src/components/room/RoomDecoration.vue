<template>
  <div
    class="room-decoration"
    :style="decorationStyle"
    @click="$emit('click')"
    role="button"
    :aria-label="decoration.name"
  >
    <img
      :src="decoration.image_url"
      :alt="decoration.name"
      class="decoration-image"
      :class="{
        'animate-breath': decoration.animations?.breath,
        'animate-hover': decoration.animations?.hover,
      }"
    />
    <span class="decoration-tooltip">{{ decoration.name }}</span>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  decoration: {
    type: Object,
    required: true,
  },
});

defineEmits(["click"]);

const decorationStyle = computed(() => {
  const pos = props.decoration.position || {};
  const size = props.decoration.size || {};
  return {
    position: "absolute",
    top: pos.top || "auto",
    left: pos.left || "auto",
    right: pos.right || "auto",
    bottom: pos.bottom || "auto",
    width: size.width || "20%",
    maxWidth: size.maxWidth || "20%",
    zIndex: props.decoration.zIndex || 10,
    cursor: "pointer",
  };
});
</script>

<style scoped>
.room-decoration {
  transition: transform var(--transition-normal);
}

.room-decoration:hover {
  transform: scale(1.08);
}

.decoration-image {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 0 6px var(--color-accent-glow));
  animation: glowPulse 3s ease-in-out infinite;
  transition: filter var(--transition-normal);
}

.decoration-image.animate-breath {
  animation:
    glowPulse 3s ease-in-out infinite,
    breath 4s ease-in-out infinite;
}

.room-decoration:hover .decoration-image {
  filter: drop-shadow(0 0 16px var(--color-accent-glow))
    drop-shadow(0 0 30px rgba(77, 171, 247, 0.4));
}

/* Tooltip */
.decoration-tooltip {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: clamp(8px, 2.5vw, 10px);
  font-weight: 600;
  padding: clamp(2px, 1vw, 4px) clamp(6px, 2vw, 10px);
  border-radius: 10px;
  white-space: nowrap;
  box-shadow: var(--shadow-sm);
  opacity: 0;
  transition: opacity var(--transition-fast);
  pointer-events: none;
  border: 1px solid var(--color-rose-border);
}

.room-decoration:hover .decoration-tooltip {
  opacity: 1;
}
</style>
