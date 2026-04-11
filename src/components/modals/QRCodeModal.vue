<template>
  <div class="qr-modal">
    <h2 class="section-title">Akses Masuk (QR Code)</h2>
    <p class="section-subtitle">Tunjukkan QR Code ini kepada penerima tamu/usher saat Anda tiba di lokasi acara.</p>
    
    <div class="qr-wrapper">
      <div class="qr-container">
        <qrcode-vue :value="store.guestCode" :size="200" level="H" render-as="svg" foreground="#ad2041" />
      </div>
    </div>

    <div class="guest-info">
      <p class="guest-label">Nama Tamu</p>
      <h3 class="guest-name">{{ store.guestName }}</h3>
      <div class="code-box">
        <span class="code-label">Kode Unik:</span>
        <span class="guest-code">{{ store.guestCode }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useInvitationStore } from '@/stores/invitation'
import QrcodeVue from 'qrcode.vue'

const store = useInvitationStore()
</script>

<style scoped>
.qr-modal {
  text-align: center;
  padding: var(--space-md) 0;
}

.section-title {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  margin-bottom: var(--space-xs);
}

.section-subtitle {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--color-text-light);
  line-height: 1.5;
  margin-bottom: var(--space-xl);
}

.qr-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: var(--space-xl);
}

.qr-container {
  padding: var(--space-md);
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-rose-border);
  display: inline-flex;
}

.guest-info {
  background: var(--color-rose-light);
  border: 1px solid var(--color-rose-border);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
}

.guest-label {
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--color-primary);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.guest-name {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--space-sm);
}

.code-box {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: white;
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid var(--color-rose-border);
}

.code-label {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--color-text-light);
}

.guest-code {
  font-family: monospace;
  font-size: 14px;
  font-weight: bold;
  color: var(--color-primary-dark);
  letter-spacing: 1px;
}
</style>
