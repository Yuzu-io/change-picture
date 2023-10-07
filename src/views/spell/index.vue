<template>
  <div class="spell">

    <div class="container clearfix">
      <!-- title -->
      <div class="caption">
        AI 魔法咒语配置
      </div>
      <!-- content -->
      <div class="content">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAssetsUrl } from '@/utils/getUrl';

</script>

<style lang="scss" scoped>
.clearfix::before,
.clearfix::after {
  content: '';
  display: table;
  clear: both;
}

.spell {
  height: 100vh;
  display: flex;
  justify-content: center;

  .container {
    width: 1440px;
    height: 100%;
    position: relative;

    .caption {
      color: #745F9A;
      margin: 33px 0 0 20px;
    }


    .content {
      width: 100%;
      height: 548px;
      position: absolute;
      top: 303px;
      left: 0;
      right: 0;
      z-index: 2;
      display: flex;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

</style>