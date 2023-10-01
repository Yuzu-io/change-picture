<template>
  <div class="process-pictures">
    <img :src="imageInfo?.src" :width="imageInfo?.width" :height="imageInfo?.height" @mousemove="handleMouseMove" @click="handleMouseClick">
    <img class="mask-img" :src="maskImg?.src" :width="maskImg?.width" :height="maskImg?.height">

  </div>
</template>

<script setup lang="ts">
import { getAssetsUrl } from '@/utils/getUrl';
import { InferenceSession, Tensor } from 'onnxruntime-web';
import { onMounted, ref } from 'vue';
import { handleImageScale } from '@/helpers/scaleHelper';
// @ts-ignore
import npyjs from "npyjs";
import { type modelInputProps } from '@/types/model';
import { modelData } from '@/helpers/onnxModelAPI';
import { onnxMaskToImage } from '@/helpers/maskUtils';

import debounce from '@/utils/debounce';

const imagePath = getAssetsUrl('data/dogs.jpg')
const imageEmbedding = getAssetsUrl('data/dogs_embedding.npy')
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
let maskImg = ref<HTMLImageElement>()

// 初始化onnx模型
const initModel = async () => {
  const model = await InferenceSession.create(modelDir)
  modelInfo = model
}

// 加载图像
const loadImage = (url: string) => {
  const img = new Image();
  img.src = url;
  img.onload = () => {
    const { width, height, samScale } = handleImageScale(img);
    modelScale.width = width
    modelScale.height = height
    modelScale.samScale = samScale

    img.width = width
    img.height = height
    imageInfo.value = img

  }
}

// 将Numpy文件解码为张量。
const loadNpyTensor = async (tensorFile: string, dType: DataType) => {
  let npLoader = new npyjs();
  const npArray = await npLoader.load(tensorFile);
  const tensor = new Tensor(dType, npArray.data, npArray.shape);
  return tensor;
};

// 运行ONNX模型
const runONNX = async () => {
  if (
    modelInfo === null ||
    clicks === null ||
    tensorInfo === null ||
    modelScale === null
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

    maskImg.value = onnxMaskToImage(output.data, output.dims[2], output.dims[3])

  }

}


// 
const handleMouseMove = (e: MouseEvent) => {
  // const imageScale = imageInfo.value ? imageInfo.value.width / (e.target as HTMLImageElement).offsetWidth : 1
  // let x = e.offsetX * imageScale
  // let y = e.offsetY * imageScale

  // // clicks = [{ x, y, clickType: 1 }]
  // clicks[0] = { x, y, clickType: 1 }

  
  // debounce(runONNX,15)
}

const handleMouseClick = (e:MouseEvent)=>{
  const imageScale = imageInfo.value ? imageInfo.value.width / (e.target as HTMLImageElement).offsetWidth : 1
  let x = e.offsetX * imageScale
  let y = e.offsetY * imageScale

  clicks.push({ x, y, clickType: 1 })
  runONNX()
}

onMounted(() => {
  initModel()
  loadImage(imagePath)

  Promise.resolve(loadNpyTensor(imageEmbedding, dataType)).then(
    (embedding) => tensorInfo = embedding
  )

  runONNX()
})


</script>

<style lang="scss" scoped>
.process-pictures {
  position: relative;
  width: 90%;
  height: 90%;

  .mask-img {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.4;
    pointer-events: none;
  }
}
</style>