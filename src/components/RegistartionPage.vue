<template>
    <div class="block">
        <form action="/auth/signup" method="POST">
            <h2 class="block-title">Регистрация</h2>
                <div class="form-group">
                    <label for="login" class="form-label">Имя пользователя</label>
                    <input type="text" 
                        id="login" 
                        class="form-input" 
                        :class="{'error': loginError}" 
                        name="login" 
                        v-model.trim="login" 
                        placeholder="Имя пользователя"/>
                    <p class="text-error" v-if="loginError">{{errorLogin}}</p>
                </div>

                <div class="form-group">
                    <label for="email" class="form-label">Почтовый адрес</label>
                    <input type="text" 
                        id="email" 
                        class="form-input" 
                        :class="{'error': emailError}" 
                        name="email" 
                        v-model.trim="email" 
                        placeholder="Почтовый адрес"/>
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

                <div class="form-group">
                    <label for="password2" class="form-label">Подтвердить пароль</label>
                    <input type="password" 
                        id="password2"
                        class="form-input" 
                        :class="{'error': passwordError}" 
                        name="password2" 
                        v-model.trim="repeatedPassword" 
                        placeholder="Подтвердить пароль"/>
                    <p class="text-error" v-if="passwordError">{{errorRepeatedPassword}}</p>
                </div>

                <div class="form-group">
                    <label for="firstName" class="form-label">Имя</label>
                    <input type="text" 
                        id="firstName"
                        class="form-input" 
                        :class="{'error': firstNameError}" 
                        name="firstName" 
                        v-model.trim="firstName" 
                        placeholder="Имя"/>
                    <p class="text-error" v-if="firstNameError">{{errorFirstName}}</p>
                </div>

                <div class="form-group">
                    <label for="lastName" class="form-label">Фамилия</label>
                    <input type="text" 
                        id="lastName"
                        class="form-input" 
                        :class="{'error': lastNameError}" 
                        name="lastName" 
                        v-model.trim="lastName" 
                        placeholder="Фамилия"/>
                    <p class="text-error" v-if="lastNameError">{{errorLastName}}</p>
                </div>

                <div class="form-group">
                    <label for="dateOfBirth" class="form-label">Дата рождения</label>
                    <input type="date" 
                        id="dateOfBirth"
                        class="form-input" 
                        :class="{'error': dateOfBirthError}" 
                        name="dateOfBirth" 
                        v-model.trim="dateOfBirth" 
                        placeholder="Дата рождения"/>
                    <p class="text-error" v-if="dateOfBirthError">{{errorDateOfBirth}}</p>
                </div>

                <div class="form-group">
                    <label for="phone" class="form-label">Номер телефона</label>
                    <input type="text" 
                        id="phone"
                        class="form-input" 
                        :class="{'error': phoneError}" 
                        name="phone" 
                        v-model.trim="phone" 
                        placeholder="Номер телефона"/>
                    <p class="text-error" v-if="phoneError">{{errorPhone}}</p>
                </div>

                <button type="submit" class="btn">Зарегистрироватся</button>

                <a href="/auth/signin" class="link">Отмена</a>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'RegistrationPage'
    }
</script>