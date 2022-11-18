<template>
    <header >
      <RouterLink to="/" class="w-10">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      </RouterLink>
  
        <nav v-if="isLoggedIn">
          <button @click="logout">Logout</button>
        </nav>
        <nav v-else>
          <RouterLink to="/signup">Sign up</RouterLink>
          <RouterLink to="/login">Login</RouterLink>
        </nav>
    </header>
</template>

<script>
import {defineComponent} from 'vue'
import {HTTP} from '../plugins/axios'
  export default defineComponent({
    computed:{
        isLoggedIn(){
            return this.$store.state.auth.isLoggedIn
        }
    },
    methods:{
        async logout(){
            try{
                await HTTP.delete('/user/logout')
                this.$store.commit('auth/setUserInfo', null)
                this.$store.commit('auth/setIsLoggedIn', false)
                this.$router.push('/login')
            }catch(e){
                console.log(e);
            }
        }
    }
  })
</script>

<style scoped>
  nav{
      @apply flex gap-x-4;
    }
    header{
      @apply flex justify-between shadow-md w-full p-4 sticky top-0 z-10 bg-white;
    }
    nav a.router-link-exact-active {
    @apply underline;
  }
  
  nav a.router-link-exact-active:hover {
  } 

</style>