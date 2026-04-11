<template>
  <div class="login-view">
    <div class="login-card">
      <div class="login-header">
        <h2>Panel Admin</h2>
        <p>Silakan login untuk mengelola RSVP & Tamu</p>
      </div>
      
      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            v-model="email" 
            placeholder="admin@gmail.com" 
            required 
          />
        </div>
        
        <div class="form-group">
          <label>Password</label>
          <input 
            type="password" 
            v-model="password" 
            placeholder="••••••••••" 
            required 
          />
        </div>

        <div v-if="errorMsg" class="error-msg">
          {{ errorMsg }}
        </div>
        
        <button type="submit" class="btn-primary" :disabled="isLoading">
          {{ isLoading ? 'Loading...' : 'Login Akses' }}
        </button>
      </form>
      
      <div class="back-link">
        <router-link to="/">← Kembali ke Undangan</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMsg = ref('')
const isLoading = ref(false)

async function handleLogin() {
  errorMsg.value = ''
  isLoading.value = true
  
  try {
    const res = await fetch('http://localhost:3001/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })
    
    const data = await res.json()
    if (data.success) {
      // Simpan token ke localStorage sebagai tanda login
      localStorage.setItem('adminToken', data.token)
      router.push('/admin')
    } else {
      errorMsg.value = data.message || 'Login gagal'
    }
  } catch (error) {
    console.error('Login error:', error)
    errorMsg.value = 'Terjadi kesalahan sistem'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-view {
  min-height: 100vh;
  width: 100vw;
  background: var(--color-bg-light, #f5f8fa);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-sans, system-ui, -apple-system, sans-serif);
  padding: 20px;
}

.login-card {
  background: white;
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  padding: 40px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  margin: 0 0 8px 0;
  color: var(--color-primary-dark, #ad2041);
  font-size: 24px;
}

.login-header p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 13px;
  font-weight: 600;
  color: #334155;
}

input {
  padding: 12px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;
  outline: none;
}

input:focus {
  border-color: var(--color-primary, #fb8a9c);
  box-shadow: 0 0 0 3px rgba(251, 138, 156, 0.1);
}

.error-msg {
  padding: 10px;
  background: #fee2e2;
  color: #b91c1c;
  border-radius: 6px;
  font-size: 13px;
  text-align: center;
}

.btn-primary {
  padding: 14px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
  background: var(--color-primary, #fb8a9c);
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 10px;
}

.btn-primary:hover {
  background: var(--color-primary-dark, #ad2041);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.back-link {
  text-align: center;
  margin-top: 24px;
}

.back-link a {
  color: #64748b;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  transition: color 0.2s;
}

.back-link a:hover {
  color: var(--color-primary-dark, #ad2041);
}
</style>
