/**
 * 给一个定位dom元素,(宽高为0),网格间距,上下边缘限制
 * 生成网格点.
 * 
 */

import pointClass from './assets/point.module.less';

function fillCircle(context, x, y, size, color) {
    context.beginPath();
    context.arc(x, y, size, 0, 2 * Math.PI);
    context.fillStyle = color || '#aaa'; // 点的颜色为黑色
    context.fill();
}
let lspace = 1;
export default (canvas, transform, option) => {
    const geo = canvas.value.getBoundingClientRect();
    const context = canvas.value.getContext("2d");
    // 清空画布
    context.clearRect(0, 0, canvas.value.width, canvas.value.height);
    const absSpace = (option.space || 50);
    console.log(transform.scale.value);
    let space = (absSpace / lspace) * (transform.scale.value);
    if (space > absSpace * 4) {
        lspace = lspace * 4;
    }
    if (space < absSpace / 4) {
        lspace = lspace / 4;
    }
    if (space > absSpace * 2) {
        lspace = lspace * 2;
    }
    if (space < absSpace / 2) {
        lspace /= 2;
    }
    console.log(lspace);
    space = (absSpace / lspace) * (transform.scale.value);
    let size = option.size || 3;
    let color = option.color || "#aaa";
    let count = 0;
    for (let i = geo.width / 2, m = geo.width / 2; i > 0; i -= space, m += space) {
        for (let j = geo.height / 2, n = geo.height / 2; j > 0; j -= space, n += space) {
            count++;
            fillCircle(context, i, j, size, color);
            fillCircle(context, i, n, size, color);
            fillCircle(context, m, j, size, color);
            fillCircle(context, m, n, size, color);
        }
    }
    if (option.displayCenter) {
        fillCircle(context, geo.width / 2, geo.height / 2, option.centerSize || 4, option.centerColor);
    }
}