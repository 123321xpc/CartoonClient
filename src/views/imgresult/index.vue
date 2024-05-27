<template>
    <div id="img-result">
        <el-row >
            <el-col :span="8" v-for="(img, index) in imgList" :key="index" align="center">
                <h3>{{ typeTrans(img.type) }}</h3>
                <img :src="img.data"/>
                <el-button class="choose-btn" type="default" @click="chooseDownload(img)">下载图片</el-button>
            </el-col>
        </el-row>
        <el-row justify="space-around" :span="24">
            <el-button type="warning" @click="() => router.push('/upload')">继续上传</el-button>
            <el-button type="primary" @click="downloadAll">下载全部</el-button>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import type { ImgsData, StyleType } from "@/type";
import { ref, reactive, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const imgList = ref<ImgsData[]>([])


onMounted(() => {
    imgList.value = JSON.parse(route.query.imgList as string);
    deCode()
})

const downloadAll = () => {
    imgList.value.forEach(img => {
        downloadFile(img.data, img.name)
    })
}

const chooseDownload = (img : ImgsData) => {
    downloadFile(img.data, img.name)
}

const downloadFile = (url : string, fileName : string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

const deCode = () => {
    imgList.value.forEach(img => {
        const byteCharacters = atob(img.data as string); // 解码Base64字符串为原始二进制数据
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray]);
        img.data = URL.createObjectURL(blob);
    })
}

const typeTrans = (type : StyleType) => {
    switch (type) {
        case '3d':
            return '3D'
        case 'anime':
            return '动漫'
        case 'artstyle':
            return '艺术风'
        case 'handdrawn':
            return '手绘风'
        case 'sketch':
            return '素描风'
        case 'origin':
            return '原图'
        default:
            return '未知风格'
    }
}

</script>
<style lang="less">
#img-result {
    img{
        width: 370px;
    }

    .el-button{
        width: 130px;
        height: 40px;
    }

    .choose-btn{
        height: 40px;
    }
    
}
</style>