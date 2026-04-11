<template>
  <div class="rsvp-modal">
    <h2 class="section-title">Konfirmasi Kehadiran</h2>
    <p class="section-subtitle">{{ uiText.description }}</p>

    <!-- RSVP Form -->
    <form v-if="!submitted" class="rsvp-form" @submit.prevent="submitRSVP">
      <!-- Name -->
      <div class="form-group">
        <input
          v-model="form.name"
          type="text"
          :placeholder="uiText.name_placeholder || 'Nama Lengkap'"
          class="form-input"
          required
        />
      </div>

      <!-- Phone -->
      <div class="form-group">
        <input
          v-model="form.phone"
          type="tel"
          :placeholder="uiText.phone_placeholder || 'Nomor Telepon'"
          class="form-input"
        />
      </div>

      <!-- Attendance -->
      <div class="form-group">
        <label class="form-label">{{ uiText.attendance_label || 'Kehadiran' }}</label>
        <div class="attendance-options">
          <button
            type="button"
            class="attendance-btn"
            :class="{ active: form.attendance === 'ACCEPT' }"
            @click="form.attendance = 'ACCEPT'"
          >
            ✓ {{ uiText.will_attend || 'Hadir' }}
          </button>
          <button
            type="button"
            class="attendance-btn decline"
            :class="{ active: form.attendance === 'DECLINE' }"
            @click="form.attendance = 'DECLINE'"
          >
            ✗ {{ uiText.wont_attend || 'Tidak Hadir' }}
          </button>
        </div>
      </div>

      <!-- Guest Count -->
      <div class="form-group" v-if="form.attendance === 'ACCEPT'">
        <label class="form-label">{{ uiText.guest_count_label || 'Jumlah Tamu' }}</label>
        <div class="guest-count">
          <button type="button" class="count-btn" @click="decrementGuest">−</button>
          <span class="count-value">{{ form.guestCount }}</span>
          <button type="button" class="count-btn" @click="incrementGuest">+</button>
          <span class="count-suffix">{{ uiText.guest_count_suffix || 'Orang' }}</span>
        </div>
      </div>

      <!-- Message -->
      <div class="form-group">
        <textarea
          v-model="form.message"
          :placeholder="uiText.message_placeholder || 'Tulis ucapan atau doa untuk kami...'"
          class="form-textarea"
          rows="4"
        ></textarea>
      </div>

      <button type="submit" class="submit-btn" :disabled="store.rsvpStatus === 'loading'">
        {{ store.rsvpStatus === 'loading' ? 'Loading...' : (uiText.submit_button || 'Kirim Konfirmasi') }}
      </button>
    </form>

    <!-- Success State -->
    <div v-else class="success-state">
      <div class="success-icon">✓</div>
      <p class="success-text">{{ uiText.success_message || 'Terima kasih! Konfirmasi Anda telah diterima.' }}</p>
      <button class="qr-access-btn" @click="store.openModal('qrcode')">
        Tampilkan QR Code Kehadiran
      </button>
    </div>

    <!-- Existing Messages -->
    <div class="messages-section" v-if="store.messages.length">
      <h3 class="messages-title">Ucapan & Doa</h3>
      <div class="messages-list">
        <div v-for="msg in store.messages" :key="msg.id" class="message-card">
          <span class="message-author">{{ msg.guest_book.name }}</span>
          <p class="message-text">{{ msg.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useInvitationStore } from '@/stores/invitation'

const store = useInvitationStore()
const uiText = computed(() => store.uiText?.rsvp || {})
const submitted = ref(false)

const form = ref({
  name: '',
  phone: '',
  attendance: 'ACCEPT',
  guestCount: 1,
  message: ''
})

function incrementGuest() {
  if (form.value.guestCount < 5) form.value.guestCount++
}

function decrementGuest() {
  if (form.value.guestCount > 1) form.value.guestCount--
}

async function submitRSVP() {
  if (!form.value.name) return

  const result = await store.submitRsvp({
    name: form.value.name,
    phone: form.value.phone,
    attendance: form.value.attendance,
    guest_count: form.value.guestCount,
    message: form.value.message
  })

  if (result.success) {
    submitted.value = true
  } else {
    alert(result.message || 'Gagal mengirim RSVP. Coba lagi.')
  }
}
</script>

<style scoped>
.rsvp-modal {
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

.rsvp-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  text-align: left;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.form-label {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid var(--color-rose-border);
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--color-text);
  background: var(--color-cream);
  transition: border-color var(--transition-fast);
}

.form-input:focus,
.form-textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(251, 138, 156, 0.15);
}

.form-textarea {
  resize: none;
}

/* Attendance buttons */
.attendance-options {
  display: flex;
  gap: var(--space-sm);
}

.attendance-btn {
  flex: 1;
  padding: 10px;
  border: 1.5px solid var(--color-rose-border);
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-light);
  background: var(--color-cream);
  transition: all var(--transition-fast);
}

.attendance-btn.active {
  border-color: var(--color-primary);
  background: var(--color-rose-light);
  color: var(--color-primary-dark);
}

.attendance-btn.decline.active {
  border-color: #999;
  background: #f5f5f5;
  color: #666;
}

/* Guest count */
.guest-count {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.count-btn {
  width: 36px;
  height: 36px;
  border: 1.5px solid var(--color-rose-border);
  border-radius: var(--radius-sm);
  font-size: 18px;
  font-weight: 700;
  color: var(--color-primary);
  background: var(--color-cream);
  transition: all var(--transition-fast);
}

.count-btn:hover {
  background: var(--color-rose-light);
}

.count-value {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  min-width: 30px;
  text-align: center;
}

.count-suffix {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--color-text-muted);
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 700;
  transition: background var(--transition-fast);
  margin-top: var(--space-sm);
}

.submit-btn:hover {
  background: var(--color-primary-dark);
}

/* Success */
.success-state {
  padding: var(--space-2xl);
}

.success-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-md);
  animation: scaleIn 0.3s ease;
}

.success-text {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--color-text);
  line-height: 1.6;
  margin-bottom: var(--space-lg);
}

.qr-access-btn {
  padding: 10px 20px;
  background: white;
  color: var(--color-primary-dark);
  border: 1.5px solid var(--color-primary);
  border-radius: 20px;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 700;
  transition: all var(--transition-fast);
}

.qr-access-btn:hover {
  background: var(--color-rose-light);
}

/* Messages */
.messages-section {
  margin-top: var(--space-2xl);
  border-top: 1px solid var(--color-rose-border);
  padding-top: var(--space-lg);
}

.messages-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  margin-bottom: var(--space-md);
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  max-height: 300px;
  overflow-y: auto;
}

.message-card {
  background: var(--color-cream);
  border: 1px solid var(--color-rose-border);
  border-radius: var(--radius-sm);
  padding: var(--space-sm) var(--space-md);
  text-align: left;
}

.message-author {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 700;
  color: var(--color-primary-dark);
}

.message-text {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--color-text);
  margin-top: 4px;
  line-height: 1.4;
}
</style>
