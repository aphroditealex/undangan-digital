<template>
  <div class="music-player">
    <audio ref="audioRef" loop preload="auto"></audio>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useInvitationStore } from '@/stores/invitation'

const store = useInvitationStore()
const audioRef = ref(null)

onMounted(() => {
  if (audioRef.value) {
    // Use absolute URL path so Vite doesn't try to resolve it as module import
    audioRef.value.src = '/assets/music/wedding-song.mp3'
  }
})

watch(() => store.isMusicPlaying, (playing) => {
  if (!audioRef.value) return
  if (playing) {
    audioRef.value.volume = 0.4
    audioRef.value.play().catch(() => {
      // Autoplay blocked — will retry on next user interaction
      store.isMusicPlaying = false
    })
  } else {
    audioRef.value.pause()
  }
})
</script>

<style scoped>
.music-player {
  position: fixed;
  pointer-events: none;
  opacity: 0;
  width: 0;
  height: 0;
}
</style>
