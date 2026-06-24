type ThemeToggleProps = {
  theme: 'light' | 'dark';
  onToggle: () => void;
};

export const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  return (
    <button className="theme-toggle" onClick={onToggle}>
      {theme === 'light' ? 'Тёмная' : 'Светлая'}
    </button>
  );
};