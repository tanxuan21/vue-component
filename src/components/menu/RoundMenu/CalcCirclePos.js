/**
 * 
 * @param {Number} angle 弧度制角度
 * @param {number} [Max=10000] 最大阈值
 * @param {number} [Min=0.00001] 最小阈值
 * 根据Math.tan的值来判断.tan值大于10000我们认为是90度(Infinity).
 * 小于0.00001我们认为是0.后期可以再更改阈值.
 */
function tan(angle, Max = 10000, Min = 0.00001) {
    // 明确的可以判断是90度
    if (!angle % Math.PI / 2 && angle % Math.PI) {
        return Infinity;
    }
    // 阈值
    else {
        const ans = Math.tan(angle);
        if (Math.abs(ans) > Max) {
            return Infinity;
        } else if (Math.abs(ans) < Min) {
            return 0;
        } else {
            return ans;
        }
    }
}
// 计算一圈的点位
/**
 * @param {Number} N 菜单条目个数,用于计算每个点位. 
 * @param {Number} R 半径
 * @returns [{x:Number,y:Number},{x:Number,y:Number}...]
 */

export default function (N, R, k = 1) {
    const posArr = [];
    const d = 2 * Math.PI / N;
    for (let i = 0; i < N; i++) {
        const angle = i * d + Math.PI / 4;
        const p = {
            x: Math.cos(angle) * R * k,
            y: Math.sin(angle) * R,
        };
        posArr.push(p);
    }
    return posArr;
}