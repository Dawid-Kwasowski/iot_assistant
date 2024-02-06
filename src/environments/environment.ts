// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IMqttServiceOptions } from "ngx-mqtt";

export const environment = {
  production: false,
  supabaseUrl: 'https://vcnvmglstkeblqdcumaj.supabase.co',
  supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjbnZtZ2xzdGtlYmxxZGN1bWFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzMTAzMjYsImV4cCI6MjAyMTg4NjMyNn0.4dIDqSbyWtBBu1IVY736c7aYhEloOcFg3A_LsD3RAHs',
  MQTT_SERVICE_OPTIONS: {
    port: 443,
    hostname: "brookdevourer373.cloud.shiftr.io",
    password: "KnsxWtGTlDuWfKf2",
    username: "brookdevourer373",
    clientId: "mqtt_js-Dawid333",
    connectTimeout: 4000, // Timeout period
    reconnectPeriod: 4000, // Reconnect period
    protocol: 'wss',
  } as IMqttServiceOptions
};

    // port: 8083,
    // hostname: "broker.emqx.io",
    // password: "emqx_test",
    // username: "emqx_test",
    // path: '/mqtt',
    // clientId: "mqtt_js-Dawid333",
    // connectTimeout: 4000, // Timeout period
    // reconnectPeriod: 4000, // Reconnect period
    // protocol: 'ws',

// MQTT_SERVICE_OPTIONS: {
//   host: "wss://springcloak517.cloud.shiftr.io:443",
//   password: "aE0XYSw4inRnZSPh",
//   username: "springcloak517",
//   clientId: "mqtt_js-Dawid333",
// } as IMqttServiceOptions

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
