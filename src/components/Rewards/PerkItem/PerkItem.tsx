import { useExperience } from '../../../context/ExperienceContext';
import { useTheme } from '../../../context/ThemeContext';
import { useEffect } from 'react';
interface PerkItemProps {
  perk: {
    PerkType: string;
    color: string;
    UnlockedAt: number;
  };
}
function PerkItem({ perk }: PerkItemProps) {
  const { theme, applyTheme } = useTheme();
  const { level } = useExperience();

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
    if (theme.accent) {
      document.documentElement.style.setProperty(
        `--accent-color`,
        theme.accent,
      );
    }
    if (theme.font) {
      document.documentElement.style.setProperty(`--font-family`, theme.font);
    }
  }, [theme]);
  return (
    <>
      {level >= perk.UnlockedAt ? (
        <div
          className={`h-[150px] w-[150px] rounded-full ${theme.background === perk.color ? `border-4 border-blue-400` : ``}`}
          onClick={() => applyTheme(perk.color, perk.PerkType)}
          style={{ backgroundColor: perk.color, cursor: `pointer` }}
        >
          {perk.PerkType === `Font` && (
            <p style={{ fontFamily: perk.color }}>Text</p>
          )}
        </div>
      ) : (
        <div>
          <p>You need {perk.UnlockedAt} level to unlock it</p>
        </div>
      )}
    </>
  );
}
export default PerkItem;
