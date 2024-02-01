import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CommandsService } from 'src/app/services/commands.service';
import { MqttService } from 'src/app/services/mqtt/mqtt.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {



  constructor(
    private mqttService: MqttService,
    private commandService: CommandsService,
    private toastCtrl: ToastController,
    ) { }

  async ngOnInit() {
    await this.mqttService.connect();
  }

  async ngOnDestroy() {
    await this.mqttService.disconnect();
  }

  public async addCommand() {
    const { role } = await this.commandService.addCommand();
    if(role === 'confirm') {
      const toast = await this.toastCtrl.create({message: "Command has been added", duration: 3000, color: 'success'});
      toast.present();
    }
  }

  public handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  public async powerOnDevice() {
    this.mqttService.powerOnDevice();
    }
    powerOffDevice() {
      this.mqttService.powerOffDevice();
    }

  public async test() {
     
  }
}
