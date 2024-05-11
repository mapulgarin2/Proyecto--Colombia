import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuarios} from './usuarios.model';

@model()
export class Ponencias extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  // @property({
  //   type: 'string',
  @belongsTo(() => Usuarios, {name: 'resenaFK'})
  resena: string;
  //   required: true,
  // })
  // resena: string;

  @property({
    type: 'string',
  })
  ponencia?: string;//Url o identicador del archivo

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;


  constructor(data?: Partial<Ponencias>) {
    super(data);
  }
}

export interface PonenciasRelations {
  // describe navigational properties here
}

export type PonenciasWithRelations = Ponencias & PonenciasRelations;
