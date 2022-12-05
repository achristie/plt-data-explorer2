export function transformMarketData(d) {
  let arr = [];
  d.forEach((o) => {
    o.data.forEach((p) => {
      arr.push({
        symbol: o.symbol,
        bate: p.bate,
        value: p.value,
        assessDate: p.assessDate,
        isCorrected: p.isCorrected,
        modDate: p.modDate
      });
    });
  });
  return arr;
}
