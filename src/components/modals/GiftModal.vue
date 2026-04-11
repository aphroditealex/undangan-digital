<template>
  <div class="gift-modal">
    <h2 class="section-title">Kado & Doa dari Jauh</h2>
    <p class="section-subtitle">{{ uiText.description }}</p>
    <p class="section-thank-you">{{ uiText.thank_you }}</p>

    <!-- Gift accounts -->
    <div class="gift-accounts">
      <div v-for="gift in store.gifts" :key="gift.id" class="gift-card">
        <div class="gift-bank-header">
          <img
            v-if="gift.bank?.logo"
            :src="gift.bank.logo"
            :alt="gift.bank.name"
            class="bank-logo"
          />
          <span class="bank-name">{{ gift.bank?.name }}</span>
        </div>

        <div class="account-info">
          <div class="account-number-row">
            <span class="account-number">{{ gift.account_number }}</span>
            <button class="copy-btn" @click="copyToClipboard(gift.account_number, gift.id)">
              <svg v-if="copiedId !== gift.id" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
              </svg>
              <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              {{ copiedId === gift.id ? (uiText.copied_text || 'Tersalin!') : (uiText.copy_button || 'Salin') }}
            </button>
          </div>
          <span class="account-name">{{ uiText.account_name_label || 'a.n.' }} {{ gift.account_name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useInvitationStore } from '@/stores/invitation'

const store = useInvitationStore()
const uiText = computed(() => store.uiText?.gift || {})
const copiedId = ref(null)

async function copyToClipboard(text, id) {
  try {
    await navigator.clipboard.writeText(text)
    copiedId.value = id
    setTimeout(() => {
      copiedId.value = null
    }, 2000)
  } catch (err) {
    // Fallback
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    copiedId.value = id
    setTimeout(() => {
      copiedId.value = null
    }, 2000)
  }
}
</script>

<style scoped>
.gift-modal {
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
  margin-bottom: var(--space-sm);
}

.section-thank-you {
  font-family: var(--font-body);
  font-size: 13px;
  font-style: italic;
  color: var(--color-text-light);
  margin-bottom: var(--space-xl);
  line-height: 1.6;
}

.gift-accounts {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.gift-card {
  background: var(--color-cream);
  border: 1px solid var(--color-rose-border);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  text-align: left;
}

.gift-bank-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--color-rose-border);
}

.bank-logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.bank-name {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
}

.account-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.account-number-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.account-number {
  font-family: monospace;
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: 1px;
}

.copy-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 600;
  transition: all var(--transition-fast);
}

.copy-btn:hover {
  background: var(--color-primary-dark);
}

.account-name {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--color-text-muted);
}
</style>
