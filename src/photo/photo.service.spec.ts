// npx jest --no-cache -t "PhotoService"

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PhotoService } from './photo.service';
import { Photo } from './photo.entity';

const oneItem = new Photo({
  "name": "Some photo",
  "description": "Some description",
  "filename": "some file",
  "views": 0,
  "isPublished": false,
  "user": 4
})
const multipleItems = [oneItem]

const repoDef= {
  find: jest.fn().mockResolvedValue(multipleItems),
  findOneOrFail: jest.fn().mockResolvedValue(oneItem),
  create: jest.fn().mockReturnValue(oneItem),
  save: jest.fn().mockReturnValue(oneItem),
  update: jest.fn().mockResolvedValue(true),
  delete: jest.fn().mockResolvedValue(true),
}

describe('PhotoService', () => {
  let service: PhotoService
  let repository: Repository<Photo>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [], //DatabaseModule
      providers: [
        PhotoService, {
          provide: getRepositoryToken(Photo),
          useValue: repoDef,
        }, {
          provide: "PHOTO_REPOSITORY",
          useValue: repoDef,
        }
      ],
    }).compile();

    service = module.get<PhotoService>(PhotoService);
    repository = module.get<Repository<Photo>>(getRepositoryToken(Photo));
  });

  afterEach(async () => {

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Create', () => {

    const photo= service.create(oneItem)
    
    expect(photo).resolves.toEqual(oneItem)
    expect(repository.create).toBeCalledTimes(1)
    expect(repository.create).toBeCalledWith(oneItem)
    expect(repository.save).toBeCalledTimes(1)

    //console.log((repository.save as jest.Mock).mock)
    //console.log((repository.create as jest.Mock).mock) //.mock.calls[0][0]
  });

});
