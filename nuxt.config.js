module.exports = {
  /*
  ** Headers of the page
  */
mode: 'spa',
css: [//{src:'//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons' },
{src:'~/assets/theme/ProficoderTheme.less', lang: 'less' },

],
   plugins: [
  //   { src: '~/plugins/polyfill.js'},
      { src: '~/plugins/uikit.js'},
      { src: '~/plugins/i18n.js'},
      { src: '~/plugins/element.js'},
      { src: '~/plugins/vue-quill-editor.js', ssr: false},
      { src: '~/plugins/scroll.js'},


    ],/* */
  head: {
    script: [
  { src: '/polyfill.min.js' },
    { src: '/eventsource.js' }
],
    title: 'УСЛУГИ-ИЛИМ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' },
      { hid: 'description', name: 'description', content: 'Служба заказов' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons' }
    ]
  },

  /*
  ** Customize the progress bar color
  */
  loading: { color: 'blue',
   height: '2px',
 duration: 1000 },
  /*
  ** Build configuration
  */
  build: {
    transpile:[
        'quill-image-upload',
        'quill-image-drop-module'
    ],
 babel: {

        presets: [
            "@babel/preset-env"
          ],
        plugins: ['@babel/plugin-syntax-dynamic-import']
        },
/*
    ** Run ESLint on save
    */
    vendor: ['axios','ElementUI','UIkit','babel-polyfill','eventsource-polyfill' ],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
