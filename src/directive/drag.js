import {
    Geometry
} from '@/lib';
/**
 * 
 * @param {DOM Object} element dom元素对象
 * @returns dom元素对象
 * 用于找到DragAreaContainer.这个元素是绑定拖拽的事件.
 */
const findDragAreaContainer = (element) => {
    const body = document.querySelector("body");
    for (let parentElement = element.parentNode;; parentElement = parentElement.parentNode) {
        if (parentElement.getAttribute("name") === "DragAreaContainer") {
            return parentElement;
        }
        if (parentElement === body) {
            return;
        }
    }
}
const handleErro = (el, binding, containerElement) => {
    if (typeof (binding.value) !== 'function') {
        console.error("directive v-drag 's value is no a function.");
        return -1;
    }
    if (!containerElement) {
        console.error("directive v-drag erro: dragitem has no 'DragAreaContainer'");
        return -1;
    }
    return 0;
}
const setTop_Left = (el, top, left) => {
    el.style.top = top + 'px';
    el.style.left = left + 'px';
}
export default {
    mounted(el, binding, vnode, prevVnode) {
        // 用到的所有数据
        const element = el;
        const containerElement = findDragAreaContainer(el);
        const dragBeginData = {
            isDragging: false,
            InnerItemMousePos: {
                x: 0,
                y: 0,
            },
            InnerContainerMousePos: {
                x: 0,
                y: 0,
            }
        }
        // 数据异常
        if (handleErro(el, binding, containerElement) === -1) {
            return;
        }
        // 拖拽帧
        const HandleMouseMoveFrame = (event) => {
            const mousePos = Geometry.mouseToScreenPosition(event, containerElement);
            setTop_Left(element, mousePos.y - dragBeginData.InnerItemMousePos.y, mousePos.x - dragBeginData.InnerItemMousePos.x)
            binding.value(event, mousePos, dragBeginData.InnerItemMousePos);
        }

        // 结束拖拽
        const handleDragEnd = (event) => {
            containerElement.removeEventListener("mousemove", HandleMouseMoveFrame);
            dragBeginData.isDragging = false;
            containerElement.removeEventListener("mouseup", handleDragEnd);
            containerElement.removeEventListener("mouseleave", handlePointerLeave);
            // console.log('endDrag');
        }
        // 离开拖拽容器,结束拖拽
        const handlePointerLeave = (event) => {
            if (dragBeginData.isDragging) {
                containerElement.removeEventListener("mousemove", HandleMouseMoveFrame);
                // console.log('leave-container');
                dragBeginData.isDragging = false;
                containerElement.removeEventListener("mouseleave", handlePointerLeave);
            }
        }
        // 鼠标按下,开始拖拽
        element.addEventListener("mousedown", function (event) {
            dragBeginData.isDragging = true;
            dragBeginData.InnerItemMousePos = Geometry.mouseToScreenPosition(event, element);
            dragBeginData.InnerContainerMousePos = Geometry.mouseToScreenPosition(event, containerElement);
            containerElement.addEventListener("mousemove", HandleMouseMoveFrame);
            // 结束拖拽,事件全部都要移除.
            containerElement.addEventListener("mouseup", handleDragEnd);
            containerElement.addEventListener("mouseleave", handlePointerLeave);
        });

    },
}