export const reverseString = (str: string)=> {
  const strArray = str.split('');
  let start = 0;
  let end = strArray.length - 1;
  while (start < end) {
    const temp = strArray[start];
    strArray[start] = strArray[end];
    strArray[end] = temp;
    start++;
    end--;
  }
  return strArray.join('');
}