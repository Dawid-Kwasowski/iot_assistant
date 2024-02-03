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
