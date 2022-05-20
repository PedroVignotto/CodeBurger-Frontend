export const formatPrice = (price: number): string =>
  Number(price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
