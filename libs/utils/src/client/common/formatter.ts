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

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
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

export const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (minutes < 1) return "less than 1 minute ago";
  if (hours < 1) return `${minutes} minutes ago`;
  if (days < 1) return `${hours} hours ago`;
  if (months < 1) return `${days} days ago`;
  if (years < 1) return `${months} months ago`;
  return `${years} years ago`;
};
