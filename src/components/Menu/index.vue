<template>
  <div class="menu">
    <t-menu collapsed>
      <t-menu-item value="0">
        <template #icon>
          <t-icon name="app" />
        </template>
        仪表盘
      </t-menu-item>

      <t-menu-item value="1">
        <template #icon>
          <t-icon name="image-edit" />
        </template>
        <span>人台图</span>
      </t-menu-item>
    </t-menu>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.menu {
  width: 64px;
  padding: 10px;
}
</style>