export const formatPrice = (
    value,
    {
        locale = 'es-AR',
        currency = 'USD',
        currencyDisplay = 'symbol',
        minimumFractionDigits = 2,
        maximumFractionDigits = 2,
    } = {}
) => {
    const amount = Number(value);

    if (Number.isNaN(amount)) {
        return '';
    }

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        currencyDisplay,
        minimumFractionDigits,
        maximumFractionDigits,
    }).format(amount);
};