import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Persona, PersonaRelations, Usuarios} from '../models';
import {UsuariosRepository} from './usuarios.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly aliasFK: BelongsToAccessor<Usuarios, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>,
  ) {
    super(Persona, dataSource);
    this.aliasFK = this.createBelongsToAccessorFor('aliasFK', usuariosRepositoryGetter,);
    this.registerInclusionResolver('aliasFK', this.aliasFK.inclusionResolver);
  }
}
