import { TskvLogger } from './tskv-logger';

describe('TskvLogger tests', () => {
  let tskvLogger: TskvLogger;

  beforeEach(() => {
    tskvLogger = new TskvLogger();
  });

  it('should log formatted message correctly', () => {
    const mockFunction = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    const message = 'Test log message';
    const optionalParams = 'Test params';

    tskvLogger.log(message, optionalParams);

    const result = `level=log\tmessage=${message}\toptionalParams=${optionalParams}\n`;

    expect(mockFunction).toHaveBeenCalledWith(result);
  });

  it('should log error message correctly', () => {
    const mockFunction = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const message = 'Test error message';
    const optionalParams = 'Test params';

    tskvLogger.error(message, optionalParams);

    const result = `level=error\tmessage=${message}\toptionalParams=${optionalParams}\n`;

    expect(mockFunction).toHaveBeenCalledWith(result);
  });

  it('should log warn message correctly', () => {
    const mockFunction = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    const message = 'Test warn message';
    const optionalParams = 'Test params';

    tskvLogger.warn(message, optionalParams);

    const result = `level=warn\tmessage=${message}\toptionalParams=${optionalParams}\n`;

    expect(mockFunction).toHaveBeenCalledWith(result);
  });
});
