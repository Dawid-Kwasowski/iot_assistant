import { Injectable } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AnimationsService {

constructor(private animationCtrl: AnimationController) { }
public translateUpAnimation(itemRefArray: Element): Animation {
  console.log('translateUpAnimation', itemRefArray);
  return this.animationCtrl
  .create()
  .addElement(itemRefArray)
  .fill('both')
  .duration(800)
  .fromTo('transform', 'translateY(0px)', 'translateY(-300px)')
  .fromTo('opacity', '1', '0') 
  
  || undefined;
}
}
