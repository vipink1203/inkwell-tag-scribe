
import initSqlJs, { Database } from 'sql.js';

export class SQLiteDB {
  private static instance: SQLiteDB;
  private db: Database | null = null;
  private initialized = false;
  private initPromise: Promise<void> | null = null;

  private constructor() {}

  public static getInstance(): SQLiteDB {
    if (!SQLiteDB.instance) {
      SQLiteDB.instance = new SQLiteDB();
    }
    return SQLiteDB.instance;
  }

  public async init(): Promise<void> {
    if (this.initialized) return;
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise(async (resolve, reject) => {
      try {
        const SQL = await initSqlJs({
          locateFile: file => `https://sql.js.org/dist/${file}`
        });

        // Create a new database
        this.db = new SQL.Database();
        
        // Create tables if they don't exist
        this.db.exec(`
          CREATE TABLE IF NOT EXISTS settings (
            id INTEGER PRIMARY KEY,
            theme TEXT NOT NULL DEFAULT 'system',
            fontFamily TEXT NOT NULL DEFAULT 'Inter',
            fontSize INTEGER NOT NULL DEFAULT 16,
            lineHeight REAL NOT NULL DEFAULT 1.5,
            showLineNumbers INTEGER NOT NULL DEFAULT 1,
            autoSave INTEGER NOT NULL DEFAULT 1,
            saveInterval INTEGER NOT NULL DEFAULT 30,
            createdAt TEXT NOT NULL,
            updatedAt TEXT NOT NULL
          );
        `);

        // Insert default settings if none exist
        const result = this.db.exec("SELECT COUNT(*) as count FROM settings");
        const count = result[0].values[0][0] as number;
        
        if (count === 0) {
          const now = new Date().toISOString();
          this.db.exec(`
            INSERT INTO settings 
            (theme, fontFamily, fontSize, lineHeight, showLineNumbers, autoSave, saveInterval, createdAt, updatedAt) 
            VALUES ('system', 'Inter', 16, 1.5, 1, 1, 30, '${now}', '${now}')
          `);
        }

        this.initialized = true;
        resolve();
      } catch (error) {
        console.error('Failed to initialize SQLite database:', error);
        reject(error);
      }
    });

    return this.initPromise;
  }

  public execute(sql: string, params: any[] = []): any[] {
    if (!this.db) throw new Error('Database not initialized');
    
    try {
      const stmt = this.db.prepare(sql);
      stmt.bind(params);
      
      const results = [];
      while (stmt.step()) {
        results.push(stmt.getAsObject());
      }
      stmt.free();
      return results;
    } catch (error) {
      console.error('SQL execution error:', error);
      throw error;
    }
  }

  public export(): Uint8Array {
    if (!this.db) throw new Error('Database not initialized');
    return this.db.export();
  }

  public loadFromData(data: Uint8Array): void {
    if (!this.initialized) throw new Error('Must initialize before loading data');
    initSqlJs().then(SQL => {
      this.db = new SQL.Database(data);
    });
  }
}

export const db = SQLiteDB.getInstance();
