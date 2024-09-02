import { useTheme } from '../../../context/ThemeContext';
import { useEffect } from 'react';
interface PerkItemProps {
  perk: {
    PerkType: string;
    color: string;
  };
}
function PerkItem({ perk }: PerkItemProps) {
  const { theme, applyTheme } = useTheme();

  useEffect(() => {
    if (theme.background) {
      document.documentElement.style.setProperty(
        `--bg-color`,
        theme.background,
      );
      return;
    }
    if (theme.color) {
      document.documentElement.style.setProperty(`--text-color`, theme.color);
    }
    if (theme.font) {
      document.documentElement.style.setProperty(`--font-family`, theme.font);
    }
  }, [theme]);
  return (
    <div
      className="h-[150px] w-[150px]"
      onClick={() => applyTheme(perk.color, perk.PerkType)}
      style={{ backgroundColor: perk.color, cursor: `pointer` }}
    >
      {perk.PerkType === `Font` && (
        <p style={{ fontFamily: perk.color }}>Text</p>
      )}
    </div>
  );
}
export default PerkItem;
