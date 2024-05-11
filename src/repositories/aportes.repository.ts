import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Aportes, AportesRelations, Persona} from '../models';
import {PersonaRepository} from './persona.repository';

export class AportesRepository extends DefaultCrudRepository<
  Aportes,
  typeof Aportes.prototype.id,
  AportesRelations
> {

  public readonly comentarioFK: BelongsToAccessor<Persona, typeof Aportes.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(Aportes, dataSource);
    this.comentarioFK = this.createBelongsToAccessorFor('comentarioFK', personaRepositoryGetter,);
    this.registerInclusionResolver('comentarioFK', this.comentarioFK.inclusionResolver);
  }
}
