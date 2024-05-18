import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Aportes,
  Persona,
} from '../models';
import {AportesRepository} from '../repositories';

export class AportesPersonaController {
  constructor(
    @repository(AportesRepository)
    public aportesRepository: AportesRepository,
  ) { }

  @get('/aportes/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Aportes',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Persona),
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Aportes.prototype.id,
  ): Promise<Persona> {
    return this.aportesRepository.comentarioFK(id);
  }
}

