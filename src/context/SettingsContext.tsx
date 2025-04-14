
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Settings, SettingsUpdate } from '@/types/settings';
import { settingsService } from '@/services/settings.service';
import { toast } from '@/components/ui/sonner';

interface SettingsContextType {
  settings: Settings | null;
  isLoading: boolean;
  error: Error | null;
  updateSettings: (updates: SettingsUpdate) => Promise<void>;
  resetSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        const loadedSettings = await settingsService.getSettings();
        setSettings(loadedSettings);
        setError(null);
        
        // Apply theme from settings
        if (loadedSettings.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else if (loadedSettings.theme === 'light') {
          document.documentElement.classList.remove('dark');
        } else {
          // Handle system preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (prefersDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load settings'));
        toast.error('Failed to load settings');
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSettings = async (updates: SettingsUpdate) => {
    try {
      setIsLoading(true);
      const updatedSettings = await settingsService.updateSettings(updates);
      setSettings(updatedSettings);
      
      // Apply theme if it was updated
      if (updates.theme) {
        if (updates.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else if (updates.theme === 'light') {
          document.documentElement.classList.remove('dark');
        } else {
          // Handle system preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (prefersDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      }
      
      toast.success('Settings updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update settings'));
      toast.error('Failed to update settings');
    } finally {
      setIsLoading(false);
    }
  };

  const resetSettings = async () => {
    try {
      setIsLoading(true);
      const defaultSettings = await settingsService.resetSettings();
      setSettings(defaultSettings);
      
      // Apply default theme
      if (defaultSettings.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (defaultSettings.theme === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        // Handle system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      
      toast.success('Settings reset to defaults');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to reset settings'));
      toast.error('Failed to reset settings');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, isLoading, error, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
