export function formatCurrency(priceCents){
    return (Math.round(priceCents) / 100).toFixed(2) ;
}

export const TAXRATE = 0.0825;
