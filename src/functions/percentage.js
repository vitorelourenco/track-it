export default function percentage(arrOfObj, bolProp) {
  const len = arrOfObj.length;
  if (len === 0) return 100;
  return Math.floor(
    (100 / len) *
      arrOfObj.reduce((acc, elem) => {
        return elem[bolProp] ? acc + 1 : acc;
      }, 0)
  );
}
