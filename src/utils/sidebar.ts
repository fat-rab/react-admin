export const getOpenKeys = (path: string) => {
    let newArr: Array<string> = [];
    let arr: Array<string> = path.split("/").map(i => "/" + i);
    // [/sys].split=/,sys
    // 从Index=1开始，排除第一个'/'
    // console.log(arr, 'arr')
    for (let i = 1; i <= arr.length - 1; i++) {
        newArr.push(arr[i]);
    }
    // console.log(newArr, 'newArr')
    return newArr;
};

export function getLastPath(path: string) {
    let arr = path.split('/')
    return '/' + arr[arr.length - 1]
}
