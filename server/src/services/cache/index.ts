import NodeCache from 'node-cache';

type Key = string | number;

class Cache {
  private static _instance: Cache;

  private cache: NodeCache;

  private constructor(ttlSeconds: number) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
      useClones: false,
    });
  }

  public static getInstance(): Cache {
    if (!Cache._instance) {
      Cache._instance = new Cache(5 * 60);
    }
    return Cache._instance;
  }

  public get<T>(key: Key): T | undefined {
    return this.cache.get<T>(key);
  }

  public set<T>(key: Key, value: T): void {
    this.cache.set(key, value);
  }
}

export default Cache.getInstance();
