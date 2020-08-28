module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/styles.scss";`
      }
    }
  },
  devServer: {

    proxy: 'http://localhost:8080'
    }
};