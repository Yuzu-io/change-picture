<template>
  <div class="cutout">
    <div class="container clearfix">
      <!-- title -->
      <div class="caption">
        <div class="header">
          选择要保留的部分
        </div>

        <div class="toolbar">
          <div class="tools">
            <t-button theme="default" variant="text">重做</t-button>
            <t-button theme="default" variant="text">撤销</t-button>
          </div>
          <!-- <t-button class="next-btn" theme="default" variant="outline">
            <template #icon>
              <ImageAddIcon />
            </template>
            完成
          </t-button> -->
          <img class="next-btn" src="@/assets/img/arrow.png" alt="">
        </div>
      </div>


      <!-- content -->
      <div class="content">
        <div class="original-image-area">
          <canvas ref="canvas" id="canvas" @click="handleCanvasClick" @mousemove="handleCanvasMove"></canvas>
          <img class="mask-img" :src="currentImageData?.src" :width="currentImageData?.width"
            :height="currentImageData?.height">
          <img class="mask-img" :src="imageData?.src" :width="imageData?.width" :height="imageData?.height">
        </div>
        <div class="cutout-area">
          <img class="show-img" :src="imagePath" alt="" width="655.35"
            :style="{ '-webkit-mask-image': `url(${imageData?.src})` }">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAssetsUrl } from '@/utils/getUrl';
import debounce from '@/utils/debounce';
import type { modelInputProps } from '@/types/model';
import { modelData } from '@/helpers/onnxModelAPI';
import { InferenceSession, Tensor } from 'onnxruntime-web';
import { onnxMaskToImage } from '@/helpers/maskUtils';
// @ts-ignore
import npyjs from "npyjs";

const canvas = ref<HTMLCanvasElement>()
const ctx = ref<CanvasRenderingContext2D>(canvas.value?.getContext("2d") as CanvasRenderingContext2D)

const imagePath = ref<string>(getAssetsUrl('data/dogs.jpg'))
const imageEmbedding = ref<string>(getAssetsUrl('data/dogs_embedding.npy'))
const modelDir = '/model/sam_onnx_quantized_example.onnx'

// 记录信息
type DataType = "float32"
const dataType: DataType = "float32"
let tensorInfo = {};
let modelInfo = {};
let clicks: Array<modelInputProps> = []
let modelScale = {
  width: 0,
  height: 0,
  samScale: 0
};
const imageInfo = ref<HTMLImageElement>()

let imageData = ref<HTMLImageElement>()
let maskImgList = ref<HTMLImageElement[]>([])

let currentImageData = ref<HTMLImageElement>()
let currentClicks: Array<modelInputProps> = []


onMounted(() => {
  init()
})

// 初始化
const init = async () => {
  ctx.value = canvas.value!.getContext("2d") as CanvasRenderingContext2D
  let img = new Image()
  img.src = imagePath.value

  img.onload = () => {
    let proportion = img.height / img.width;
    let width = 655.35;
    let height = width * proportion;
    canvas.value!.width = width;
    canvas.value!.height = height

    const samScale = 1024 / Math.max(height, width)
    modelScale.width = width
    modelScale.height = height
    modelScale.samScale = samScale

    imageInfo.value = img

    ctx.value.drawImage(img, 0, 0, width, height)
  }

  // 初始化onnx模型
  const model = await InferenceSession.create(modelDir)
  modelInfo = model

  Promise.resolve(loadNpyTensor(imageEmbedding.value, dataType)).then(
    (embedding) => tensorInfo = embedding
  )

  runONNX()
}

const handleCanvasClick = (e: MouseEvent) => {
  const x = e.offsetX;
  const y = e.offsetY;

  clicks = [{ x, y, clickType: 1 }]

  runONNX()
}

