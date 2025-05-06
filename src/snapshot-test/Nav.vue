<template>
  <div>
    {{ title }}
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  title: string;
}>(), {
  title: ''
});
</script>
