<template>
  <div
    class="room-decoration"
    :style="decorationStyle"
    @click="$emit('click')"
    role="button"
    :aria-label="decoration.name"
  >
    <div class="decoration-tilt" :style="tiltStyle">
      <img
        :src="decoration.image_url"
        :alt="decoration.name"
        class="decoration-image"
        :class="{
          'animate-breath': decoration.animations?.breath,
          'animate-hover': decoration.animations?.hover,
        }"
      />
    </div>
    <span class="decoration-tooltip">{{ decoration.name }}</span>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
  decoration: {
    type: Object,
    required: true,
  },
});

defineEmits(["click"]);

// Track viewport width so per-breakpoint overrides react to resize/devtools
const viewportWidth = ref(window.innerWidth);
function onResize() {
  viewportWidth.value = window.innerWidth;
}
onMounted(() => window.addEventListener("resize", onResize));
onUnmounted(() => window.removeEventListener("resize", onResize));

// Pick the override with the largest minWidth <= viewport (mobile-first)
const activeBreakpoint = computed(() => {
  const bps = props.decoration.breakpoints;
  if (!bps?.length) return null;
  return [...bps]
    .sort((a, b) => a.minWidth - b.minWidth)
    .reduce(
      (active, bp) => (viewportWidth.value >= bp.minWidth ? bp : active),
      null
    );
});

const decorationStyle = computed(() => {
  const bp = activeBreakpoint.value;
  const pos = { ...(props.decoration.position || {}), ...(bp?.position || {}) };
  const size = { ...(props.decoration.size || {}), ...(bp?.size || {}) };
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
    perspective: "600px",
  };
});

// Perspective tilt so assets follow room angles (wall, floor, table)
const tiltStyle = computed(() => {
  const p = props.decoration.perspective;
  if (!p) return {};
  return { transform: p.transform };
});
</script>

<style scoped>
.room-decoration {
  transition: transform var(--transition-normal);
}

.room-decoration:hover {
  transform: scale(1.08);
}

/* Wrapper carrying the 3D tilt so hover scale & breath don't override it */
.decoration-tilt {
  transform-style: preserve-3d;
  will-change: transform;
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
    drop-shadow(0 0 30px rgba(255, 180, 80, 0.45));
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
