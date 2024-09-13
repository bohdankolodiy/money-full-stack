import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  #isLoading = signal(false);

  constructor() {}

  setLoading(value: boolean) {
    this.#isLoading.set(value);
  }

  get loading(): boolean {
    return this.#isLoading();
  }
}
