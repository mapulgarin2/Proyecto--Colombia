import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuarios} from './usuarios.model';

@model()
export class Persona extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  // @property({
  //   type: 'string',
  @belongsTo(() => Usuarios, {name: 'aliasFK'})
  alias: string;
  //   required: true,
  // })
  // alias: string;

  @property({
    type: 'string',
  })
  actividad?: string;

  @property({
    type: 'string',
  })
  pais?: string;


  constructor(data?: Partial<Persona>) {
    super(data);
  }
}

export interface PersonaRelations {
  // describe navigational properties here
}

export type PersonaWithRelations = Persona & PersonaRelations;
