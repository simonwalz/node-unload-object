# Unload any object

This software allows to unload any object, i.e. Timers, Sockets.

It is usefull when a function returns something, that may be terminated in different ways.

### Supported JavaScript object

  * Node.js: Timers
  * Node.js: Sockets
  * Browser: Timers


## Install & Usage

```sh
npm install unload-object
```

```js
const unload = require("unload-object").unload;

var t1 = setTimeout(() => { console.log("Hi"); });
unload(t1); // t1 never fires
```

## License

This software is released under the MIT license.

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.
