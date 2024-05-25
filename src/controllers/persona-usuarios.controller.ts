import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Persona,
  Usuarios,
} from '../models';
import {PersonaRepository} from '../repositories';


export class PersonaUsuariosController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Usuarios belonging to Persona',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Usuarios),
          },
        },
      },
    },
  })
  async getUsuarios(
    @param.path.string('id') id: typeof Persona.prototype.id,
  ): Promise<Usuarios> {
    return this.personaRepository.aliasFK(id);
  }
}
