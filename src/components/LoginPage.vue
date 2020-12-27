<template>
    <div class="card">
        <form action="/auth/signin" method="POST">
            <h3 class="card-title">Вход в систему</h3>
            <div class="form-group">
                <label for="email" class="form-label">Имя пользователя или почта</label>
                <input type="text" 
                    id="email" 
                    class="form-input" 
                    :class="{'error': emailError}" 
                    name="email" 
                    v-model.trim="email" 
                    placeholder="Имя пользователя или почта"/>
                <p class="text-error" v-if="emailError">{{errorEmail}}</p>
            </div>

            <div class="form-group">
                <label for="password" class="form-label">Пароль</label>
                <input type="password" 
                    id="password"
                    class="form-input" 
                    :class="{'error': passwordError}" 
                    name="password" 
                    v-model.trim="password" 
                    placeholder="Пароль"/>
                <p class="text-error" v-if="passwordError">{{errorPassword}}</p>
            </div>

            <button type="submit" class="btn w-100">Войти</button>
        </form>

        <a href="/auth/signup" class="link">Регистрация</a>
    </div>
</template>

<script>
    export default {
        name: 'LoginPage',

        props: {
            errorEmail: {
                type: String,
                default: ''
            },
            errorPassword: {
                type: String,
                default: ''
            }
        },

        data() {
            return {
                email: 'nadia',
                password: 's@msolut1ons',
            }
        },

        computed: {
            emailError: function() {
                return Boolean(this.errorEmail);
            },
            
            passwordError: function() {
                return Boolean(this.errorPassword);
            },
        }

    }
</script>