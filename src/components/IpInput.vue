<script setup lang="ts">
  import { computed } from 'vue';
  import { IpValidationRegexp, ErrorMessages } from '@/utils/constants';
  import CountryInfo from '@/components/CountryInfo.vue';

  const props = defineProps({
    label: {
      type: Number,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    countryCode: {
      type: String,
      default: '',
    },
    timezone: {
      type: String,
      default: '',
    },
  });

  const emit = defineEmits(['update:value', 'update:error', 'blur']);

  const localValue = computed({
    get() {
      return props.value;
    },

    set(newValue) {
      emit('update:value', newValue);
    },
  });

  const isIpInvalid = computed(() => {
    return !IpValidationRegexp.test(localValue.value) && localValue.value.trim();
  });

  const localError = computed(() => {
    if (isIpInvalid.value) {
      const error = ErrorMessages.INVALID_IP;
      emit('update:error', error);
      return error;
    } else {
      emit('update:error', '');
      return '';
    }
  });

  const inputClasses = computed(() => ({
    'border-red-500': localError.value || props.errorMessage,
    'border-gray-300': !localError.value && !props.errorMessage,
  }));
</script>

<template>
  <div class="flex flex-col items-start w-full mb-4">
    <div class="flex w-full items-start">
      <div class="w-8 flex-shrink-0 bg-gray-300 rounded-full text-black text-center px-2 py-1">{{ label }}</div>
      <div class="flex-grow flex flex-col ml-2">
        <div class="flex items-center">
          <input 
            v-model="localValue"
            :class="['flex-grow border rounded px-2 py-1', inputClasses]"
            :disabled="isLoading"
            :placeholder="placeholder"
            @blur="() => emit('blur')"
          />
          <div class="flex-shrink-0 ml-2 w-24">
            <CountryInfo
              v-show="!errorMessage"
              :countryCode="countryCode"
              :isLoading="isLoading"
              :timezone="timezone"
            />
          </div>
        </div>
        <div v-if="localError || errorMessage" class="text-red-500 mt-1">{{ localError || errorMessage }}</div>
      </div>
    </div>
  </div>
</template>
