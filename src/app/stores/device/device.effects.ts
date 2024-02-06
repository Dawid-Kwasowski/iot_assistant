import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, from, map, mergeMap, of, switchMap } from "rxjs";
import { DeviceService } from "src/app/services/device.service";
import { loadDevices, loadDevicesFailure, loadDevicesSuccess } from "./device.actions";
import { IDevice, IDeviceDescription } from "./model/IDevice";

@Injectable()
export class DevicesEffects {

   constructor(
      private actions$: Actions,
      private devicesService: DeviceService
    ) {}

   public loadDevices$ = createEffect(() => this.actions$.pipe(
          ofType(loadDevices),
          switchMap(() => from(this.devicesService.getDevices()).pipe(
             map(devices => loadDevicesSuccess({devices})),
             catchError(() => of(loadDevicesFailure))
          ))
       )
      );

   // public insertDevices$ = createEffect(() => this.actions$.pipe(
   //    ofType('[Device List] Insert'),
   //    mergeMap((payload: IDeviceDescription) => from(this.devicesService.insertDevice(payload)))
   // ));

}

