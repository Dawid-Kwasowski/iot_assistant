import { Injectable } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AnimationsService {

constructor(public animationCtrl: AnimationController) { }
  
}
