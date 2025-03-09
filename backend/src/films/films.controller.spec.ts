import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let filmsController: FilmsController;
  let filmsService: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        getAllFilms: jest
          .fn()
          .mockResolvedValue([{ id: 'test-id1' }, { id: 'test-id2' }]),
        getScheduleById: jest.fn().mockResolvedValue({ id: 'test-id3' }),
      })
      .compile();

    filmsController = module.get<FilmsController>(FilmsController);
    filmsService = module.get<FilmsService>(FilmsService);
  });

  it('.getAllFilms() should call .getAllFilms() from service', async () => {
    const films = await filmsController.getAllFilms();

    expect(films).toEqual([{ id: 'test-id1' }, { id: 'test-id2' }]);
    expect(filmsService.getAllFilms).toHaveBeenCalled();
  });

  it('.getFilmScheduleById() should call .getScheduleById() from service', async () => {
    const id = 'test-id3';
    const film = await filmsController.getFilmScheduleById(id);

    expect(film).toEqual({ id: 'test-id3' });
    expect(filmsService.getScheduleById).toHaveBeenCalledWith(id);
  });
});
