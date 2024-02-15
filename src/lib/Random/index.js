const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const random = {
    randomInt: function (min, max) {
        return parseInt(Math.random() * (max - min + 1)) + min;
    },
    randomKey: function (length) {
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }


}
// 示例：生成长度为 10 的随机字符串
export default random;