export default class ArrayUtil{
    
    /**
     * 更新数组,若item已存在则从数组中将它移除，否则就添加进数组
     * @param {*} array 
     * @param {*} item 
     */
    static updateArray(array, item){
        for(let i=0,len=array.length;i<len;i++){
            let temp = array[i];
            if(temp===item){
                array.splice(i,1);
                return;
            }
        }
        array.push(item);
    }

    /**
     * 克隆一个数组
     * @param from
     * @returns {Array}
     */
    static clone(from){
        if(!from){//from为空
            return [];
        }
        let newArray=[];
        for(let i =0;i<from.length;i++){
            newArray[i]=from[i];
        }
        return newArray;
    }

    /**
     * 判断两个数组的元素是否一一对应
     * @param arr1 数组一
     * @param arr2 数组二
     * @returns {boolean} true相等且元素相等
     */
    static isEqual(arr1,arr2){
        if (!(arr1&&arr2)){//判断是否为空
            return false;
        }
        if (arr1.length!==arr2.length){
            return false;
        }
        for (let i=0;i<arr2.length;i++){
            if (arr1[i]!==arr2[i]){
                return false;
            }
        }
        return true;
    }

    /**
     * 移除数组中对应的item
     * @param arr
     * @param item
     */
    static removeItem(arr,item){
        const size = arr.length;
        for (let i = 0; i < size; i++) {
            let data=arr[i];
            if (data === item) {
                arr.splice(i,1);
            }
        }
    }
}