<template>
  <div class="achievements">

    <div class="container clearfix">
      <!-- title -->
      <div class="caption">
        等待炼丹结果
      </div>
      <!-- bg -->
      <div class="bg1"></div>
      <div class="bg2"></div>
      <!-- content -->
      <div class="content">
        <!-- 筛选 -->
        <div class="filter-criteria">
          <t-space direction="vertical">
            <t-space>
              <t-dropdown :options="functionOptions" trigger="click" @click="clickHandler">
                <t-space>
                  <t-button variant="text">
                    功能
                    <template #suffix> <t-icon name="chevron-down" size="16" /></template>
                  </t-button>
                </t-space>
              </t-dropdown>
              <t-dropdown :options="taskStatusOptions" trigger="click" @click="clickHandler">
                <t-space>
                  <t-button variant="text">
                    任务状态
                    <template #suffix> <t-icon name="chevron-down" size="16" /></template>
                  </t-button>
                </t-space>
              </t-dropdown>
              <t-dropdown :options="timeSortingOptions" trigger="click" @click="clickHandler">
                <t-space>
                  <t-button variant="text">
                    时间排序
                    <template #suffix> <t-icon name="chevron-down" size="16" /></template>
                  </t-button>
                </t-space>
              </t-dropdown>
            </t-space>
            <!-- 条件 -->
            <t-space class="tag-block">
              <t-tag v-for="(item,index) in conditionList" :key="index" theme="primary" closable @close="handleClose(index)">{{ item.name }}</t-tag>
            </t-space>
          </t-space>
        </div>
        <!-- 结果列表 -->
        <div class="result-list">
          <div class="result-list-item" v-for="(item, index) in resultList" :key="index">
            <div class="result-list-item__left">
              <img :src="item.img" alt="">
            </div>
            <div class="result-list-item__right">
              <div class="title">
                {{ item.title }}
              </div>
              <div class="info">
                {{ item.info }}
              </div>
              <div class="type">
                {{ item.type }}
              </div>
              <div class="time">
                {{ item.time }}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAssetsUrl } from '@/utils/getUrl';

const functionOptions = ref([
  { content: '操作一', value: 1 },
  { content: '操作二', value: 2 },
  { content: '操作三', value: 3 },
  { content: '操作四', value: 4 },
]);
const taskStatusOptions = ref([
  { content: '操作一', value: 1 },
  { content: '操作二', value: 2 },
  { content: '操作三', value: 3 },
  { content: '操作四', value: 4 },
]);
const timeSortingOptions = ref([
  { content: '操作一', value: 1 },
  { content: '操作二', value: 2 },
  { content: '操作三', value: 3 },
  { content: '操作四', value: 4 },
]);

const conditionList = ref([
  {
    id:1,
    name:'人台图'
  },
  {
    id:2,
    name:'已完成'
  },
  {
    id:3,
    name:'倒序'
  },
]);

const resultList = ref([
  {
    img: getAssetsUrl('img/result1.png'),
    title: '任务一',
    info: '黄/女/青年',
    type: '人台图',
    time: '2023-09-03 20:05'
  },
  {
    img: getAssetsUrl('img/result1.png'),
    title: '任务一',
    info: '黄/女/青年',
    type: '人台图',
    time: '2023-09-03 20:05'
  },
  {
    img: getAssetsUrl('img/result1.png'),
    title: '任务一',
    info: '黄/女/青年',
    type: '人台图',
    time: '2023-09-03 20:05'
  },
  {
    img: getAssetsUrl('img/result1.png'),
    title: '任务一',
    info: '黄/女/青年',
    type: '人台图',
    time: '2023-09-03 20:05'
  },
])

const clickHandler = (data: any) => {
  console.log(data);
  conditionList.value.push({
    id:data.value,
    name:data.content
  })
};

const handleClose = (index:number) => {
  console.log(index);
  conditionList.value.splice(index, 1);
};

</script>

<style lang="scss" scoped>
.clearfix::before,
.clearfix::after {
  content: '';
  display: table;
  clear: both;
}

.achievements {
  height: 100vh;
  min-height: 900px;
  min-width: 1440px;
  display: flex;
  justify-content: center;

  .container {
    // width: 1440px;
    width: 100%;
    // height: 100%;
    padding: 0 38px;
    position: relative;

    .caption {
      color: #745F9A;
      margin: 33px 0 0 20px;
    }

    .bg1 {
      background-image: url("@/assets/img/achievements-bg1.png");
      background-repeat: no-repeat;
      width: 844px;
      height: 745px;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 1;
    }

    .bg2 {
      background-image: url("@/assets/img/achievements-bg2.png");
      background-repeat: no-repeat;
      width: 528px;
      height: 505px;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 1;
    }


    .content {
      width: 100%;
      margin: 39px 0 0 0;
      position: relative;
      z-index: 2;

      .filter-criteria {
        .tag-block{
          .t-tag{
            background-color: #9E81BE;
            color: #FFFFFF;
          }
        }
      }

    }
  }
}

.result-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 38px;

  &-item {
    width: 406px;
    height: 215px;
    box-sizing: border-box;
    border-radius: 20px;
    margin: 20px 24px;
    padding: 0 12px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.24);
    display: flex;
    align-items: center;

    &__left {
      width: 224px;
      height: 195px;
      border-radius: 20px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    &__right {
      width: 147px;
      height: 164px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title {
        flex: 1;
        font-size: 18px;
      }

      .info,
      .type,
      .time {
        margin-bottom: 14px;
        font-size: 15px;
      }
    }
  }
}
</style>