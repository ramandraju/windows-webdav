import { exec } from 'child_process';
import { webdav } from '../lib/webdav';
import { MountOptions, UnMountOptions } from '../interfaces/webDav.Interfaces';

jest.mock('child_process');

describe('WebDAV class', () => {

  beforeEach(() => {
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('mountDisk method', () => {
      it('should resolve when mount is successful', async () => {
        const mockMountOptions: MountOptions = {
          diskName: 'Z',
          webdavPath: '\\example\\path',
          userName: 'user',
          password: 'pass',
        };
  
        const expectedMountCMD = 'net use Z: \\example\\path pass /user:user';
        jest.spyOn(webdav, '_checkForWindowsPlatform').mockReturnValue(true);
  
        const execMock = exec as unknown as jest.Mock;
        execMock.mockImplementation((_cmd, callback) => {
          callback(null, 'stdout', '');
        });
  
        await expect(webdav.mountDisk(mockMountOptions)).resolves.toBe('stdout');
        expect(execMock).toHaveBeenCalledWith(expectedMountCMD, expect.any(Function));
      });
  
      it('should reject when mount fails', async () => {
        const mockMountOptions: MountOptions = {
          diskName: 'Z',
          webdavPath: '\\example\\path',
          userName: 'user',
          password: 'pass',
        };
        jest.spyOn(webdav, '_checkForWindowsPlatform').mockReturnValue(true);
  
        const execMock = exec as unknown as jest.Mock;
        execMock.mockImplementation((_cmd, callback) => {
          callback(new Error('Mount error'), '', 'stderr');
        });  
        await expect(webdav.mountDisk(mockMountOptions)).rejects.toThrow('Mount error');
      });
    });

    describe('unMountDisk method', () => {
      it('should resolve when unMount is successful', async () => {
        const mockunMountOptions: UnMountOptions = {
          diskName: 'Z',
        };
        jest.spyOn(webdav, '_checkForWindowsPlatform').mockReturnValue(true);
        const expectedMountCMD = 'net use Z: /delete';    
        const execMock = exec as unknown as jest.Mock;
        execMock.mockImplementation((_cmd, callback) => {
          callback(null, 'stdout', '');
        });
    
        await expect(webdav.unMountDisk(mockunMountOptions)).resolves.toBe('stdout');
        expect(execMock).toHaveBeenCalledWith(expectedMountCMD, expect.any(Function));
      });
    
      it('should reject when mount fails', async () => {
        const mockunMountOptions: UnMountOptions = {
          diskName: 'Z',
        };    
        jest.spyOn(webdav, '_checkForWindowsPlatform').mockReturnValue(true);
        const execMock = exec as unknown as jest.Mock;
        execMock.mockImplementation((_cmd, callback) => {
          callback(new Error('unMount error'), '', 'stderr');
        });  
        await expect(webdav.unMountDisk(mockunMountOptions)).rejects.toThrow('unMount error');
      });
    });
});




