<template>
  <div class="scanner-view">
    <header class="admin-header">
      <div class="header-content">
        <h1>Scan QR Tamu</h1>
        <router-link to="/admin" class="btn-outline">Kembali ke Dashboard</router-link>
      </div>
    </header>

    <main class="scanner-content">
      <div class="scanner-container">
        <!-- Scanner Window -->
        <div id="reader" v-show="!scanResult"></div>

        <!-- Result Window -->
        <div class="scan-result" v-if="scanResult">
          <div class="result-icon" :class="scanStatus">
            {{ scanStatus === 'success' ? '✓' : '✗' }}
          </div>
          <h2>{{ scanMessage }}</h2>
          <div class="guest-info" v-if="guestData">
            <p class="guest-label">Nama Tamu</p>
            <h3>{{ guestData.name }}</h3>
            <p class="guest-detail">Pax: {{ guestData.guest_count }}</p>
            <p class="guest-detail">Kehadiran: {{ guestData.attendance === 'ACCEPT' ? 'Hadir' : 'Batal' }}</p>
          </div>
          <button class="btn-primary mt-4" @click="resetScan">Scan Tiket Lain</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Html5QrcodeScanner } from 'html5-qrcode'

const scanResult = ref(null)
const scanStatus = ref(null) // 'success' or 'error'
const scanMessage = ref('')
const guestData = ref(null)

let html5QrcodeScanner = null

onMounted(() => {
  initScanner()
})

onUnmounted(() => {
  if (html5QrcodeScanner) {
    html5QrcodeScanner.clear().catch(err => {
      console.error('Failed to clear scanner', err)
    })
  }
})

function initScanner() {
  html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: { width: 250, height: 250 } },
    /* verbose= */ false
  )
  html5QrcodeScanner.render(onScanSuccess, onScanFailure)
}

async function onScanSuccess(decodedText, decodedResult) {
  // Pause scanner
  if (html5QrcodeScanner) {
    html5QrcodeScanner.clear()
  }
  
  scanResult.value = decodedText
  
  try {
    const res = await fetch('http://localhost:3001/api/v1/rsvp/check-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: decodedText })
    })
    
    const data = await res.json()
    if (data.success) {
      scanStatus.value = 'success'
      scanMessage.value = data.message
      guestData.value = data.data
    } else {
      scanStatus.value = 'error'
      scanMessage.value = data.message || 'Gagal memverifikasi tamu'
    }
  } catch (error) {
    scanStatus.value = 'error'
    scanMessage.value = 'Terjadi kesalahan sistem'
  }
}

function onScanFailure(error) {
  // Usually too noisy to log, but keeps the scanner looking for a QR
}

function resetScan() {
  scanResult.value = null
  scanStatus.value = null
  scanMessage.value = ''
  guestData.value = null
  
  // Re-init scanner
  setTimeout(() => {
    initScanner()
  }, 100)
}
</script>

<style scoped>
.scanner-view {
  min-height: 100vh;
  width: 100%;
  background: var(--color-bg-light, #f5f8fa);
  font-family: var(--font-sans, system-ui, -apple-system, sans-serif);
}

.admin-header {
  background: white;
  padding: 20px 40px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content h1 {
  font-size: 24px;
  margin: 0;
  color: var(--color-primary-dark, #ad2041);
}

.btn-outline {
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  background: transparent;
  color: var(--color-primary-dark, #ad2041);
  border: 1px solid var(--color-primary, #fb8a9c);
  transition: all 0.2s;
}

.scanner-content {
  max-width: 600px;
  margin: 40px auto;
  padding: 0 20px;
}

.scanner-container {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#reader {
  width: 100%;
  border: none !important;
}

/* Result UI */
.scan-result {
  text-align: center;
  padding: 20px 0;
}

.result-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
}

.result-icon.success {
  background: #10b981;
}

.result-icon.error {
  background: #ef4444;
}

.scan-result h2 {
  font-size: 20px;
  margin-bottom: 24px;
}

.guest-info {
  background: #f8fafc;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  margin-bottom: 24px;
}

.guest-label {
  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.guest-info h3 {
  font-size: 24px;
  color: #0f172a;
  margin: 0 0 12px 0;
}

.guest-detail {
  font-size: 14px;
  color: #475569;
  margin: 4px 0;
}

.btn-primary {
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
  background: var(--color-primary, #fb8a9c);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
}

.btn-primary:hover {
  background: var(--color-primary-dark, #ad2041);
}

.mt-4 {
  margin-top: 16px;
}
</style>
