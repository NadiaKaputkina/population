<template>
    <div>
        <filters @get-filtered-data="getFilteredData"></filters>
        <table>
            <thead>
                <tr>
                    <th>Номер</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Дата родения</th>
                    <th>Пол</th>
                    <th>Семейное положение</th>
                    <th>Личный номер</th>
                    <th>Дата смерти</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user of users" :key="user.Id"
                    @click="showUser(user.Id)">
                    <td>{{ user.Id }}</td>
                    <td>{{ user.FirstName }}</td>
                    <td>{{ user.LastName }}</td>
                    <td>{{ user.DateOfBirth }}</td>
                    <td>{{ userSexText(user) }}</td>
                    <td>{{ maritalStatusText(user) }}</td>
                    <td>{{ user.IdentificationNumber }}</td>
                    <td>{{ user.DateOfDeath }}</td>
                </tr>
            </tbody>
        </table>

        <button type="button" class="btn" @click="createNewUser">Добавить</button>
    </div>
</template>

<script>
    import Filters from './Filters.vue'

    export default {
        name: 'GetUsers',

        components: {
            Filters
        },

        props: {
            propsUsers: {
                type: Array,
                default: () => []
            }
        },
        
        data() {
            return {
               users: null
            }
        },

        computed: {
            userSexText: () => {
                return (user) => {
                    return user.Sex.ShortTitle;
                }
            },

            maritalStatusText: () => {
                return (user) => {
                    return user.MaritalStatus.Status;
                }
            }
        },

        mounted() {
            this.users = Object.assign([], this.propsUsers)
        },

        methods: {
            getFilteredData(data) {
                fetch('/users/get-filtered-users', {
                    method: 'POST', 
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        this.users = Object.assign([], data)
                    })
            },

            showUser(userId) {
                if (userId) {
                    window.location.href = '/users/' + userId;
                }
            },
            
            createNewUser() {
                  window.location.href = '/users/new';
            }
        }
    }
</script>