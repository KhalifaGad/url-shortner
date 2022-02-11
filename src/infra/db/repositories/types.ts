import { ILayersContract } from "@types";

export interface IRepo<Entity> {
  add: (data: Entity) => ILayersContract<Entity>;
  get: (id: string) => ILayersContract<Entity>;
  exist: (id: string) => ILayersContract<Entity, boolean>;
}
