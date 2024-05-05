import { Injectable } from "@nestjs/common";
import { LRUCache } from 'lru-cache'


@Injectable()
export class CachingService {
  public cache: LRUCache<string, Buffer, any>;

  constructor() {
    const options: LRUCache.Options<string, any, any> = {
      max: 100,
      maxSize: 1000000,
      sizeCalculation: (value: Buffer) => {
        return value.byteLength;
      },
    }

    this.cache = new LRUCache(options);
  }
}