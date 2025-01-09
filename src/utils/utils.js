export const getLanguage = (key) => {
  if (key === 'code' || key === 'usage' || key === 'tailwind' || key === 'presets' || key === 'utility') return 'jsx';
  if (key === 'installation') return 'bash';
  if (key === 'css') return 'css';
}

const formatNumber = (num) => {
  if (num < 1000) return num.toString();

  const rounded = Math.ceil(num / 100) * 100;
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(rounded);
};

export const getStarsCount = async () => {
  try {
    const response = await fetch('https://api.github.com/repos/DavidHDev/react-bits');
    const data = await response.json();
    return String(formatNumber(data.stargazers_count)).toLowerCase();
  } catch (error) {
    console.error('Error fetching stargazers count:', error);
    return null;
  }
};

export const decodeLabel = (label) => label
  .split('-')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

export const forceChakraDarkTheme = () => {
  localStorage.setItem('chakra-ui-color-mode', 'dark');
  console.info('Successfully set dark color mode.');
};