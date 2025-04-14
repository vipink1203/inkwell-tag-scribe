
export interface Settings {
  id: number;
  theme: 'light' | 'dark' | 'system';
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  showLineNumbers: boolean;
  autoSave: boolean;
  saveInterval: number; // in seconds
  createdAt: string;
  updatedAt: string;
}

export type SettingsUpdate = Partial<Omit<Settings, 'id' | 'createdAt' | 'updatedAt'>>;
