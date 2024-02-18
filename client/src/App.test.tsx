import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/components/ThemeMode/ThemeProvider';
import App from '@/App';

describe('App', () => {
  it('renders the correct theme', () => {
    const { getByText } = render(
      <ThemeProvider defaultTheme='dark'>
        <App />
      </ThemeProvider>
    );
    expect(document.documentElement).toHaveClass('dark');
  });
});

describe('ThemeProvider', () => {
  it('renders the correct theme', () => {
    const { getByText } = render(
      <ThemeProvider defaultTheme='dark'>
        <App />
      </ThemeProvider>
    );
    expect(document.documentElement).toHaveClass('dark');
  });

  it('uses the useTheme hook correctly', () => {
    const TestComponent = () => {
      const { theme, setTheme } = useTheme();
      return (
        <div>
          <p>Current theme: {theme}</p>
          <button onClick={() => setTheme('light')}>Change to light</button>
        </div>
      );
    };

    const { getByText } = render(
      <ThemeProvider defaultTheme='dark'>
        <TestComponent />
      </ThemeProvider>
    );
    expect(getByText('Current theme: dark')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Change to light'));
    expect(getByText('Current theme: light')).toBeInTheDocument();
  });
});
