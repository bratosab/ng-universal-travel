import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private transferState: TransferState) { }

  saveState<T>(key: string, data: T): void {
    this.transferState.set<T>(makeStateKey(key), data);
  }

  getState<T>(key: string, defaultValue: T): T {
    const stateKey = makeStateKey<T>(key)
    const state = this.transferState.get<T>(stateKey, defaultValue);
    this.transferState.remove(stateKey)

    return state;
  }

  hasState<T>(key: string) {
    return this.transferState.hasKey(makeStateKey(key));
  }
}
