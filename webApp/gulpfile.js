var gulp = require("gulp");
var $ = require("gulp-load-plugins")(); //用来加载所有gulp插件，并可通过$调用

var open = require("open");

var app = {
	srcPath: 'src/', //源文件目录
	devPath: 'build/', //开发编译目录
	prdPath: 'dist/' //发布部署目录
};

//定义命令lib
gulp.task('lib', function() {
	gulp.src('bower_components/**/*.js') //获取该目录下，**代表递归拿所有，*.js拿所有js格式文件
		.pipe(gulp.dest(app.devPath + 'vendor')) //拷贝到编译目录下的vendor目录
		.pipe(gulp.dest(app.prdPath + 'vendor'))
		.pipe($.connect.reload()); //重刷新浏览器
});

gulp.task('html', function() {
	gulp.src(app.srcPath + '/**/*.html')
		.pipe(gulp.dest(app.devPath))
		.pipe(gulp.dest(app.prdPath))
		.pipe($.connect.reload());
});

gulp.task('json', function() {
	gulp.src(app.srcPath + 'data/**/*.json')
		.pipe(gulp.dest(app.devPath + 'data'))
		.pipe(gulp.dest(app.prdPath + 'data'))
		.pipe($.connect.reload());
});

gulp.task('less', function() {
	gulp.src(app.srcPath + 'style/index.less')
		//先编译less
		.pipe($.less())
		//再写入到其他两个目录的css文件夹
		.pipe(gulp.dest(app.devPath + 'css'))
		//压缩css代码
		.pipe($.cssmin())
		.pipe(gulp.dest(app.prdPath + 'css'))
		.pipe($.connect.reload());
});

gulp.task('js', function() {
	gulp.src(app.srcPath + 'script/**/*.js')
		//合并所有js代码并导入index.js
		.pipe($.concat('index.js'))
		.pipe(gulp.dest(app.devPath + 'js'))
		//压缩js代码
		.pipe($.uglify())
		.pipe(gulp.dest(app.prdPath + 'js'))
		.pipe($.connect.reload());
});

gulp.task('image', function() {
	gulp.src(app.srcPath + 'image/**/*')
		.pipe(gulp.dest(app.devPath + 'image'))
		//压缩图片
		.pipe($.imagemin())
		.pipe(gulp.dest(app.prdPath + 'image'))
		.pipe($.connect.reload());
});

//定义构建命令，传入之前命令作为依赖
gulp.task('build', ['image', 'js', 'less', 'lib', 'html', 'json']);

//清除命令
gulp.task('clean', function() {
	gulp.src([app.srcPath, app.prdPath])
		.pipe($.clean());
});

//定义启动服务命令,注意启动的是build目录下的index.html
gulp.task('serve', ['build'], function() {
	$.connect.server({
		root: [app.devPath],
		livereload: true, //自动刷新浏览器，不支持ie
		port: 1234
	});
	open("http://localhost:1234");

	//监控文件变化以自动更新dist和build目录
	gulp.watch(app.srcPath + 'script/**/*.js', ['js']);
	gulp.watch('bower_components/**/*', ['lib']);
	gulp.watch(app.srcPath + '/**/*.html', ['html']);
	gulp.watch(app.srcPath + 'data/**/*.json', ['json']);
	gulp.watch(app.srcPath + 'style/**/*.less', ['less']);
	gulp.watch(app.srcPath + 'image/**/*', ['image']);
});

//定义gulp命令的默认行为
gulp.task('default', ['serve']);