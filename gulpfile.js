const {src, dest, series, watch} = require(`gulp`),
    browserSync = require(`browser-sync`),
    htmlCompressor = require(`gulp-htmlmin`),
    babel = require(`gulp-babel`),
    jsLinter = require(`gulp-eslint`),
    jsCompressor = require(`gulp-uglify`),
    sass = require(`gulp-sass`)(require(`sass`)),
    reload = browserSync.reload;

let browserChoice = `default`;

async function brave () {
    browserChoice = `brave browser`;
}

async function chrome () {
    browserChoice = `google chrome`;
}

async function edge () {
    browserChoice = `microsoft edge`;
}

async function firefox () {
    browserChoice = `firefox`;
}

async function opera () {
    browserChoice = `opera`;
}

async function safari () {
    browserChoice = `safari`;
}

async function vivaldi () {
    browserChoice = `vivaldi`;
}

async function allBrowsers () {
    browserChoice = [
        `brave browser`,
        `google chrome`,
        `microsoft edge`,
        `firefox`,
        `opera`,
        `safari`,
        `vivaldi`
    ];
}

let compileCSSForDev = () => {
    return src(`./dev/css/style.css`)
        .pipe(sass.sync({
            outputStyle: `expanded`,
            precision: 10
        }).on(`error`, sass.logError))
        .pipe(dest(`temp/css`));
};

let lintJS = () => {
    return src(`./dev/js/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let transpileJSForDev = () => {
    return src(`./dev/js/*.js`)
        .pipe(babel())
        .pipe(dest(`temp/js`));
};


let compressHTML = () => {
    return src([`./dev/html/*.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let compileCSSForProd = () => {
    return src(`./dev/css/*.css`)
        .pipe(sass.sync({
            outputStyle: `compressed`,
            precision: 10
        }).on(`error`, sass.logError))
        .pipe(dest(`prod/css`));
};

let transpileJSForProd = () => {
    return src(`./dev/js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

let copyUnprocessedAssetsForProd = () => {
    return src([
        `*.*`,
        `**`,
        `!temp/**`,
        `!temp`,
        `!prod/**`,
        `!prod`,
        `!README.md`,
        `!gulpfile.js`,
        `!package-lock.json`,
        `!package.json`,
        `!node_modules/`,
        `!node_modules/**`,
        `!dev/**`,
        `!dev/**/*.js`,
        `!dev/*.js`,
        `!dev/*/*.css`,
        `!dev/**/*`,
        `!dev/*/.html`
    ], {dot: true})
        .pipe(dest(`prod`));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `temp`,
                `./`,
                `./dev/html`
            ]
        }
    });

    watch(`./dev/js/*.js`, series(lintJS, transpileJSForDev))
        .on(`change`, reload);

    watch(`./dev/css/*.css`, compileCSSForDev)
        .on(`change`, reload);
};

exports.brave = series(brave, serve);
exports.chrome = series(chrome, serve);
exports.edge = series(edge, serve);
exports.firefox = series(firefox, serve);
exports.opera = series(opera, serve);
exports.safari = series(safari, serve);
exports.compressHTML = compressHTML;
exports.vivaldi = series(vivaldi, serve);
exports.allBrowsers = series(allBrowsers, serve);
exports.compileCSSForProd = compileCSSForProd;
exports.lintJS = lintJS;
exports.transpileJSForProd = transpileJSForProd;
exports.transpileJSForDev = transpileJSForDev;
exports.default = serve;
exports.copyUnprocessedAssetsForProd = copyUnprocessedAssetsForProd;
exports.serve = series(
    compileCSSForDev,
    lintJS,
    transpileJSForDev,
    serve
);
exports.build = series(
    compressHTML,
    compileCSSForProd,
    transpileJSForProd,
    copyUnprocessedAssetsForProd
);
