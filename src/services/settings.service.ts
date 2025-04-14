
import { Settings, SettingsUpdate } from '@/types/settings';
import { db } from './db';

export class SettingsService {
  private static instance: SettingsService;

  private constructor() {}

  public static getInstance(): SettingsService {
    if (!SettingsService.instance) {
      SettingsService.instance = new SettingsService();
    }
    return SettingsService.instance;
  }

  public async getSettings(): Promise<Settings> {
    await db.init();
    const results = db.execute('SELECT * FROM settings LIMIT 1');
    if (results.length === 0) {
      throw new Error('No settings found');
    }
    return results[0] as Settings;
  }

  public async updateSettings(updates: SettingsUpdate): Promise<Settings> {
    await db.init();
    
    const now = new Date().toISOString();
    const entries = Object.entries(updates);
    
    if (entries.length === 0) {
      return this.getSettings();
    }

    const setClause = entries.map(([key]) => `${key} = ?`).join(', ');
    const values = entries.map(([, value]) => value);
    
    // Add updatedAt to the values
    values.push(now);

    db.execute(
      `UPDATE settings SET ${setClause}, updatedAt = ? WHERE id = 1`,
      values
    );

    return this.getSettings();
  }

  public async resetSettings(): Promise<Settings> {
    await db.init();
    const now = new Date().toISOString();
    
    db.execute(`
      UPDATE settings
      SET theme = 'system',
          fontFamily = 'Inter',
          fontSize = 16,
          lineHeight = 1.5,
          showLineNumbers = 1,
          autoSave = 1,
          saveInterval = 30,
          updatedAt = ?
      WHERE id = 1
    `, [now]);
    
    return this.getSettings();
  }
}

export const settingsService = SettingsService.getInstance();
