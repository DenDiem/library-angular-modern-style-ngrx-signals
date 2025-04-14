import { Type } from '@angular/core';
import { ActionReducer } from '@ngrx/store';

export interface FeatureStoreEntry {
    reducer: ActionReducer<unknown>;
    effects: Type<unknown>[];
  }