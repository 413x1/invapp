export const formatRupiah = (number: number) => {
    if (isNaN(number)) {
      number = 0;
    }
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0, // Optional: specify the number of decimal places
    }).format(number);
  }