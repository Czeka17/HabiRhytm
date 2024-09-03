import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

interface ExperienceContextType {
  exp: number;
  level: number;
  NextLevelExp: number;
  addExperienceHandler: (exp: number) => void;
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(
  undefined,
);

interface ExperienceProviderProps {
  children: ReactNode;
}

export function ExperienceProvider({ children }: ExperienceProviderProps) {
  const [exp, setExp] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);

  const NextLevelExp = 20 * level;

  function addExperienceHandler(experience: number) {
    setExp((prevExp) => prevExp + experience);
  }

  useEffect(() => {
    if (exp >= NextLevelExp) {
      setLevel((prevLevel) => prevLevel + 1);
      setExp((prevExp) => prevExp - NextLevelExp);
    }
  }, [exp]);
  return (
    <ExperienceContext.Provider
      value={{ exp, level, NextLevelExp, addExperienceHandler }}
    >
      {children}
    </ExperienceContext.Provider>
  );
}
export function useExperience() {
  const context = useContext(ExperienceContext);
  if (context === undefined) {
    throw new Error(`useExperience must be used within a ExperienceProvider`);
  }
  return context;
}
