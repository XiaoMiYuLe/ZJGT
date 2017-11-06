//资源指定打包
// fis.match('::package', {
//   packager: fis.plugin('map', {
//     '/www/static/js/fis_header.js': [
//       '/www/static/js/jquery-1.11.3.min.js',
//       '/www/static/js/jquery.cookie.js',
//       '/www/static/js/modernizr.js',
//       '/www/static/js/indexMerge.js',
//       '/www/static/js/common.js',
//       '/www/static/js/header.js',
//       '/www/static/js/layer/layer.js'
//     ]
//   })
// })

//发布到哪, 这代表： fis3 release 之后的 -d d:/www/fis_zjgt,以后只要直接执行 fis3 release
fis.match('*', {
  deploy: fis.plugin('local-deliver', {
    to: 'd:/www/fis_zjgt'
  })
})

//css添加hash
fis.match('/www/static/css/(**.css)', {
    useHash: true
});
//js添加hash
fis.match('/www/static/js/(**.js)', {
    useHash: true,
    postprocessor: function(content, file, settings) {
        // 只对 js 类文件进行处理
        // if (!file.isJsLike) return content;

        return content += '\n// build ' + file.filename;
        // return content += '?v=' + v;
    }
});
//所有图片加 hash
fis.match('image', {
    useHash: true
});

// 压缩文件
// fis.match('/www/static/(**.js)', {
//     // fis-optimizer-uglify-js 插件进行压缩，已内置
//     optimizer: fis.plugin('uglify-js')
// });

fis.match('/www/static/(**.css)', {
    // fis-optimizer-clean-css 插件进行压缩，已内置
    optimizer: fis.plugin('clean-css')
});
const expires = new Date();
const v = expires.getTime();
// fis-parser-node-sass
fis.match('/www/static/(**.{js,css,png,gif,jpg})', {
    url: '/static/$1$2'
});
