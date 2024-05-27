<template>
    <el-col id="home">
        <el-row :span="24" justify="center">
            <h1>基于DCT-Net技术的视频，图像风格化</h1>
        </el-row>
        <el-row justify="space-between" id="imgs">
            <el-col :span="4" align="middle">
                <img src="@/assets/home/3d.png" alt="">
                <div>3d风</div>
            </el-col>
            <el-col :span="4" align="middle">
                <img src="@/assets/home/anime.png" alt="">
                <div>日漫风</div>
            </el-col>
            <el-col :span="4" align="middle">
                <img src="@/assets/home/artstyle.png" alt="">
                <div>艺术风</div>
            </el-col>
            <el-col :span="4" align="middle">
                <img src="@/assets/home/handdrawn.png" alt="">
                <div>手绘风</div>
            </el-col>
            <el-col :span="4" align="middle">
                <img src="@/assets/home/sketch.png" alt="">
                <div>素描风</div>
            </el-col>
        </el-row>
        <el-row :span="24" justify="center">
            <el-button type="primary" @click="toUpload">点击开始体验</el-button>
        </el-row>
    </el-col>
    
        
  </template>

<script lang="ts" setup>
import { ref, reactive } from "vue"
import { ElMessage } from "element-plus"
import { useRouter } from "vue-router";

const router = useRouter();

const toUpload = () => {
    router.push('/upload');
}

</script>
<style lang="less">
#home{

    h1{
        margin-bottom: 140px;
    }

    img{
        width: 220px;
    }

    #imgs{
        transform: translateY(-100px);

        div{
            font-weight: bold;
            font-size: 20px;
        }
    }

    .el-button{
        transform: translateY(-30px);
        width: 400px;
        height: 50px;
        font-size: 20px;
    }
}


</style>