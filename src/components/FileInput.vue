<script setup>
import { ref } from 'vue';
import { humanFileSize } from '@/utils/file_size_utils';

const emit = defineEmits(['pass-data']);
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  existingFiles: {
    type: Array
  },
  accept: {
    type: String
  },
  maxFileLimit: {
    type: Number
  }
});

const files = ref(props.existingFiles || []);

function onFileChange(e) {
  var fileList = e.target.files || e.dataTransfer.files;

  if (!fileList.length) return;
  else if (props.maxFileLimit && fileList.length > props.maxFileLimit) {
    alert(`Max number of files is ${props.maxFileLimit}!`);
    return;
  }

  files.value = [];
  for (let i = 0; i < fileList.length; i++) {
    createFile(fileList[i]);
  }

  emit('pass-data', fileList);
}

/**
 * Function which checks whether file is an image or not.
 * Calls the createImage method on image files before adding to list.
 *
 * @param {*} file
 */
function createFile(file) {
  if (file.type.startsWith('image/')) {
    createImage(file);
  } else {
    files.value.push({ name: file.name, type: file.type, size: file.size });
  }
}

function createImage(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    files.value.push({
      name: file.name,
      type: file.type,
      size: file.size,
      url: e.target.result
    });
  };
  reader.readAsDataURL(file);
}

function removeFile(index) {
  files.value.splice(index, 1);
}
</script>

<template>
  <div class="max-w-xs bg-gray-100 rounded-lg hover:bg-gray-200 transition-all">
    <label class="block w-full p-6 text-center">
      <input
        type="file"
        :id="id"
        :name="id"
        multiple
        :accept="accept"
        class="hidden"
        @change="onFileChange"
      />
      Drag & Drop your files or
      <span class="underline">Browse</span>
    </label>

    <div v-if="files.length > 0" class="flex flex-col gap-4 px-4 pb-4">
      <div v-for="(file, index) in files" :key="index" class="rounded-lg shadow">
        <!-- Images -->
        <template v-if="file.url">
          <div class="relative">
            <div
              class="absolute top-0 right-0 left-0 flex flex-row p-2 bg-gradient-to-b from-primary-500 via-primary-500 to-transparent rounded-t-lg font-semibold text-sm text-white"
            >
              <div class="flex flex-col w-full truncate mr-2">
                <div class="truncate">{{ file.name }}</div>
                <div class="text-xs text-gray-300">
                  {{ humanFileSize(file.size) }}
                </div>
              </div>

              <div class="shrink-0">
                <button @click="removeFile(index)" class="w-7 h-7 bg-gray-800 rounded-full">
                  <i class="b bi-x text-lg text-white"></i>
                </button>
              </div>
            </div>

            <img :src="file.url" alt="File preview" class="max-w-full h-auto rounded-lg" />
          </div>
        </template>

        <!-- Files -->
        <template v-else>
          <div class="flex flex-row p-2 bg-primary-500 rounded-lg font-semibold text-sm text-white">
            <div class="flex flex-col w-full truncate mr-2">
              <div class="truncate">{{ file.name }}</div>
              <div class="text-xs">
                {{ humanFileSize(file.size) }}
              </div>
            </div>

            <div class="shrink-0">
              <button @click="removeFile(index)" class="w-7 h-7 bg-gray-800 rounded-full">
                <i class="b bi-x text-lg text-white"></i>
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
