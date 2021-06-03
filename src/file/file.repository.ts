
import { File } from './file.entity';
import { AbstractPolymorphicRepository } from 'typeorm-polymorphic';
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(File)
export class FilePolyRepository extends AbstractPolymorphicRepository<File> {

}