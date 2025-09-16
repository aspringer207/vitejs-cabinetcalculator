export default function setPrecision(num: number, precision = Number(1 / 32)) {
  return Math.round(num / precision) * precision;
}
