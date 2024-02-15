const Geometry = {
    /**
     * 
     * @param {Event} event 鼠标事件对象
     * @param {DOM} element dom元素对象
     * @returns {x:Number,y:Number}
     * 获取 [获取对象]鼠标坐标 [坐标系]元素屏幕坐标系
     */
    mouseToScreenPosition(event, element) {
        return {
            x: event.clientX - element.getBoundingClientRect().x,
            y: event.clientY - element.getBoundingClientRect().y,
        }
    },
    /**
     * 
     * @param {*} child 子元素
     * @param {*} parent 父元素
     * @returns {x:Number,y:Number}
     * 获取 [获取对象]子元素中心 [坐标系]父元素屏幕坐标系
     */
    getChildCenterPosition: function (child, parent) {
        const childGeometry = child.getBoundingClientRect();
        const parentGeometry = parent.getBoundingClientRect();
        return {
            x: childGeometry.x - parentGeometry.x + childGeometry.width / 2,
            y: childGeometry.y - parentGeometry.y + childGeometry.height / 2,
        }
    },

    /** 
     * (父元素屏幕坐标系)
     * 设置子元素的中心位置
     */
    // position_Setter_center: function (child, left, top) {
    //     const center = Geometry.center_Getter(child);
    //     cssTool.top_left_Setter(child, left - center.x, top - center.y);
    // },

    /**
     * 
     * @param {*} element 元素
     * @returns {x:Number,y:Number}
     * 获取 [获取对象]元素中心坐标 [坐标系]本元素屏幕坐标系
     */
    center_Getter: function (element) {
        const elementGeometry = element.getBoundingClientRect();
        return {
            x: elementGeometry.width / 2,
            y: elementGeometry.height / 2
        }
    },
    /**
     * 
     * @param {*} element 元素
     * @param {*} position 坐标
     * @returns {x:Number,y:Number}
     * 转换 元素屏幕坐标系下的坐标值 -> 元素中心坐标系下坐标值
     */
    ScreenToCenter: function (element, position) {
        const center = Geometry.center_Getter(element);
        return {
            x: position.x - center.x,
            y: -position.y + center.y,
        }
    },
    /**
     * 中心坐标系->屏幕坐标系
     */
    /**
     * 
     * @param {*} element 元素
     * @param {*} position 坐标
     * @returns {x:Number,y:Number}
     * 转换   元素中心坐标系下坐标值 -> 元素屏幕坐标系下的坐标值
     */
    CenterToScreen: function (element, position) {
        const center = Geometry.center_Getter(element);
        return {
            x: position.x + center.x,
            y: center.y - position.y,
        }
    },
    /**
     * (父元素中心坐标系)
     * 设置子元素的中心坐标
     * @param {child} 子元素dom
     * @param {parent} 父元素dom
     * @param {object} 中心坐标
     */
    setChildPos: function (child, parent, position) {
        child.setAttribute("center-x", position.x);
        child.setAttribute("center-y", position.y);
        position = Geometry.CenterToScreen(parent, position); // 先转为屏幕坐标比较好操作
        // 写入到dom节点的属性里
        Geometry.position_Setter_center(child, position.x, position.y);

    },
    /**
     * (父元素中心坐标系)
     *  读取子元素的中心坐标
     */
    readChildPos: function (child) {
        return {
            x: child.getAttribute("center-x"),
            y: child.getAttribute("center-y"),
        }
    },
    /**
     * (父元素中心坐标系)
     *  计算子元素的中心坐标
     */
    getChildPos: function (child, parent) {
        return Geometry.ScreenToCenter(parent, Geometry.center_position_Getter(child, parent));
    }
}

export default Geometry;