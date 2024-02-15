import opt from './option';
class pen {
    constructor(canvasElement) {
        this.penType = opt.pen_type.pen;
        this.canvasElement = canvasElement;
        this.p0;
        this.p1;
    }
    // 设置笔刷类型
    setPenType(pt){
        this.penType = opt.pen_type[pt];
    }
    // 接受压感数据,只接受屏幕坐标系
    accept(pointP,force){
        this.p1 = pointP;
    }
    // 绘制开始
    paintStart(){

    }
    // 绘制结束
    paintEnd(){

    }
}
export default pen;