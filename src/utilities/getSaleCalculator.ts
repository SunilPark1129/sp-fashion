export function getSaleCalculator(price: string, sale: string) {
  return (Number(price) - Number(price) * (Number(sale) / 100)).toFixed(2);
}
