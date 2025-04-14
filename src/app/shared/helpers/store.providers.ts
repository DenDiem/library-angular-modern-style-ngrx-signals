import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { FEATURE_STORE_MAP } from '../entities/store/store.constant';
import { FeatureKey } from '../entities/store/store.enum';

export function provideFeatureStore(feature: FeatureKey) {
  const entry = FEATURE_STORE_MAP[feature];

  return [
    provideState(feature, entry.reducer),
    provideEffects(...entry.effects),
  ];
}
