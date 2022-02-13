export default function (array, bySomething) {
  return array.sort((a, b) => {
    return b[bySomething] - a[bySomething];
  });
};

// 依照日期排序
// this.upComing = filterDate.sort((a, b) => {
//   return new Date(b.release_date) - new Date(a.release_date);
// });
