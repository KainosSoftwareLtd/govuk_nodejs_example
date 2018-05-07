var gulp = require('gulp')
var sass = require('gulp-sass')

gulp.task('assets', function () {
  gulp.src('node_modules/govuk_frontend_toolkit/javascripts/**/*')
    .pipe(gulp.dest('app/govuk_modules/govuk_frontend_toolkit/javascripts', { overwrite: true }))

  gulp.src('node_modules/govuk_frontend_toolkit/images/**/*')
    .pipe(gulp.dest('app/govuk_modules/govuk_frontend_toolkit/images', { overwrite: true }))

  gulp.src('node_modules/govuk_template_jinja/assets/**/*')
    .pipe(gulp.dest('app/govuk_modules/govuk_template/', { overwrite: true }))
})

gulp.task('templates', function () {
  gulp.src('node_modules/govuk_template_jinja/views/layouts/govuk_template.html')
    .pipe(gulp.dest('app/views/', { overwrite: true }))
})

gulp.task('sass', function () {
  gulp.src('app/assets/sass/**/*.scss')
    .pipe(sass({
      style: 'expanded',
      sourcemap: true,
      includePaths: [
        'node_modules/govuk-elements-sass/public/sass',
        'node_modules/govuk_frontend_toolkit/stylesheets',
        'app/govuk_modules/govuk_template/assets/stylesheets',
        'app/govuk_modules/govuk_frontend_toolkit/stylesheets',
        'app/govuk_modules/govuk-elements-sass/'
      ],
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('app/public/stylesheets'))
})

gulp.task('generate-assets', ['assets', 'templates', 'sass'])

gulp.task('default', ['generate-assets'])
