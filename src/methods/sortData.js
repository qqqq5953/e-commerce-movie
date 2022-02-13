export default function (array, bySomething) {
  console.log('bySomething', bySomething);

  return array.sort((a, b) => {
    if (bySomething === 'content') {
      return b[bySomething].split('|')[1] - a[bySomething].split('|')[1];
    }
    return b[bySomething] - a[bySomething];
  });
};

// 依照日期排序
// this.upComing = filterDate.sort((a, b) => {
//   return new Date(b.release_date) - new Date(a.release_date);
// });
