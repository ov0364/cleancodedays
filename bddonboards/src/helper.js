function asyncCompare(options, fnEqual, fnNotEqual, fnTimeout) {
    var casper1 = options.Casper.create();
    casper1.options.waitTimeout = options.waitTimeout;
    casper1.start();
    casper1.viewport(options.viewport.width, options.viewport.height);

    casper1.open(options.resemblejsUrl, function () {});

    casper1.then(function () {
        this.fill('form#image-diff', {
            'one': options.expect,
            'two': options.actual
        });
    });

    casper1.then(function () {
        this.evaluate(function () {
            window._imagediff_.run();
        });
    });

    casper1.then(function () {
        this.waitFor(
            function check() {
                return this.evaluate(function () {
                    return window._imagediff_.hasResult;
                });
            },
            function () {

                var data = casper1.evaluate(function () {
                    return window._imagediff_.getResult();
                });

                if (Number(data.misMatchPercentage) > 0) {
                    fnNotEqual(data);
                } else {
                    fnEqual(data);
                }

            }, function () {
                fnTimeout();
            },
            options.waitTimeout
        );
    });

    casper1.run(function () {});
}

function AsyncMatcher() {
    var isStopped = false;

    function FnNotEqual(asyncMatcher, options, i, fnEqual, fnTimeout) {
        return function () {
            i = i + 1;
            asyncMatcher.waitForEqual(options, i, fnEqual, fnTimeout);
        }
    }

    this.stop = function () {
        isStopped = true;
    };

    this.waitForEqual = function (options, i, fnEqual, fnTimeout) {
        if (!isStopped) {
            var snapshot = options.expect.split(".png")[0] + i + ".png";
            snapshot = snapshot.replace("expect", "snapshot");
            options.casper.capture(snapshot);

            asyncCompare({
                    expect: options.expect,
                    actual: snapshot,
                    Casper: options.Casper,
                    waitTimeout: options.waitTimeout,
                    viewport: options.viewport,
                    resemblejsUrl: options.resemblejsUrl
                }, function () {
                    fnEqual();
                }, new FnNotEqual(this, options, i, fnEqual, fnTimeout),
                function () {
                    fnTimeout();
                });
        }
    };
}

exports.waitUntilEqual = function (options, fnEqual, fnTimeout) {
    options.casper.then(function () {
        var isCompared = false,
            asyncMatcher = new AsyncMatcher();

        asyncMatcher.waitForEqual(options, 0, function () {
            isCompared = true;
        }, function () {
            fnTimeout();
        });

        this.waitFor(function check() {
                return isCompared;
            },
            function () {
                isCompared = false;
                var actual = options.expect;
                actual = actual.replace("expect", "actual");
                options.casper.capture(actual);
                fnEqual();
            },
            function () {
                asyncMatcher.stop();

                var actual = options.expect;
                actual = actual.replace("expect", "actual");
                options.casper.capture(actual);
                fnTimeout();
            },
            options.waitTimeout);

    });
};