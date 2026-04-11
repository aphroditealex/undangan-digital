import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockInvitationData } from '@/data/mockData'

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

  // Computed
  const groomData = computed(() => invitation.value?.groom || {})
  const brideData = computed(() => invitation.value?.bride || {})
  const events = computed(() => invitation.value?.events || [])
  const gallery = computed(() => invitation.value?.gallery || [])
  const loveStory = computed(() => invitation.value?.love_story || [])
  const dresscode = computed(() => invitation.value?.dresscode || [])
  const gifts = computed(() => invitation.value?.gifts || [])
  const messages = computed(() => invitation.value?.messages || [])
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
  }
})
