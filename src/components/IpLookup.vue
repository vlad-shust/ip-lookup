<script setup lang="ts">
import { ref } from 'vue';
import { getIpData } from '@/api/ipService';
import { defaultIpEntity } from '@/utils/ipUtils';
import { Translations } from '@/utils/constants';
import { IpEntry } from '@/types/IpEntity';
import IpInput from '@/components/IpInput.vue';

const ipList = ref<IpEntry[]>([{ ...defaultIpEntity }]);

const addIpEntry = () => {
  const label = ipList.value.length + 1;
  const newIpEntry = { ...defaultIpEntity, label };
  ipList.value.push(newIpEntry);
};

const submitIp = async (ipEntity: IpEntry) => {
  if (ipEntity.error) return;
  ipEntity.isLoading = true;

  try {
    const response = await getIpData(ipEntity.ip);
    Object.assign(ipEntity, response);
  } catch (error: any) {
    ipEntity.error = error.message;
    console.error(error);
  } finally {
    ipEntity.isLoading = false;
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-100 to-blue-200">
    <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
      <p class="text-lg font-semibold mb-4">{{ Translations.EN.DESCRIPTION }}</p>
      <button class="bg-blue-500 text-white px-4 py-2 rounded mb-4" @click="addIpEntry">+ {{ Translations.EN.ADD_BUTTON_LABEL }}</button>
      <hr class="border-gray-300 mb-4">
      <div class="overflow-y-auto h-96 bg-gray-100 rounded-lg p-4 shadow-inner">
        <div v-for="ip in ipList" :key="ip.label" class="flex flex-col items-center mb-4 w-full">
          <div class="flex items-center w-full">
            <IpInput
              v-model:value="ip.ip"
              :label="ip.label"
              :isLoading="ip.isLoading"
              :errorMessage="ip.error"
              :timezone="ip.timezone"
              :countryCode="ip.country"
              :placeholder=" Translations.EN.INPUT_PLACEHOLDER"
              @blur="submitIp(ip)"
              @update:error="ip.error = $event"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
