<script>
import { defineComponent } from 'vue'
import { HTTP } from './plugins/axios'
import HeaderSection from './components/HeaderSection.vue'
export default defineComponent({
  async beforeCreate() {
    try {
      const { data: userInfo } = await HTTP.get('/user/info')
      console.log(userInfo)
      this.$store.commit('auth/setUserInfo', userInfo)
      this.$store.commit('auth/setIsLoggedIn', true)
    } catch (error) {

    }
  },
  components: {
    HeaderSection
  }
})
</script>

<template>
  <main>
    <header-section />
    <RouterView class="mt-8 px-12" />
  </main>
</template>

<style scoped>

</style>
