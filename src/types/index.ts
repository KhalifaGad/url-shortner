export interface ILayersContract<
  Entity,
  T extends number | boolean = undefined
> {
  data?: T extends number | boolean ? T | Entity : Entity;
  error?: Error;
}

export abstract class Exception extends Error {
  metadata: any;
  code: string;
}
