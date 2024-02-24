// 边手柄
export function createBorderHandle(el) {
    const geo = el.getBoundingClientRect();
    const div = document.createElement("div");
    div.style = `top:0;left:0;width:2px;height:${geo.height}px;background-color:#ff0000`;
    el.appendChild(div);
}
// 角手柄
function createCornerHandle() {

}

