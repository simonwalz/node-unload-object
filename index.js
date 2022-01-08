/**
 * Unload any object
 *
 * @param {any} object
 * @example
 * const unload = require("unload-object").unload;
 * var t1 = setTimeout(() => { console.log("Hi"); }, 100);
 * unload(t1); // t1 will not fire
 */
exports.unload = function(object) {
	if (typeof object === "function") {
		if (typeof object.remove === "function") {
			object.remove();
		} else {
			object(exports.unload);
		}
	} else if (typeof object === "object" && object !== null) {
		if (Array.isArray(object)) {
			object.forEach(function(o, i) {
				exports.unload(o);
				// unset item:
				object[i] = null;
			});
		// nodejs timers and sockets
		} else if (typeof object.close === "function") {
			try {
				object.close();
			} catch(e) {}
		// some objects:
		} else if (typeof object.destroy === "function") {
			object.destroy();
		// some objects:
		} else if (typeof object.cancel === "function") {
			object.cancel();
		} else if (typeof object.end === "function") {
			object.end();
		// Promise:
		} else if (typeof object.then === "function") {
			object.then(function(value) {
				exports.unload(value);
			}, function(err) {
				exports.unload(value);
			});
		// subscribe:
		} else if (typeof object.remove === "function") {
			object.remove();
		// osiota node:
		} else if (typeof object.unannounce === "function") {
			object.unannounce();
		// osiota app:
		} else if (typeof object._unload === "function") {
			object._unload();
		}
		// JS Timer
		else if (object.constructor.name === "Immediate") {
			clearImmediate(object);
		} else if (object.constructor.name === "Timeout") {
			// is closed by close function.
			clearTimeout(object);
		}
	// JS Timer
	} else if (typeof object === "number") {
		clearTimeout(object);
	}

	return null;
};

