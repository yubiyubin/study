export const formatMoney = (amountCents) => {
  return `$${(amountCents.amountCents / 100).toFixed(2)}`;
};
