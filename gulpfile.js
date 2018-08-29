const gulp = require('gulp');
const connect = require('connect');
const serveStatic = require('serve-static');
const fs = require('fs');
const path = require('path');

const buildDir = `${__dirname}/wasm`;

gulp.task('clean', () => {
    const files = fs.readdirSync(buildDir);
    for (const file of files) {
        fs.unlinkSync(path.join(buildDir, file));
    }
});

gulp.task('build-folder', () => {
    if (!fs.existsSync(buildDir)) {
        fs.mkdirSync(buildDir);
    }
});

gulp.task('build', ['build-folder'], (done) => {
    const compiler = require('webassembly/cli/compiler');

    compiler.main(
        ['-o', `${buildDir}/hello.wasm`, `${__dirname}/hello.c`],
        (err, filename) => {
            if (err)
                throw err;

            done();
        });
});

gulp.task('build2', ['build-folder'], (done) => {
    const compiler = require('webassembly/cli/compiler');

    compiler.main(
        ['-o', `${buildDir}/hello2.wasm`, `${__dirname}/hello2.c`],
        (err, filename) => {
            if (err)
                throw err;

            done();
        });
});

gulp.task('serve', ['build', 'build2'], (done) => {
    const port = 8080;
    const setHeaders = (res, path) => {
        const ext = path.split('.').pop().toLowerCase();
        let contentType;
        switch (ext) {
            case 'wasm':
                contentType = 'application/wasm';
                break;

            case 'js':
                contentType = 'text/javascript';
                break;

            case 'html':
            case 'css':
                contentType = `text/${ext}`;
                break;
        }

        if (contentType) {
            res.setHeader('Content-Type', contentType);
        }
    };

    console.log(`Serving HTTP on http://localhost:${port} ...`);
    connect()
        .use(serveStatic(__dirname, { 'setHeaders': setHeaders }))
        .use((req, res, next) => {
            const url = req.url;
            console.log(url);
            next();
        })
        .listen(port, done);
});

gulp.task('default', ['serve']);
