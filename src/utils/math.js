export const formatNumToReadableText = (value) => {
  if (value >= 1000000) {
    return `${(value / 1000000) % 1 === 0 ? (value / 1000000) : (value / 1000000).toFixed(1)}M+`; // Format as millions
  } else if (value >= 1000) {
    return `${(value / 1000) % 1 === 0 ? (value / 1000) : (value / 1000).toFixed(1)}K`; // Format as thousands
  } else {
    return Math.round(value).toString(); // Display as is if less than 1000
  }
};

