<template>
        <el-col id="video_container" :span="24" align="center">
            <video id="vdo" :src="url" controls/>
            <el-row justify="space-evenly">
                <el-button  type="warning" @click="() => router.push('/upload')">继续上传</el-button>
                <el-button  type="primary" @click="download">下载视频</el-button>
            </el-row>
        </el-col>
</template>

<script lang="ts" setup>
import type { ImgsData, StyleType, vdoData } from "@/type";
import { ref, reactive, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const vdo = ref<vdoData>()
const url = ref<string>("")

onMounted(() => {
    vdo.value = JSON.parse(route.query.video as string)
    deCode()
})

const download = () => {
    downloadFile(url.value, vdo.value?.name as string)
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
    const byteCharacters = atob(vdo.value?.data as string); // 解码Base64字符串为原始二进制数据
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray]);
    url.value = URL.createObjectURL(blob);
}

</script>
<style lang="less">
#video_container {
    #vdo{
       height: 500px; 
    }
    
}
</style>