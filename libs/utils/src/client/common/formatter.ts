export const formatAddress = (walletAddress: string | undefined) => {
  if (!walletAddress) return "";
  return walletAddress.slice(0, 6).concat("...").concat(walletAddress.slice(-4));
};

export const formatNumber = (number: number): string => {
  if (Number.isNaN(number)) return "0";
  const formatter = new Intl.NumberFormat("en-US", {
    useGrouping: true,
  });

  return formatter.format(number);
};

export const formatStringToPascalCase = (str: string): string => {
  return str
    .replace(/(\w)(\w*)/g, function wordToPascalCase(_: string, firstChar: string, rest: string): string {
      return firstChar.toUpperCase() + rest.toLowerCase();
    })
    .replace(/\s+/g, "");
};

export const formatNumberToFinancialUnit = (number: number): string => {
  if (Number.isNaN(number) || number === 0) return "0";

  const absNumber = Math.abs(number);
  const sign = number < 0 ? "-" : "";

  if (absNumber >= 1000000000) {
    return `${sign}${(number / 1000000000).toFixed(1)}B`;
  }
  if (absNumber >= 1000000) {
    return `${sign}${(number / 1000000).toFixed(1)}M`;
  }
  if (absNumber >= 1000) {
    return `${sign}${(number / 1000).toFixed(1)}K`;
  }
  return `${sign}${number.toFixed(1)}`;
};
