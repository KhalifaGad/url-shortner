export interface ILayersContract<
  Entity,
  T extends number | boolean = undefined
> {
  data?: T extends number | boolean ? T | Entity : Entity;
  error?: Error;
}

type ExceptionMetaData = {
  isInternal: boolean;
  context: any;
};

export abstract class Exception extends Error {
  metadata: ExceptionMetaData;
  code: string;
}
