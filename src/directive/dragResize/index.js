import {
    createBorderHandle
} from './dragResizeHandleDom';
import {
    createApp
} from 'vue';
import icon from '@/components/icon';

export default {
    mounted(el, binding) {

        const root = document.createElement("div");
        createApp(icon, {
            type: 'zhankai'
        }).mount(root);
        console.log(root);
        // 双击激活拖拽重设尺寸
        el.addEventListener("dblclick", (event) => {
            event.stopPropagation();
            el.classList.toggle("drag-resize");
            if (el.classList.contains("drag-resize")) {
                createBorderHandle(el);
            } else {
                el.innerHTML = "";
            }
        })
    },
}