<template>
  <div class="love-story-modal">
    <h2 class="section-title">Kisah Cinta Kami</h2>
    <p class="section-subtitle">{{ uiText.description }}</p>

    <div class="timeline">
      <div
        v-for="(story, index) in store.loveStory"
        :key="index"
        class="timeline-item"
        :class="{ 'right': index % 2 === 1 }"
      >
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="timeline-image-wrapper">
            <img :src="story.image" :alt="story.title" class="timeline-image" />
          </div>
          <h3 class="timeline-title">{{ story.title }}</h3>
          <p class="timeline-desc">{{ story.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useInvitationStore } from '@/stores/invitation'

const store = useInvitationStore()
const uiText = computed(() => store.uiText?.love_story || {})
</script>

<style scoped>
.love-story-modal {
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

.timeline {
  position: relative;
  padding-left: 20px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--color-primary-light), var(--color-primary), var(--color-primary-light));
}

.timeline-item {
  position: relative;
  margin-bottom: var(--space-xl);
}

.timeline-dot {
  position: absolute;
  left: -18px;
  top: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 2px solid var(--color-white);
  box-shadow: 0 0 0 3px var(--color-primary-light);
  z-index: 1;
}

.timeline-card {
  background: var(--color-cream);
  border: 1px solid var(--color-rose-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  text-align: left;
  box-shadow: var(--shadow-sm);
}

.timeline-image-wrapper {
  width: 100%;
  height: 160px;
  overflow: hidden;
}

.timeline-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.timeline-card:hover .timeline-image {
  transform: scale(1.05);
}

.timeline-title {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  padding: var(--space-md) var(--space-md) var(--space-xs);
  color: var(--color-text);
}

.timeline-desc {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--color-text-light);
  line-height: 1.6;
  padding: 0 var(--space-md) var(--space-md);
}
</style>
