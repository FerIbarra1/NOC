// src/domain/use-cases/checks/check-service-multiple.test.ts
import { LogEntity } from '../../entities/log.entity';
import { CheckServiceMultiple } from './check-service-multiple';

describe('CheckServiceMultiple UseCase', () => {
  const mockRepo1 = { saveLog: jest.fn(), getLogs: jest.fn() };
  const mockRepo2 = { saveLog: jest.fn(), getLogs: jest.fn() };
  const mockRepo3 = { saveLog: jest.fn(), getLogs: jest.fn() };
  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  // Mock global.fetch antes de los tests
  beforeAll(() => {
    (global as any).fetch = jest.fn(async (url: string) => {
      return { ok: url === 'https://google.com' };
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call successCallback when fetch returns true', async () => {
    const checkService = new CheckServiceMultiple(
      [mockRepo1, mockRepo2, mockRepo3],
      successCallback,
      errorCallback,
    );

    const wasOk = await checkService.execute('https://google.com');

    expect(wasOk).toBe(true);
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();

    expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test('should call errorCallback when fetch returns false', async () => {
    const checkService = new CheckServiceMultiple(
      [mockRepo1, mockRepo2, mockRepo3],
      successCallback,
      errorCallback,
    );

    const wasOk = await checkService.execute('https://goasdfasdfasdfasdogle.com');

    expect(wasOk).toBe(false);
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();

    expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
