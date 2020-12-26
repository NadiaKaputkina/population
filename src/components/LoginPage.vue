<template>
    <form class="card">
        <h3 class="card-title">Вход в систему</h3>
        <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input type="text" id="email" class="form-input" :class="{'error': emailError}" name="email" v-model.trim="email" placeholder="Email"/>
            <template v-if="emailError">{{errorText}}</template>
        </div>

        <div class="form-group">
            <label for="password" class="form-label">Пароль</label>
            <input type="password" id="password" class="form-input" :class="{'error': passwordError}" name="password" v-model.trim="password" placeholder="Пароль"/>
            <template v-if="passwordError">{{errorText}}</template>
        </div>

        <button type="button" @click.prevent="onLogIn" class="btn btn-block">Войти</button>
    </form>
</template>

<script>
    export default {
        name: 'LoginPage',

        data() {
            return {
                email: '',
                password: '',
                error: {
                    email: '',
                    password: ''
                }
            }
        },

        computed: {
            emailError
        },

        methods: {
            onLogIn() {
                const data = {
                    email: this.email,
                    password: this.password
                }
                
                fetch('/auth/signin', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    const { email, password } = data;
                    this.error
                })
                .catch(err => console.log(err))
            }
        },

        onClear() {
            this.email = '';
            this.password = ''
        },

    }
</script>