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
        <form @submit.prevent="signUp" class="flex flex-col gap-y-4 w-full lg:w-1/3 mx-auto pb-8">
            <input type="text" class="border rounded-md px-4 py-2"  placeholder="First Name" v-model="userInfo.firstName">
            <input type="text" class="border rounded-md px-4 py-2"  placeholder="Last Name" v-model="userInfo.lastName">
            <input type="text" class="border rounded-md px-4 py-2"  placeholder="Username" v-model="userInfo.username">
            <input type="email" class="border rounded-md px-4 py-2"  placeholder="Email" v-model="userInfo.email">
            <input type="password" class="border rounded-md px-4 py-2"  placeholder="Password" v-model="userInfo.password">
            <input type="password" class="border rounded-md px-4 py-2"  placeholder="Confirm Password" v-model="userInfo.cPassword">
            <button class="btn">Sign Up</button>
        </form>
    </main>
  </template>
  
<script >
import { defineComponent } from 'vue'

export default defineComponent({
    data(){
        return {
            userInfo : {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                cPassword: '',
            },
            errors: [] 
        }
    },
    created(){
        // this.$store.dispatch('auth/test')
    },
    methods: {
        async signUp() {
            this.errors = []
        if(this.userInfo.firstName.length < 5)
            this.errors.push("First name must be at least 5 characters")
        if(this.userInfo.lastName.length < 5)
            this.errors.push("Last name must be at least 5 characters")
        if(this.userInfo.username.length < 4)
            this.errors.push("Username must be at least 4 characters")
        if(this.userInfo.password.length < 9)
            this.errors.push("Password must be at least 9 characters")
        if(this.userInfo.password !== this.userInfo.cPassword)
            this.errors.push("Password doesn't match confirm password")

        if(this.errors.length > 0) return

        const keys = Object.keys(this.userInfo).filter(key => key !== 'cPassword')
        let payload = {}
        
        keys.forEach(key => {
            payload[key] = this.userInfo[key]
        })
        console.log(payload);
        await this.$store.dispatch('auth/signUp', payload)

    }   
    }
})

</script>
  
  