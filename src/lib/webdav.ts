import { exec } from 'child_process';
import { MountOptions, UnMountOptions } from '../interfaces/webDav.Interfaces';

class WebDAV {

    public mountDisk = (mountOptions: MountOptions) => {
        return new Promise((resolve, reject) => {
            if (this._checkForWindowsPlatform()) {
                let mountCMD = this._prepareMountCMD(mountOptions);
                exec(mountCMD, (error, stdout, stderr) => {
                    if (error || stderr) {
                        reject({msg: `Unable to mount Disk ${mountOptions.diskName}, Please check config`});
                    } else {
                        resolve({msg: `Disk ${mountOptions.diskName} mounted sucessfully`});
                    }
                });
            } else {
                reject(new Error(`Unsupported platform.`));
            }
        });
    }

    public unMountDisk = (unMountOptions: UnMountOptions) => {
        return new Promise((resolve, reject) => {
            if (this._checkForWindowsPlatform()) {
                let unMountCMD = this._prepareUnMountCMD(unMountOptions);
                exec(unMountCMD, (error, stdout, stderr) => {
                    if (error || stderr) {
                        reject({msg: `Unable to unmount Disk ${unMountOptions.diskName}, Please check config`});
                    } else {
                        resolve({msg: `Disk ${unMountOptions.diskName} unmounted sucessfully`});
                    }
                });
            } else {
                reject(new Error(`Unsupported platform.`));
            }
        });
    }

    _prepareMountCMD = (mountOptions: MountOptions) => {
        let mountCMD = `net use ${mountOptions.diskName}:`;
        if (mountOptions.webdavPath?.startsWith('\\\\')) {
            mountCMD = mountCMD + ` ${mountOptions.webdavPath}`
        } else {
            mountCMD = mountCMD + ` \\\\${mountOptions.webdavPath}`
        }
        if (mountOptions.userName && mountOptions.password) {
            mountCMD = mountCMD + ` ${mountOptions.password} /user:${mountOptions.userName}`
        }
        return mountCMD;
    }

    _prepareUnMountCMD = (unMountOptions: UnMountOptions) => {
        return `net use ${unMountOptions.diskName}: /delete`;
    }

    _checkForWindowsPlatform = () => {
        return process.platform === "win32"
    }
}

export const webdav = new WebDAV();
