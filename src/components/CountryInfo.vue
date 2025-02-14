<script setup lang="ts">
  import { ref, onMounted, onUnmounted, computed } from 'vue';
  import moment from 'moment-timezone';
  import { TimeFormat, INTERVAL_TIME } from '@/utils/constants';

  const props = defineProps({
    countryCode: { 
      type: String,
      required: true,
    },
    timezone: {
      type: String,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    }
  });

  const localTime = ref('');

  const updateLocalTime = () => {
    if (props.timezone) {
      localTime.value = moment().tz(props.timezone).format(TimeFormat);
    } else {
      localTime.value = moment().format(TimeFormat);
    }
  };

  const flagSrc = computed(() => {
    return `https://flagcdn.com/16x12/${props.countryCode.toLowerCase()}.png`;
  });

  onMounted(() => {
    updateLocalTime();
    const interval = setInterval(updateLocalTime, INTERVAL_TIME);
    onUnmounted(() => clearInterval(interval));
  });
</script>

<template>
  <div class="flex items-center">
    <div v-if="isLoading" class="spinner" />
    <div v-else class="flex items-center">
      <div class="w-4 h-3 flex items-center justify-center">
        <img
          v-show="!!countryCode"
          :src="flagSrc" 
          :alt="countryCode" 
          class="w-4 h-3"
        />
      </div>
      <div class="w-20 flex items-center justify-center">
        <div 
          v-show="!!timezone"
          class="text-gray-500"
        >
          {{ localTime }}
        </div>
      </div>
    </div>
  </div>
</template>
