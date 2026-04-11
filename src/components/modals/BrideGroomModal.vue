<template>
  <div class="bride-groom-modal">
    <h2 class="section-title">Tentang Kami</h2>
    <p class="section-subtitle">{{ uiText.description }}</p>

    <!-- Quote -->
    <div class="quote-box" v-if="store.quote">
      <p class="quote-text" v-html="formattedQuote"></p>
    </div>

    <!-- Bride -->
    <div class="person-card">
      <div class="person-image-wrapper">
        <img :src="store.brideData.url" :alt="store.brideData.name" class="person-image" />
      </div>
      <span class="person-label">{{ uiText.bride_label || 'The Bride' }}</span>
      <h3 class="person-name">{{ store.brideData.name }}</h3>
      <p class="person-desc">{{ store.brideData.description }}</p>
      <a
        v-if="store.brideData.instagram_username"
        :href="`https://instagram.com/${store.brideData.instagram_username}`"
        target="_blank"
        class="instagram-link"
      >
        @{{ store.brideData.instagram_username }}
      </a>
    </div>

    <div class="ampersand">&</div>

    <!-- Groom -->
    <div class="person-card">
      <div class="person-image-wrapper">
        <img :src="store.groomData.url" :alt="store.groomData.name" class="person-image" />
      </div>
      <span class="person-label">{{ uiText.groom_label || 'The Groom' }}</span>
      <h3 class="person-name">{{ store.groomData.name }}</h3>
      <p class="person-desc">{{ store.groomData.description }}</p>
      <a
        v-if="store.groomData.instagram_username"
        :href="`https://instagram.com/${store.groomData.instagram_username}`"
        target="_blank"
        class="instagram-link"
      >
        @{{ store.groomData.instagram_username }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useInvitationStore } from '@/stores/invitation'

const store = useInvitationStore()
const uiText = computed(() => store.uiText?.bride_groom || {})

const formattedQuote = computed(() => {
  return store.quote.replace(/\n/g, '<br/>')
})
</script>

<style scoped>
.bride-groom-modal {
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
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--space-lg);
}

.quote-box {
  background: var(--color-rose-light);
  border: 1px solid var(--color-rose-border);
  border-radius: var(--radius-md);
  padding: var(--space-md) var(--space-lg);
  margin-bottom: var(--space-xl);
}

.quote-text {
  font-family: var(--font-body);
  font-size: 13px;
  font-style: italic;
  color: var(--color-text-light);
  line-height: 1.7;
}

.person-card {
  background: var(--color-rose-light);
  border: 1px solid var(--color-rose-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  margin-bottom: var(--space-md);
}

.person-image-wrapper {
  width: 100%;
  max-height: 280px;
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: var(--space-md);
  box-shadow: var(--shadow-md);
}

.person-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.person-label {
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--color-primary);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.person-name {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  margin: var(--space-xs) 0;
}

.person-desc {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--color-text-light);
  margin-bottom: var(--space-sm);
}

.instagram-link {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--color-primary);
  font-weight: 500;
  transition: color var(--transition-fast);
}

.instagram-link:hover {
  color: var(--color-primary-dark);
}

.ampersand {
  font-family: var(--font-display);
  font-size: 36px;
  color: var(--color-primary);
  margin: var(--space-md) 0;
}
</style>
