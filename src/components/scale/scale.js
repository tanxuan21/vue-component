export const limit_MIN = -300;
export const limit_MAX = 200;
export const ratio = .01;
// value -> scale 值(工具函数)
export function map(value) {

    if (value > 0) {
        return ratio * value + 1;
    }
    if (value < 0) {
        let s = Math.exp(ratio * value);
        return s;
    }
}