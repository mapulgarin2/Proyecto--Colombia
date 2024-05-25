import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Ponencias,
  Usuarios,
} from '../models';
import {PonenciasRepository} from '../repositories';


export class PonenciasUsuariosController {
  constructor(
    @repository(PonenciasRepository)
    public ponenciasRepository: PonenciasRepository,
  ) { }

  @get('/ponencias/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Usuarios belonging to Ponencias',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Usuarios),
          },
        },
      },
    },
  })
  async getUsuarios(
    @param.path.string('id') id: typeof Ponencias.prototype.id,
  ): Promise<Usuarios> {
    return this.ponenciasRepository.resenaFK(id);
  }
}
