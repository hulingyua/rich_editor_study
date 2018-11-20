<template>
    <div>
        <el-upload
            name="img"
            class="avatar-uploader"
            :action="serverUrl"
            :headers="header"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeUpload">
        </el-upload>
        <quill-editor v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @change="onEditorChange($event)">
        </quill-editor>
        <button @click="saveContent">保存</button>
    </div>

</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import Quill from 'quill'
const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction

        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],

        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],
        ['link', 'image']
    ];
export default {
    data () {
        return {
            content: '',
            serverUrl: 'https://newuapi.keking.cn:8034/manage/message/uploadFile',
            header: {"token":'04c04aea1ac7f24feca8822b90880827-hulingyu'},
            editorOption: {
                placeholder: '请输入内容',
                theme: 'snow',  // or 'bubble'
                modules: {
                    toolbar: {
                        container: toolbarOptions,
                        handlers: {
                            'image': function (value) {
                                if (value) {
                                    document.querySelector('.avatar-uploader input').click()
                                }
                                else {
                                    this.quill.format('image', false);
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    methods: {
        onEditorBlur(quill) {
            
        },
        onEditorChange({ quill, html, text }) {
            console.log(html)
            this.content = html
            console.log(this.content)
        },
        saveContent() {
            console.log(this.content)
        },
        uploadSuccess(res){
            let quill = this.$refs.myQuillEditor.quill;
            let thisCode=res.code;
            let thisContent=res.content;
            let thisMsg=res.msg || "图片插入失败";
            if (thisCode == 0 && !!thisContent && !!thisContent.url) {
                let length = quill.getSelection().index;
                quill.insertEmbed(length, 'image', thisContent.url);
                quill.setSelection(length + 1);
            }
            else {
                this.$message.error(thisMsg);
            }
            this.quillUpdateImg = false;
        },
        uploadError(){
            this.quillUpdateImg = false;
            this.$message.error('图片插入失败');
        },
        beforeUpload(d){
            let imgType= d.type.toLowerCase();
            let imgSize= d.size;
            if(imgType.indexOf("image/jpg")<0 && imgType.indexOf("image/jpeg")<0 && imgType.indexOf("image/png")<0 && imgType.indexOf("image/gif")<0 ){
                console.log('图片格式只能为jpg|jpeg|png|gif');
                return;
            }
            if(imgSize>20*1024*1024){
                console.log('图片请小于20M');
                return;
            }
            this.quillUpdateImg = true;
        },
    },
    computed: {
        editor() {
        return this.$refs.myQuillEditor.quill
        }
    },
    mounted() {
        console.log('this is current quill instance object', this.editor)
    }
}

</script>
<style scoped>
.quill-editor {
    width: 80%
}
</style>
