#!/usr/bin/env node

var test = require("tape");

const unload = require("../").unload;

test('provide function', function (t) {
	t.plan(1);
	t.ok(typeof unload === "function")
});

test('unload callback', function (t) {
	t.plan(1);
	var o = () => {
		t.ok(1, "Callback executated");
	}
	unload(o);
});


test('unload Node.js Timer', function (t) {
	t.plan(1);
	var t1 = setTimeout(() => {
		t.fail("Timer was fired");
	}, 10);
	unload(t1);
	setTimeout(() => {
		t.ok("Timer not fired", 100);
	});
});

test('unload Node.js Immediate', function (t) {
	t.plan(1);
	var t2 = setImmediate(() => {
		t.fail("Immediate was fired");
	});
	unload(t2);
	setTimeout(() => {
		t.ok("Immediate not fired", 100);
	});
});

test('unload Node.js Interval', function (t) {
	t.plan(1);
	var t3 = setInterval(() => {
		t.fail("Interval was fired");
	}, 10);
	unload(t3);
	setTimeout(() => {
		t.ok("Interval not fired", 100);
	});
});


test('unload Socket (via close)', function (t) {
	t.plan(1);
	var mock = {
		"close": () => {
			t.ok(1, "unloaded");
		}
	};
	unload(mock);
});
test('unload via destroy', function (t) {
	t.plan(1);
	var mock = {
		"destroy": () => {
			t.ok(1, "unloaded");
		}
	};
	unload(mock);
});
test('unload via destroy', function (t) {
	t.plan(1);
	var mock = {
		"destroy": () => {
			t.ok(1, "unloaded");
		}
	};
	unload(mock);
});
test('unload via cancel', function (t) {
	t.plan(1);
	var mock = {
		"cancel": () => {
			t.ok(1, "unloaded");
		}
	};
	unload(mock);
});
test('unload via end (ie pipes)', function (t) {
	t.plan(1);
	var mock = {
		"end": () => {
			t.ok(1, "unloaded");
		}
	};
	unload(mock);
});
test('unload via remove', function (t) {
	t.plan(1);
	var mock = {
		"remove": () => {
			t.ok(1, "unloaded");
		}
	};
	unload(mock);
});
test('unload via unannounce', function (t) {
	t.plan(1);
	var mock = {
		"unannounce": () => {
			t.ok(1, "unloaded");
		}
	};
	unload(mock);
});
test('unload via _unload', function (t) {
	t.plan(1);
	var mock = {
		"_unload": () => {
			t.ok(1, "unloaded");
		}
	};
	unload(mock);
});


test('unload result of a promise', function (t) {
	t.plan(1);

	// Node.js Promises can not be canceled. But the Result can be
	// unloaded.
	var p = new Promise((resolve) => {
		setTimeout(() => {
			resolve(() => {
				t.ok(1, "unloaded");
			});
		}, 10);
	});

	unload(p);
});

test('no error on undefined, null, true, false', function (t) {
	t.plan(1);

	unload(undefined);
	unload(null);
	unload(true);
	unload(false);
	t.ok(1, "no error");
});
