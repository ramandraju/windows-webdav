# windows-webdav

This is a open source repository contains the methods for accessing webdav servers as network drives in windows operating system.

# Usage.
Below are the methods to mount or unmount webdav servers.

## mountDisk(mountDiskOptions)
### This method wll let you mount the webdav as a network drive.
  ```js
  import { webdav } from "windows-webdav";

  await webdav.mountDisk({ \
      diskName: 'e',  //diskname should be a alphabet as a-z (required) \
      webdavPath: 'webdavserver.com/user',  // path for the webdav server location (required)\
      userName: 'jhonkinch', // provide userb=name here  (optional) \
      password: 'mySecret' // provide password here (optional)

  });
  
```
## unMountDisk(unMountDiskOptions)
### This method wll let you unmount the connected network drive.
  ```js
  import { webdav } from "windows-webdav";

  await webdav.unMountDisk({ \
      diskName: 'e'  //diskname should be a alphabet as a-z (required) \
  });
```
## Contributing

We welcome contributions to our standard library and standard checks.


## License

The code in this repository is licensed under the [MIT License](LICENSE) by [GitHub](https://github.com).
