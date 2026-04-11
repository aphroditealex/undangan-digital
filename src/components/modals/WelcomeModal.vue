<template>
  <div class="welcome-modal">
    <h2 class="welcome-title">{{ uiText.title }}</h2>
    <p class="welcome-intro">{{ uiText.intro_text }}</p>

    <div class="welcome-items">
      <div
        v-for="item in store.decorations"
        :key="item.id"
        class="welcome-item"
        @click="openItem(item.modal_type)"
      >
        <div class="welcome-item-icon">
          <img :src="item.image_url" :alt="item.name" />
        </div>
        <div class="welcome-item-info">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useInvitationStore } from "@/stores/invitation";

const store = useInvitationStore();
const uiText = computed(() => store.uiText?.welcome || {});

function openItem(modalType) {
  store.openModal(modalType);
}
</script>

<style scoped>
.welcome-modal {
  text-align: center;
}

.welcome-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--space-md);
}

.welcome-intro {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--color-text-light);
  line-height: 1.6;
  margin-bottom: var(--space-xl);
}

.welcome-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.welcome-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md);
  background: var(--color-rose-light);
  border: 1px solid var(--color-rose-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
}

.welcome-item:hover {
  transform: translateX(4px);
  box-shadow: var(--shadow-sm);
}

.welcome-item-icon {
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  overflow: hidden;
  /* border: 2px solid var(--color-rose-border); */
}

.welcome-item-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.welcome-item-info h3 {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 2px;
}

.welcome-item-info p {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--color-text-light);
  line-height: 1.4;
}
</style>
