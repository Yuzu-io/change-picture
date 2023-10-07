<template>
  <div class="home">

    <div class="container clearfix">
      <!-- title -->
      <div class="caption">
        AI 魔法类型
      </div>
      <!-- bg -->
      <div class="bg1"></div>
      <div class="bg2"></div>
      <!-- content -->
      <div class="content">
        <div class="list">
          <div class="list-item" v-for="(item, index) in list" :key="index">
            <img class="img" :src="item.img" alt="">
            <div class="title">
              {{ item.title }}
            </div>
            <div class="text">
              {{ item.text }}
            </div>
            <div class="operate">
              <t-button class="upload-photos" theme="default" variant="outline">
                <template #icon>
                  <ImageAddIcon />
                </template>
                上传照片
              </t-button>
              <t-button class="go-to" theme="default">
                <template #icon>
                  <ArrowRightIcon />
                </template>
              </t-button>
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
import { ImageAddIcon, ArrowRightIcon } from 'tdesign-icons-vue-next';

const list = ref([
  {
    img: getAssetsUrl('img/figure-of-mannequin.png'),
    title: '人台图',
    text: '用服装穿到人台上的照片，制作符合品牌调性的各类型真人模特展示服装的照片。',
  },
  {
    img: getAssetsUrl('img/model-picture.png'),
    title: '模特图',
    text: '用真人穿衣拍摄的照片，制作适合世界各地市场的拍摄场景和模特类型的照片。',
  },
  {
    img: getAssetsUrl('img/product-picture.png'),
    title: '商品图',
    text: '用商品图的照片，制作商业摄影效果的产品主图。',
  },
])
</script>

<style lang="scss" scoped>
.clearfix::before,
.clearfix::after {
  content: '';
  display: table;
  clear: both;
}

.home {
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

    .bg1 {
      background-image: url("@/assets/img/home-bg1.png");
      background-repeat: no-repeat;
      width: 198.37px;
      height: 200px;
      position: absolute;
      left: 277px;
      top: 61px;
      z-index: 1;
    }

    .bg2 {
      background-image: url("@/assets/img/home-bg2.png");
      background-repeat: no-repeat;
      width: 782px;
      height: 630px;
      position: absolute;
      left: 545px;
      top: 0;
      z-index: 1;
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

.list {
  width: 1350px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-item {
    width: 390px;
    height: 548px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 0;
    background-color: #FFFFFF;
    border-radius: 12.63px;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.24);

    .img {
      width: 358px;
      height: 315px;
    }

    .title {
      font-size: 36px;
      color: #9E81BE;
      margin: 45px 25px 0;
      align-self: flex-start;
    }

    .text {
      width: 100%;
      box-sizing: border-box;
      font-size: 14px;
      padding: 15px 25px 0;
      color: #757575;
    }

    .operate {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      padding: 45px 25px 0;

      .upload-photos {
        width: 248px;
        height: 50.23px;
        border-radius: 35.5px;
        background-color: rgba(185, 177, 255, 0.5);
        color: #B9ABD2;
        border: none;
      }

      .go-to{
        width: 71px;
        height: 50.23px;
        border-radius: 10px;
        background-color: #9E81BE;
        color: #745F9A;
      }
    }
  }
}
</style>