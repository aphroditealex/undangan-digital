import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockInvitationData } from '@/data/mockData'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3001')

export const useInvitationStore = defineStore('invitation', () => {
  // State
  const invitation = ref(null)
  const currentScreen = ref('preloader') // preloader → intro → room
  const activeModal = ref(null)
  const isMusicPlaying = ref(false)
  const isLightOn = ref(true)
  const showWishes = ref(true)
  const isLoading = ref(true)
  const guestCode = ref('')
  
  // API State
  const apiMessages = ref([])
  const rsvpStatus = ref(null) // null, 'loading', 'success', 'error'

  // Computed
  const groomData = computed(() => invitation.value?.groom || {})
  const brideData = computed(() => invitation.value?.bride || {})
  const events = computed(() => invitation.value?.events || [])
  const gallery = computed(() => invitation.value?.gallery || [])
  const loveStory = computed(() => invitation.value?.love_story || [])
  const dresscode = computed(() => invitation.value?.dresscode || [])
  const gifts = computed(() => invitation.value?.gifts || [])
  const messages = computed(() => {
    // Merge API messages with mock messages, or just use API if it has data
    if (apiMessages.value.length > 0) {
      return apiMessages.value
    }
    return invitation.value?.messages || []
  })
  const guestBook = computed(() => invitation.value?.guest_book || {})
  const quote = computed(() => invitation.value?.quote || '')
  const templateVariant = computed(() => invitation.value?.template_variant?.value || {})
  const decorations = computed(() => templateVariant.value?.decorations || [])
  const uiText = computed(() => templateVariant.value?.ui_text || {})
  const preloaderConfig = computed(() => templateVariant.value?.preloader || {})
  const introConfig = computed(() => templateVariant.value?.intro || {})
  const navigationConfig = computed(() => templateVariant.value?.navigation || {})
  const mainContentConfig = computed(() => templateVariant.value?.main_content || {})

  const coupleNames = computed(() => {
    const bride = brideData.value?.nickname || 'Bride'
    const groom = groomData.value?.nickname || 'Groom'
    return `${bride} & ${groom}`
  })

  const guestName = computed(() => guestBook.value?.name || 'Tamu Undangan')
  const guestGreeting = computed(() => guestBook.value?.greetings || 'Dear')

  const weddingDate = computed(() => {
    if (!invitation.value?.date) return null
    return new Date(invitation.value.date)
  })

  // Actions
  function loadInvitation() {
    // Parse code from URL
    const params = new URLSearchParams(window.location.search)
    guestCode.value = params.get('code') || 'EXI54K'

    // Use mock data
    invitation.value = mockInvitationData
    isLoading.value = false

    // Fetch initial API data
    fetchMessages()
    checkRsvp()

    // Listen for live ws real-time updates
    socket.on('new_wish', (newWish) => {
      // Add the message to the very top!
      apiMessages.value.unshift(newWish)
    })
  }

  async function fetchMessages() {
    try {
      const res = await fetch(`http://localhost:3001/api/v1/messages?limit=20`)
      const data = await res.json()
      if (data.success) {
        apiMessages.value = data.data
      }
    } catch (e) {
      console.error('Failed to fetch messages:', e)
    }
  }

  async function checkRsvp() {
    if (!guestCode.value) return
    try {
      const res = await fetch(`http://localhost:3001/api/v1/rsvp/check?code=${guestCode.value}`)
      const data = await res.json()
      if (data.hasSubmitted) {
        rsvpStatus.value = 'success'
      }
    } catch (e) {
      console.error('Failed to check RSVP:', e)
    }
  }

  async function submitRsvp(payload) {
    rsvpStatus.value = 'loading'
    try {
      const res = await fetch(`http://localhost:3001/api/v1/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, code: guestCode.value })
      })
      const data = await res.json()
      
      if (data.success) {
        rsvpStatus.value = 'success'
        // No need to fetchMessages() anymore because the socket will broadcast it immediately!
        return { success: true }
      } else {
        rsvpStatus.value = 'error'
        return { success: false, message: data.message }
      }
    } catch (e) {
      console.error('Failed to submit RSVP:', e)
      rsvpStatus.value = 'error'
      return { success: false, message: 'Terjadi kesalahan server saat menyimpan data.' }
    }
  }

  function setScreen(screen) {
    currentScreen.value = screen
  }

  function openModal(modalType) {
    activeModal.value = modalType
  }

  function closeModal() {
    activeModal.value = null
  }

  function toggleMusic() {
    isMusicPlaying.value = !isMusicPlaying.value
  }

  function toggleLight() {
    isLightOn.value = !isLightOn.value
  }

  function toggleWishes() {
    showWishes.value = !showWishes.value
  }

  return {
    // State
    invitation,
    currentScreen,
    activeModal,
    isMusicPlaying,
    isLightOn,
    showWishes,
    isLoading,
    guestCode,
    apiMessages,
    rsvpStatus,
    // Computed
    groomData,
    brideData,
    events,
    gallery,
    loveStory,
    dresscode,
    gifts,
    messages,
    guestBook,
    quote,
    templateVariant,
    decorations,
    uiText,
    preloaderConfig,
    introConfig,
    navigationConfig,
    mainContentConfig,
    coupleNames,
    guestName,
    guestGreeting,
    weddingDate,
    // Actions
    loadInvitation,
    setScreen,
    openModal,
    closeModal,
    toggleMusic,
    toggleLight,
    toggleWishes,
    fetchMessages,
    checkRsvp,
    submitRsvp,
  }
})
