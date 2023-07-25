const formatInteger = str => str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export function formatNumber(str) {
  const [integer, decimal] = str.split(".");
  return (decimal == null)
    ? formatInteger(str)
    : `${formatInteger(integer)}.${decimal}`;
}
