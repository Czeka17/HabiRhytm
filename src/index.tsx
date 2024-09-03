import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HabitsProvider } from './context/HabitsContext';
import { ThemeProvider } from './context/ThemeContext';
import { ExperienceProvider } from './context/ExperienceContext';
const root = ReactDOM.createRoot(
  document.getElementById(`root`) as HTMLElement,
);
root.render(
  <React.StrictMode>
    <HabitsProvider>
      <ThemeProvider>
        <ExperienceProvider>
          <App />
        </ExperienceProvider>
      </ThemeProvider>
    </HabitsProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
