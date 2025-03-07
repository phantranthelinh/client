export function formatCurrencyVND(amount?: number) {
  return amount
    ? amount.toLocaleString("it-IT", { style: "currency", currency: "VND" })
    : 0;
}
