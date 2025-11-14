const formatPrice = (price: string | number) => {
    const formatted = Number(price).toLocaleString("en-NP", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `Rs ${formatted}`;
  };
  
  export default formatPrice;