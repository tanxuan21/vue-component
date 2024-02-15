class vector2 {
    /**
     * 第一部分:构造操作
     */
    // 构造函数
    constructor() {
        this.x = 0;
        this.y = 0;
        this.d = 0;
    }
    // 通过
    //{x:Number,
    //y:Number,
    //}
    //对象创建向量
    static create_P(pos) {
        const v = new vector2();
        v.x = pos.x;
        v.y = pos.y;
        v.calculateD();
        return v;
    }
    // 根据两个坐标创建一个向量.
    static create_P1_P2(pos1, pos2) {
        const v = new vector2();
        v.x = pos2.x - pos1.x;
        v.y = pos2.y - pos1.y;
        v.calculateD();
        return v;
    }
    static copy(v) {
        const vn = new vector2();
        vn.x = v.x;
        vn.y = v.y;
        vn.d = v.d;
        return vn;
    }

    // 根据一个向量(指示方向)与一个长度创建.类似极坐标的描述.
    static create_v_d(v, d) {
        const vn = vector2.copy(v);
        vn.setD(d);
        return vn;
    }
    // 设置.为了节省效率,有些场景可能会多次更改x,y但是并不需要d.
    // 这时候为了节省计算d的时间可以不用set设置.但是务必慎重
    set(_x, _y) {
        this.x = _x;
        this.y = _y;
        this.calculateD();
    }
    // 设置距离
    setD(d) {
        this.x *= d / this.d;
        this.y *= d / this.d;
        this.d = d;
    }
    // 计算距离
    calculateD() {
        this.d = Math.sqrt(this.x * this.x + this.y * this.y);
    }
    /**
     * 计算API(会修改自己)
     */

    // 数乘
    multiplyK(k) {
        this.x *= k;
        this.y *= k;
        this.calculateD();
    }
    // 相加
    addV(v) {
        this.x += v.x;
        this.y += v.y;
        this.calculateD();
    }
    // 相减
    reduceV(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.calculateD();
    }
    // 归一化
    normalize() {
        this.x /= this.d;
        this.y /= this.d;
        this.d = 1;
    }
    // 反向
    reverse() {
        this.x = -this.x;
        this.y = -this.y;
    }
    /**
     * 关系API
     */

    // 差值
    static diffuse(v1, v2) {
        const nv = new vector2();
        nv.x = v1.x - v2.x;
        nv.y = v1.y - v2.y;
        nv.calculateD();
        return nv;
    }
    // 和值
    static con(v1, v2) {
        const nv = new vector2();
        nv.x = v1.x + v2.x;
        nv.y = v1.y + v2.y;
        nv.calculateD();
        return nv;
    }
    // 倍数
    // 这个api也可以判断是共线.
    static time(v1, v2) {
        // 不能使用除法.小数的精度问题
        if (v1.y * v2.x === v2.y * v1.x) {
            return v2.x / v1.x;
        } else return -1;
    }
    // 判断v2是否在v1的顺时针侧(右侧)
    // 这个api也可以判断是否共线
    static isRight(v1, v2) {
        const id = -v1.x * v2.y + v2.x * v1.y;
        if (id == 0) {
            return 0;
        } else if (id > 0) {
            return 1;
        } else {
            return -1;
        }
    }
    // 获得正交向量.(在原向量的右侧)
    static originV(v) {
        const vn = new vector2();
        vn.x = v.y;
        vn.y = -v.x;
        vn.d = v.d;
        return vn;
    }
}

export default vector2;