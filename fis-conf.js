//js,css添加hash
fis.match('/www/static/(**.{js,css})', {
  useHash: true
});

// 所有图片加 hash
fis.match('image', {
  useHash: true
});

// 压缩文件
fis.match('/www/static/(**.js)', {
  // fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: fis.plugin('uglify-js')
});

fis.match('/www/static/(**.css)', {
  // fis-optimizer-clean-css 插件进行压缩，已内置
  optimizer: fis.plugin('clean-css')
});

//fis.match('*.png', {
//  // fis-optimizer-png-compressor 插件进行压缩，已内置
//  optimizer: fis.plugin('png-compressor')
//});

// fis-parser-node-sass
fis.match('/www/static/(**.js)', {
    release: '/www/fis_static/$2',
    
});

