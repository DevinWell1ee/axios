<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Http from '../abc-http/index';
const http = new Http({
  options: {
    baseURL: 'https://www.fastmock.site/mock/eca5b8ba2041d9afd91fd0f5910e31e9/api'
  }
})

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  created() {
    // http.get({
    //   url: '/list'
    // })
    //   .then(res => {
    //     console.log(res)
    //   })

    http.post({
      url: '/add',
      config: {
        contentType: 'formData',
        header: {
          'Abc-Client-Info': 'adsasd'
        }
      },
      data: {
        aa: '1'
      }
    }).then(res => {
      console.log(res)
    })
  }
}
</script>
