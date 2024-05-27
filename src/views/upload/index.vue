<template>
    <el-row :span="20" justify="space-around" id="upload">
        <el-button type="primary" @click="() => router.push('/uploadimg')">上传图片</el-button>
        <el-button type="primary" @click="() => router.push('/uploadvdo')">上传视频</el-button>
    </el-row>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();


</script>
<style lang="less">
#upload{
    .el-button{
        width: 200px;
        height: 50px;
    }
}
</style>