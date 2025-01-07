export const getLanguage = (key) => {
  if (key === 'code' || key === 'usage' || key === 'tailwind' || key === 'presets' || key === 'utility') return 'jsx';
  if (key === 'installation') return 'bash';
  if (key === 'css') return 'css';
}

export const getStarsCount = async () => {
  try {
    const response = await fetch('https://api.github.com/repos/DavidHDev/react-bits');
    const data = await response.json();
    return data.stargazers_count;
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