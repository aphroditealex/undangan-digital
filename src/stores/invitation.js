import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockInvitationData } from '@/data/mockData'
import { supabase } from '@/lib/supabase'

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

    // Fetch messages from Supabase
    fetchMessages()
    checkRsvp()
  }

  async function fetchMessages() {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('id, name, code, message, created_at')
        .order('created_at', { ascending: false })
        .limit(20)

      if (error) throw error

      // Format to match frontend structure
      apiMessages.value = (data || []).map(msg => ({
        id: msg.id,
        message: msg.message,
        created_at: msg.created_at,
        guest_book: {
          name: msg.name,
          code: msg.code
        }
      }))
    } catch (e) {
      console.error('Failed to fetch messages:', e)
    }
  }

  async function checkRsvp() {
    if (!guestCode.value) return
    try {
      const { data, error } = await supabase
        .from('rsvp')
        .select('id')
        .eq('code', guestCode.value)
        .limit(1)

      if (error) throw error
      if (data && data.length > 0) {
        rsvpStatus.value = 'success'
      }
    } catch (e) {
      console.error('Failed to check RSVP:', e)
    }
  }

  async function submitRsvp(payload) {
    rsvpStatus.value = 'loading'
    try {
      // 1. Insert RSVP
      const { data: rsvpData, error: rsvpError } = await supabase
        .from('rsvp')
        .insert({
          code: guestCode.value || null,
          name: payload.name,
          phone: payload.phone || null,
          attendance: payload.attendance,
          guest_count: payload.attendance === 'ACCEPT' ? (payload.guest_count || 1) : 0,
          message: payload.message || null,
        })
        .select()
        .single()

      if (rsvpError) throw rsvpError

      // 2. If there's a message, also insert into messages table
      if (payload.message && payload.message.trim()) {
        const { error: msgError } = await supabase
          .from('messages')
          .insert({
            rsvp_id: rsvpData.id,
            name: payload.name,
            code: guestCode.value || null,
            message: payload.message.trim(),
          })

        if (msgError) console.error('Message insert error:', msgError)

        // Immediately add the new message to the local list (no socket needed)
        apiMessages.value.unshift({
          id: rsvpData.id,
          message: payload.message.trim(),
          created_at: new Date().toISOString(),
          guest_book: {
            name: payload.name,
            code: guestCode.value
          }
        })
      }

      rsvpStatus.value = 'success'
      return { success: true }
    } catch (e) {
      console.error('Failed to submit RSVP:', e)
      rsvpStatus.value = 'error'
      return { success: false, message: 'Terjadi kesalahan saat menyimpan data.' }
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