const handleCanvasMove = (e: MouseEvent) => {
  const x = e.offsetX;
  const y = e.offsetY;

  currentClicks = [{ x, y, clickType: 1 }]

  debounce(async () => {
    const currentFeeds = modelData({
      clicks: currentClicks,
      tensor: tensorInfo as Tensor,
      modelScale,
    });
    if (currentFeeds === undefined) return;

    const model = modelInfo as InferenceSession;
    const currentResults = await model.run(currentFeeds);
    const currentOutput = currentResults[model.outputNames[0]];
    currentImageData.value = onnxMaskToImage(currentOutput.data, currentOutput.dims[2], currentOutput.dims[3]);
  }, 15)


}

// 运行ONNX模型
const runONNX = async () => {
  if (
    modelInfo === null ||
    clicks === null ||
    tensorInfo === null ||
    modelScale === null ||
    currentClicks === null
  ) {
    return;
  } else {
    const feeds = modelData({
      clicks,
      tensor: tensorInfo as Tensor,
      modelScale,
    });
    if (feeds === undefined) return;

    const model = modelInfo as InferenceSession;
    const results = await model.run(feeds);
    const output = results[model.outputNames[0]];



    maskImgList.value?.push(onnxMaskToImage(output.data, output.dims[2], output.dims[3]));
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // 合并图片
    let arrPromise: Array<Promise<unknown>> = []
    maskImgList.value.forEach(async (item) => {
      let image = new Image()
      image.src = item.src
      image.width = item.width
      image.height = item.height
      canvas.width = item.width
      canvas.height = item.height
      let promise = new Promise((resolve) => {
        image.onload = async function () {
          ctx!.drawImage(item, 0, 0);
          resolve(0)
        }
      })
      arrPromise.push(promise)
    })

    await Promise.all(arrPromise)
    const image = new Image();
    image.src = canvas.toDataURL('image/png');
    imageData.value = image
  }
}

// 将Numpy文件解码为张量。
const loadNpyTensor = async (tensorFile: string, dType: DataType) => {
  let npLoader = new npyjs();
  const npArray = await npLoader.load(tensorFile);
  const tensor = new Tensor(dType, npArray.data, npArray.shape);
  return tensor;
};
</script>

<style lang="scss" scoped>
.clearfix::before,
.clearfix::after {
  content: '';
  display: table;
  clear: both;
}

.cutout {
  height: 100vh;
  display: flex;
  justify-content: center;

  .container {
    width: 1440px;
    height: 100%;
    position: relative;

    .caption {
      margin: 33px 20px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .header {
        color: #745F9A;
      }
    }

    // 工具栏
    .toolbar {
      display: flex;
      align-items: center;

      .tools{
        margin: 0 50px 0 0;
      }

      .next-btn {
        width: 50px;
        height: 50px;
        // width: 80px;
        // height: 40px;
        border-radius: 35.5px;
        background-color: rgba(185, 177, 255, 0.5);
        color: #B9ABD2;
        border: none;
      }
    }

    .content {
      width: 100%;
      height: 785px;
      position: absolute;
      top: 103px;
      left: 0;
      right: 0;
      z-index: 2;
      display: flex;
      justify-content: space-between;
      padding: 0 28px;
      box-sizing: border-box;

      .original-image-area,
      .cutout-area {
        width: 655.35px;
        height: 785px;
        border-radius: 10px;
        box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.24);

        display: flex;
        align-items: center;
        justify-content: center;
      }

      .original-image-area {
        .mask-img {
          position: absolute;
          opacity: 0.4;
          pointer-events: none;
        }
      }

      .cutout-area {
        background: linear-gradient(45deg,
            rgba(0, 0, 0, 0.3) 25%,
            transparent 25%,
            transparent 75%,
            rgba(0, 0, 0, 0.3) 75%,
            rgba(0, 0, 0, 0.3) 100%),
          linear-gradient(45deg,
            rgba(0, 0, 0, 0.3) 25%,
            transparent 25%,
            transparent 75%,
            rgba(0, 0, 0, 0.3) 75%,
            rgba(0, 0, 0, 0.3) 100%);
        /* 背景大小必须小于盒子的大小 */
        background-size: 20px 20px;
        /* 第二种渐变的偏移必须为为背景大小的一半 */
        background-position: 0 0, 10px 10px;
      }
    }
  }
}
</style>