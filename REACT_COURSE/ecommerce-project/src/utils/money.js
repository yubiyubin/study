export const formatMoney = (amountCents) => {
  console.log("aaa", amountCents);
  return `$${(amountCents / 100).toFixed(2)}`;
};
