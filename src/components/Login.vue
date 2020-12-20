<template>
    <form>
        <label for="email">Email</label>
        <input type="text" id="email" v-model="email" placeholder="Email"/>

        <label for="password">Пароль</label>
        <input type="password" id="password" v-model="password" placeholder="Пароль"/>

        <button type="submit" @click.prevent="onLogIn">Войти</button>
    </form>
</template>

<script>
    export default {
        name: 'Login',

        data() {
            return {
                email: '',
                password: ''
            }
        },

        methods: {
            onLogIn() {
                const data = {
                    email: this.email,
                    password: this.password
                }
                
                fetch('/login', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(err => console.log(err))
            }
        }
    }
</script>