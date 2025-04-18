// src/domain/use-cases/checks/check-service.test.ts
import { LogEntity } from '../../entities/log.entity';
import { CheckService } from './check-service';

describe('CheckService UseCase', () => {
  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  // Antes de cualquier test, sobreescribimos global.fetch
  beforeAll(() => {
    (global as any).fetch = jest.fn(async (url: string) => {
      // simulamos ok=true solo para google.com
      return { ok: url === 'https://google.com' };
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call successCallback when fetch returns true', async () => {
    const checkService = new CheckService(
      mockRepository,
      successCallback,
      errorCallback,
    );

    const wasOk = await checkService.execute('https://google.com');

    expect(wasOk).toBe(true);
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test('should call errorCallback when fetch returns false', async () => {
    const checkService = new CheckService(
      mockRepository,
      successCallback,
      errorCallback,
    );

    const wasOk = await checkService.execute('https://goasdfasdfasdfasdogle.com');

    expect(wasOk).toBe(false);
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
