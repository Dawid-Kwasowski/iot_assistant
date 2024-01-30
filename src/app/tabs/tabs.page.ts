import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { GestureController, GestureDetail, ModalController } from '@ionic/angular';
import { AssistantComponent } from '../components/assistant/assistant.component';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements AfterViewInit {

  @ViewChild('mic', { read: ElementRef }) mic!: ElementRef<HTMLIonTabButtonElement>;

  public timeout!: any;
  constructor(
    private modalCtrl: ModalController,
    private gestureCtrl: GestureController,
    private zone: NgZone,
  ) {}

  public ngAfterViewInit(): void {
    this.useLongPress(this.mic);
  }

  public useLongPress(element: ElementRef<any>): void {
    const gesture = this.gestureCtrl.create({
      el: element.nativeElement,
      gestureName: 'long-press',
      onStart: (ev): void => {
        this.onStart(ev)
      },
      onEnd: (ev): void => {
        this.onEnd(ev)
      },
    });
    gesture.enable(true);
  }
 
  public onStart(ev: GestureDetail): boolean | void {
    this.timeout = setTimeout((): void => {
      this.zone.run(async (): Promise<void> => {
        const modal = await this.modalCtrl.create({
          component: AssistantComponent,
          breakpoints: [0, 0.25, 0.5, 0.75],
          initialBreakpoint: 0.25
        })

        modal.present();
      });
    },2000);
  }
  public onEnd(ev: GestureDetail): boolean | void {
    clearTimeout(this.timeout);
  }
}
