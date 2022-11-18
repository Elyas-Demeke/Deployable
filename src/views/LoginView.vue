<template>
    <main class="flex flex-col gap-y-4">
        <div class="flex flex-col gap-y-3 w-full lg:w-1/3 mx-auto" v-if="errors.length">
            <div class="flex rounded-md px-4 py-2 bg-red-300 relative" v-for="(error, index) in errors" :key="error">
                <p class="text-red-800" >
                    {{error}}
                </p>
                <button class="font-bold absolute right-3 " @click="errors = errors.filter((error, i) => i !== index)">x</button>
            </div>
            
        </div>
        <form @submit.prevent="login" class="flex flex-col gap-y-4 w-full lg:w-1/3 mx-auto pb-8">
            <input type="text" class="border rounded-md px-4 py-2"  placeholder="Username" v-model="userInfo.username">
            <input type="password" class="border rounded-md px-4 py-2"  placeholder="Password" v-model="userInfo.password">
            <button class="btn">Login</button>
        </form>
    </main>
</template>

<script >
import { defineComponent } from 'vue'

export default defineComponent({
    data(){
        return {
            userInfo : {
                username: '',
                password: '',
            },
            errors: [] 
        }
    },
    created(){
        
    },
    methods: {
         doesHttpOnlyCookieExist(cookiename) {
        var d = new Date();
        d.setTime(d.getTime() + (1000));
        var expires = "expires=" + d.toUTCString();

        document.cookie = cookiename + "=new_value;path=/;" + expires;
        return document.cookie.indexOf(cookiename + '=') == -1;
        },
        async login() {
        this.errors = []
        if(this.userInfo.username.length < 4)
            this.errors.push("Username must be at least 4 characters")
        if(this.userInfo.password.length < 9)
            this.errors.push("Password must be at least 9 characters")

        if(this.errors.length > 0) return
        try{
            await this.$store.dispatch('auth/login', this.userInfo)
            console.log(this.$store.state.auth);
            this.$router.push('/')
        }catch(e){
            console.log(e.message);
            this.errors.push(e)
        }

    }   
    }
})
</script>

<style lang="scss" scoped>

</style>