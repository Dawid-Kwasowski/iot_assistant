
export interface IDevice {
    [key: number | string]: IDeviceDescription;
}

export interface IDeviceDescription {
    id?: string;
    name: string;
    topic: string;
    type: string;
    status?: string;
}
