<template>
  <div class="gallery-modal">
    <h2 class="section-title">Galeri Cerita Kami</h2>
    <p class="section-subtitle">{{ uiText.description }}</p>

    <div class="gallery-grid">
      <div
        v-for="(photo, index) in store.gallery"
        :key="index"
        class="gallery-item"
        :class="getItemClass(photo)"
        @click="openLightbox(index)"
      >
        <img :src="photo.url" :alt="photo.label" class="gallery-image" />
        <div class="gallery-overlay">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Transition name="fade">
      <div v-if="lightboxIndex !== null" class="lightbox" @click="closeLightbox">
        <img :src="store.gallery[lightboxIndex]?.url" class="lightbox-image" @click.stop />
        <button class="lightbox-close" @click="closeLightbox">×</button>
        <button v-if="lightboxIndex > 0" class="lightbox-prev" @click.stop="prevImage">‹</button>
        <button v-if="lightboxIndex < store.gallery.length - 1" class="lightbox-next" @click.stop="nextImage">›</button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useInvitationStore } from '@/stores/invitation'

const store = useInvitationStore()
const uiText = computed(() => store.uiText?.gallery || {})
const lightboxIndex = ref(null)

function getItemClass(photo) {
  if (photo.ratio?.width === 16 && photo.ratio?.height === 9) {
    return 'wide'
  }
  return 'tall'
}

function openLightbox(index) {
  lightboxIndex.value = index
}

function closeLightbox() {
  lightboxIndex.value = null
}

function prevImage() {
  if (lightboxIndex.value > 0) lightboxIndex.value--
}

function nextImage() {
  if (lightboxIndex.value < store.gallery.length - 1) lightboxIndex.value++
}
</script>

<style scoped>
.gallery-modal {
  text-align: center;
}

.section-title {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  margin-bottom: var(--space-sm);
}

.section-subtitle {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--color-text-light);
  line-height: 1.6;
  margin-bottom: var(--space-xl);
}

.gallery-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-sm);
}

.gallery-item {
  position: relative;
  border-radius: var(--radius-sm);
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 3/4;
}

.gallery-item.wide {
  grid-column: span 2;
  aspect-ratio: 16/9;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.gallery-item:hover .gallery-image {
  transform: scale(1.05);
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition-normal);
}

.gallery-overlay svg {
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.gallery-item:hover .gallery-overlay {
  background: rgba(0, 0, 0, 0.3);
}

.gallery-item:hover .gallery-overlay svg {
  opacity: 1;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
  padding: var(--space-xl);
}

.lightbox-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: var(--radius-sm);
}

.lightbox-close {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 32px;
  color: white;
  background: rgba(255, 255, 255, 0.2);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-prev, .lightbox-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 36px;
  color: white;
  background: rgba(255, 255, 255, 0.2);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-prev { left: 12px; }
.lightbox-next { right: 12px; }
</style>
