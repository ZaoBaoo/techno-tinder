export default function formatNumber(number: number | string = 0) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
