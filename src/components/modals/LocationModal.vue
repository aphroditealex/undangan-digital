<template>
  <div class="location-modal">
    <h2 class="section-title">Waktu & Tempat</h2>
    <p class="section-subtitle">{{ uiText.description }}</p>

    <!-- Countdown -->
    <div class="countdown-section">
      <h3 class="countdown-title">{{ uiText.countdown_title }}</h3>
      <div class="countdown-grid">
        <div class="countdown-item">
          <span class="countdown-value">{{ countdown.days }}</span>
          <span class="countdown-label">{{ uiText.countdown_days || 'Hari' }}</span>
        </div>
        <div class="countdown-sep">:</div>
        <div class="countdown-item">
          <span class="countdown-value">{{ countdown.hours }}</span>
          <span class="countdown-label">{{ uiText.countdown_hours || 'Jam' }}</span>
        </div>
        <div class="countdown-sep">:</div>
        <div class="countdown-item">
          <span class="countdown-value">{{ countdown.minutes }}</span>
          <span class="countdown-label">{{ uiText.countdown_minutes || 'Menit' }}</span>
        </div>
        <div class="countdown-sep">:</div>
        <div class="countdown-item">
          <span class="countdown-value">{{ countdown.seconds }}</span>
          <span class="countdown-label">{{ uiText.countdown_seconds || 'Detik' }}</span>
        </div>
      </div>
    </div>

    <!-- Events -->
    <div v-for="event in store.events" :key="event.id" class="event-card">
      <h3 class="event-name">{{ event.name }}</h3>
      <div class="event-details">
        <div class="event-detail">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>{{ formatDate(event.date) }}</span>
        </div>
        <div class="event-detail">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>{{ event.time_start }} — {{ event.time_end }} WIB</span>
        </div>
      </div>

      <!-- Venue -->
      <div class="venue-card" v-if="event.venue">
        <div class="venue-image-wrapper" v-if="event.venue.image">
          <img :src="event.venue.image" :alt="event.venue.name" class="venue-image" />
        </div>
        <div class="venue-info">
          <h4 class="venue-name">{{ event.venue.name }}</h4>
          <p class="venue-address">{{ event.venue.address }}</p>
          <a
            v-if="event.venue.url"
            :href="event.venue.url"
            target="_blank"
            class="map-btn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {{ uiText.view_map_button || 'Buka di Google Maps' }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useInvitationStore } from '@/stores/invitation'

const store = useInvitationStore()
const uiText = computed(() => store.uiText?.location || {})

const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })
let timer = null

function updateCountdown() {
  const target = store.weddingDate
  if (!target) return

  const now = new Date()
  const diff = target - now

  if (diff <= 0) {
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return
  }

  countdown.value = {
    days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0'),
    hours: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
    minutes: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0'),
    seconds: String(Math.floor((diff / 1000) % 60)).padStart(2, '0')
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

onMounted(() => {
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.location-modal {
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
  margin-bottom: var(--space-xl);
}

/* Countdown */
.countdown-section {
  background: var(--color-rose-light);
  border: 1px solid var(--color-rose-border);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.countdown-title {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-light);
  margin-bottom: var(--space-md);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.countdown-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 52px;
}

.countdown-value {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1;
}

.countdown-label {
  font-family: var(--font-sans);
  font-size: 10px;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 4px;
}

.countdown-sep {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 14px;
}

/* Event Card */
.event-card {
  background: var(--color-cream);
  border: 1px solid var(--color-rose-border);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  text-align: left;
}

.event-name {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  margin-bottom: var(--space-md);
  text-align: center;
}

.event-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
}

.event-detail {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--color-text);
}

.event-detail svg {
  color: var(--color-primary);
  flex-shrink: 0;
}

/* Venue */
.venue-card {
  border-top: 1px solid var(--color-rose-border);
  padding-top: var(--space-md);
}

.venue-image-wrapper {
  width: 100%;
  height: 140px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  margin-bottom: var(--space-md);
}

.venue-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.venue-name {
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 700;
  margin-bottom: var(--space-xs);
}

.venue-address {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--color-text-light);
  line-height: 1.5;
  margin-bottom: var(--space-md);
}

.map-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  background: var(--color-primary);
  color: white;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  transition: background var(--transition-fast);
}

.map-btn:hover {
  background: var(--color-primary-dark);
}
</style>
