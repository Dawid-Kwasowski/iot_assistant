import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'iot_assistant',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
