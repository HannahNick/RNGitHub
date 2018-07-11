export default class ArrayUtil{
    
    /**
     * 更新数组,若item已存在则从数组中将它移除，否则就添加进数组
     * @param {*} array 
     * @param {*} item 
     */
    static updataArray(array,item){
        for(var i=0,len=array.length;i<len;i++){
            var temp = array[i];
            if(temp===item){
                array.splice(i,1);
                return;
            }
        }
        array.push(item);
    }
}