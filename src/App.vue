<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, readonly, ref } from 'vue'
import dayjs from 'dayjs'
import { usePexelsQuery } from '@/queries'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

const { VITE_HW_DATE } = import.meta.env
const departureDate = readonly(ref(dayjs(VITE_HW_DATE, 'YYYY-MM-DD')))
const interval = ref<number | undefined>(undefined)
const now = ref(dayjs())
const diff = computed(() => departureDate.value.diff(now.value))
const days = computed(() => Math.floor(diff.value / (1000 * 60 * 60 * 24)))
const hours = computed(() => Math.floor((diff.value / (1000 * 60 * 60)) % 24))
const minutes = computed(() => Math.floor((diff.value / (1000 * 60)) % 60))
const seconds = computed(() => Math.floor((diff.value / 1000) % 60))

onMounted(() => {
  interval.value = setInterval(() => {
    now.value = dayjs()
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(interval.value)
})

const { data: imageUrl } = usePexelsQuery()

const backgroundImage = computed(() => `url(${imageUrl.value})`)
</script>

<template>
  <div
    class="absolute opacity-10 left-0 top-0 w-screen h-screen bg-cover"
    v-if="imageUrl"
    :style="{ backgroundImage }"
  />
  <div class="flex flex-col items-center gap-4 sm:gap-6 p-2">
    <h1 class="text-3xl sm:text-5xl font-bold">HW XX(L) Countdown</h1>
    <div class="flex justify-between gap-4 sm:gap-6 w-full max-w-2xl">
      <div class="flex flex-col items-center gap-4">
        <span class="font-mono text-6xl sm:text-8xl">{{ days }}</span>
        <span class="text-xl sm:text-3xl">dagen</span>
      </div>
      <div class="flex flex-col items-center gap-4 sm:gap-6">
        <span class="font-mono text-6xl sm:text-8xl">{{ hours }}</span>
        <span class="text-xl sm:text-3xl">uren</span>
      </div>
      <div class="flex flex-col items-center gap-4 sm:gap-6">
        <span class="font-mono text-6xl sm:text-8xl">{{ minutes }}</span>
        <span class="text-xl sm:text-3xl">minuten</span>
      </div>
      <div class="flex flex-col items-center gap-4 sm:gap-6">
        <span class="font-mono text-6xl sm:text-8xl">{{ seconds }}</span>
        <span class="text-xl sm:text-3xl">seconden</span>
      </div>
    </div>
  </div>
  <VueQueryDevtools />
</template>

<style scoped></style>
