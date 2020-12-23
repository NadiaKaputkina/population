<template>
    <form action="/login" method="POST">
        <label for="email">Email</label>
        <input type="text" id="email" name="email" v-model.trim="email" placeholder="Email"/>

        <label for="password">Пароль</label>
        <input type="password" id="password" name="password" v-model.trim="password" placeholder="Пароль"/>

        <button type="submit">Войти</button>

        <p></p>
    </form>
</template>

<script>
    export default {
        name: 'LoginPage',

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
                .then((res) => console.log(res))
                .catch(err => console.log(err))
            }
        }
    }
</script>