import { Injectable } from '@angular/core';
import { AnimationTriggerMetadata } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  
  async loadListAnimation(): Promise<AnimationTriggerMetadata> {
    const { listAnimation } = await import('./list.animation');
    return listAnimation;
  }
}