<template>
    <div>
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
// import { someModule } from '../yourModulePath/someQuillModule.js'
// Quill.register('modules/someModule', someModule)

export default {
data () {
    return {
        content: '<h2>I am Example</h2>',
        editorOption: {
            // some quill options
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
    }
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

</style>
