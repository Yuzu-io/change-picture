<template>
  <div class="dressing">
    <Menu></Menu>

    <UploadImg></UploadImg>

    <ProcessPictures></ProcessPictures>
  </div>
</template>

<script setup lang="ts">
import Menu from "@/components/Menu/index.vue";
import UploadImg from '@/components/UploadImg/index.vue';
import ProcessPictures from '@/components/ProcessPictures/index.vue';
</script>

<style lang="scss" scoped>
.dressing {
  background-color: #ECEFF5;
  height: 100vh;
}
</style>
