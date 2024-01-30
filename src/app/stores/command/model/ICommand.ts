export interface ICommand {
   [key: number | string]: ICommandDescription
}

export interface ICommandDescription {
   name: string;
   command: string;
}