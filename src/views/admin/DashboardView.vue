<template>
  <div class="admin-dashboard">
    <header class="admin-header">
      <div class="header-content">
        <h1>Dashboard Admin</h1>
        <div class="header-actions">
          <router-link to="/" class="btn-outline">Ke Undangan</router-link>
          <router-link to="/admin/scanner" class="btn-primary">Scan QR Tamu</router-link>
          <button @click="handleLogout" class="btn-logout">Logout</button>
        </div>
      </div>
    </header>

    <main class="dashboard-content">
      <!-- Stats Cards -->
      <section class="stats-grid">
        <div class="stat-card total">
          <h3>Total RSVP</h3>
          <p class="stat-value">{{ stats.total }}</p>
        </div>
        <div class="stat-card accept">
          <h3>Hadir</h3>
          <p class="stat-value">{{ stats.attending }}</p>
          <span class="stat-sub">({{ stats.totalGuests }} pax)</span>
        </div>
        <div class="stat-card decline">
          <h3>Tidak Hadir</h3>
          <p class="stat-value">{{ stats.declining }}</p>
        </div>
      </section>

      <!-- Guest Table -->
      <section class="guests-section">
        <div class="section-header">
          <h2>Daftar Kehadiran Tamu</h2>
          <button class="btn-refresh" @click="fetchData">Refresh Data</button>
        </div>
        
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Waktu</th>
                <th>Kode</th>
                <th>Nama Tamu</th>
                <th>No WhatsApp</th>
                <th>Status</th>
                <th>Pax</th>
                <th>Pesan Lengkap</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td colspan="7" class="text-center">Memuat data...</td>
              </tr>
              <tr v-else-if="guests.length === 0">
                <td colspan="7" class="text-center">Belum ada data RSVP</td>
              </tr>
              <tr v-else v-for="guest in guests" :key="guest.id">
                <td>{{ formatDate(guest.created_at) }}</td>
                <td><span class="badge code">{{ guest.code || '-' }}</span></td>
                <td class="font-bold">{{ guest.name }}</td>
                <td>{{ guest.phone || '-' }}</td>
                <td>
                  <span class="badge" :class="guest.attendance === 'ACCEPT' ? 'success' : 'danger'">
                    {{ guest.attendance === 'ACCEPT' ? 'Hadir' : 'Batal' }}
                  </span>
                </td>
                <td>{{ guest.guest_count }}</td>
                <td class="message-cell">{{ guest.message || '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'

const router = useRouter()
const stats = ref({ total: 0, attending: 0, declining: 0, totalGuests: 0 })
const guests = ref([])
const loading = ref(true)

function handleLogout() {
  localStorage.removeItem('adminToken')
  router.push('/admin/login')
}

async function fetchData() {
  loading.value = true
  try {
    // Fetch all RSVPs
    const { data, error } = await supabase
      .from('rsvp')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    guests.value = data || []

    // Calculate stats from the data
    const total = guests.value.length
    const attending = guests.value.filter(g => g.attendance === 'ACCEPT').length
    const declining = guests.value.filter(g => g.attendance === 'DECLINE').length
    const totalGuests = guests.value
      .filter(g => g.attendance === 'ACCEPT')
      .reduce((sum, g) => sum + (g.guest_count || 0), 0)

    stats.value = { total, attending, declining, totalGuests }
  } catch (err) {
    console.error('Error fetching admin data:', err)
  } finally {
    loading.value = false
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
  }).format(date)
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  width: 100%;
  background: var(--color-bg-light, #f5f8fa);
  font-family: var(--font-sans, system-ui, -apple-system, sans-serif);
  color: #333;
}

.admin-header {
  background: white;
  padding: 20px 40px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.header-content {
  max-width: 1200px;
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

.header-actions {
  display: flex;
  gap: 12px;
}

.btn-primary, .btn-outline {
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
  cursor: pointer;
}

.btn-primary {
  background: var(--color-primary, #fb8a9c);
  color: white;
  border: none;
}

.btn-primary:hover {
  background: var(--color-primary-dark, #ad2041);
}

.btn-outline {
  background: transparent;
  color: var(--color-primary-dark, #ad2041);
  border: 1px solid var(--color-primary, #fb8a9c);
}

.btn-logout {
  padding: 8px 16px;
  border-radius: 6px;
  background: #f1f5f9;
  color: #64748b;
  border: none;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-logout:hover {
  background: #e2e8f0;
  color: #0f172a;
}

.dashboard-content {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
  border-left: 4px solid #ddd;
}

.stat-card.total { border-color: #3b82f6; }
.stat-card.accept { border-color: #10b981; }
.stat-card.decline { border-color: #ef4444; }

.stat-card h3 {
  font-size: 14px;
  color: #666;
  text-transform: uppercase;
  margin: 0 0 10px 0;
}

.stat-value {
  font-size: 32px;
  font-weight: 800;
  margin: 0;
  color: #111;
}

.stat-sub {
  font-size: 13px;
  color: #888;
  margin-top: 4px;
  display: block;
}

/* Table */
.guests-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  font-size: 18px;
  margin: 0;
}

.btn-refresh {
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.table-container {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;
}

.data-table th, .data-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
}

.data-table th {
  background: #f8fafc;
  color: #64748b;
  font-weight: 600;
}

.data-table tr:hover {
  background: #f8fafc;
}

.font-bold {
  font-weight: 600;
}

.message-cell {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #64748b;
}

.badge {
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.badge.code {
  background: #f1f5f9;
  color: #475569;
  font-family: monospace;
}

.badge.success {
  background: #dcfce7;
  color: #166534;
}

.badge.danger {
  background: #fee2e2;
  color: #b91c1c;
}

.text-center {
  text-align: center;
  padding: 40px !important;
  color: #94a3b8;
}
</style>
