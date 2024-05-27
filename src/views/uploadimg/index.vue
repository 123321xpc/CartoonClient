<template>
    <el-col :span="24" justify="center" 
    align="center" id="upload-img" 
    v-loading="loading"
    element-loading-text="正在转换中...">
        <el-upload
            list-type="picture-card"
            :auto-upload="false"
            :multiple="true"
            :drag="true"
            accept="image/jpeg,image/png,image/jpg"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="handleChange">
            <div class="iconfont icon-add"></div>
        </el-upload>
        <el-button type="primary" @click="handleUpload">点击开始转化</el-button>
    </el-col>

  <el-dialog v-model="dialogVisible">
    <img style="width: 100%;" :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>

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
import { request } from "@/utils/request";
import { ElMessage, type UploadProps } from 'element-plus'
import { type ImgsData, type StyleType } from "@/type";
import { useRouter } from "vue-router";

const loading = ref(false)
const formData = ref<FormData>(new FormData());
const router = useRouter()
const multipleChoose = ref(false)
const chooseTypeVisible = ref(false)
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const type = ref<StyleType>();

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const handleChange: UploadProps['onChange'] = (file, fileList) => {
  formData.value = new FormData();  // 清空formData避免重复添加
  fileList.forEach(fileItem => {
    if (!fileItem.raw) return;
    formData.value.append('file', fileItem.raw);
  });
  multipleChoose.value = fileList.length > 1;
}


const handleUpload =  async () => {
  if(formData.value.get('file') === null){
    ElMessage.warning('请选择图片');
    return;
  }

  if(multipleChoose.value && !type.value){
    chooseTypeVisible.value = true;
    return;
  }

  loading.value = true;
  const res = await request('/uploadimgs', 'post', formData.value);

  console.log(res.data);
  const imgList = new Array<ImgsData>();
  const data : [] = res.data as []
  data.forEach(item => imgList.push(JSON.parse(item)))
  
  console.log(imgList);
  
  router.push({ 
    path: '/imgs',
    query: { imgList: JSON.stringify(imgList) }
  });


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



</script>
<style lang="less">

@import 'https://at.alicdn.com/t/c/font_4554042_kn9h9wklzfi.css';

#upload-img {
    .el-button{
        margin-top: 30px;
        width: 200px;
        height: 50px;
        font-size: 15px;
    }


    .icon-add{
      transform: translateY(15px);  
    }

    .el-upload-dragger{
       height: 100%;
    }
}

#choose-type-dialog{
  .el-button{
    margin-top: 30px;
    height: 40px;
    width: 100px;
  }

  h1{
    margin-bottom: 30px;
  }
}
</style>