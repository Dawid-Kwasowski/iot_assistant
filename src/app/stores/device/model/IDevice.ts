
export interface IDevice {
    [key: number | string]: IDeviceDescription;
}

export interface IDeviceDescription {
    name: string;
    topic: string;
    type: string;
    status?: string;
}

