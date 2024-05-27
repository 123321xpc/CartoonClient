<template>
  <el-col :span="24" justify="center" 
    align="center" v-loading="loading"
    element-loading-text="正在转换中...">
    <el-upload
      ref="upload"
      class="upload-demo"
      :limit="1"
      :on-change="handleChange"
      :on-exceed="handleExceed"
      :auto-upload="false"
      accept="video/*">
        <template #trigger>
          <el-button type="default">选择文件</el-button>
        </template>
    </el-upload>
    <el-button v-if="uploadOK" type="primary" @click="handleUpload">上传文件</el-button>
  </el-col>

  
  <el-dialog v-model="chooseTypeVisible" width="35%" id="choose-type-dialog">
    <el-col align="center">
      <h1>请选择转化风格</h1>
      <el-radio-group v-model="type" >
        <el-radio value="3d" size="large">3D</el-radio>
        <el-radio value="anime" size="large">日漫风</el-radio>
        <el-radio value="sketch" size="large">素描风</el-radio>
        <el-radio value="handdrawn" size="large">手绘风</el-radio>
        <el-radio value="artstyle" size="large">艺术风</el-radio>
      </el-radio-group>
      <el-button type="primary" @click="checkType">确定</el-button>
    </el-col>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue"
import { genFileId } from 'element-plus'
import { request } from "@/utils/request";
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import type { ImgsData, StyleType } from "@/type";

const router = useRouter();
const type = ref<StyleType>();
const chooseTypeVisible = ref(false)
const loading = ref(false)
const uploadOK = ref(false)
const upload = ref<UploadInstance>()
const formData = ref<FormData>(new FormData());

const handleUpload =  async () => {

  if(!type.value) {
    chooseTypeVisible.value = true;
    return;
  }

  loading.value = true;
  try{
    const res = await request('/uploadvdo', 'post', formData.value); 
    router.push({ 
      path: '/vdo', 
      query: { video: res.data as string } 
    });

  }finally{
    loading.value = false;
  }

}

const checkType = () => {
  if(type.value){
    formData.value.append('type', type.value);
    chooseTypeVisible.value = false;
    handleUpload();
  }
    
  else
    ElMessage.warning('请选择转化风格');
}

const handleChange: UploadProps['onChange'] = (file, fileList) => {
  console.log(file, fileList);
  
  formData.value = new FormData();  // 清空formData避免重复添加
  formData.value.append('file', file.raw as File);
  uploadOK.value = true
}

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

</script>
<style lang="less">
</style>