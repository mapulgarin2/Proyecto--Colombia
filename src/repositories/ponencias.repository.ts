import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Ponencias, PonenciasRelations, Usuarios} from '../models';
import {UsuariosRepository} from './usuarios.repository';

export class PonenciasRepository extends DefaultCrudRepository<
  Ponencias,
  typeof Ponencias.prototype.id,
  PonenciasRelations
> {

  public readonly resenaFK: BelongsToAccessor<Usuarios, typeof Ponencias.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>,
  ) {
    super(Ponencias, dataSource);
    this.resenaFK = this.createBelongsToAccessorFor('resenaFK', usuariosRepositoryGetter,);
    this.registerInclusionResolver('resenaFK', this.resenaFK.inclusionResolver);
  }
}
