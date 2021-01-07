<template>
    <div class="modal">
        <div class="modal-dialog">
            <header class="modal-header">
        
            </header>
            <main class="modal-main">
                <div class="form-group">
                    <input type="search" placeholder="Фамилия" class="form-input"
                        v-model="LastName"/>
                </div>
                <div class="form-group">
                    <input type="text" placeholder="Личный номер" class="form-input"
                        v-model="IdentificationNumber"/>
                </div>
                <button type="button" class="btn" @click="searchUserByParams">Поиск</button>
               
                <ul v-if="isUserFound">
                    <li v-for="user of users" :key="user.Id">
                        <input type="checkbox" v-model="selectedUsersIds" :value="user.Id"/>
                        <span>{{user.LastName}}</span>
                        <span>{{user.FirstName}}</span>
                        <span>{{user.DateOfBirth}}</span>
                        <span>{{user.SexId}}</span>
                        <span>{{user.IdentificationNumber}}</span>
                    </li>
                </ul>
                <p v-else>{{userNotFoundText}}</p>
            </main>
            <footer class="modal-footer">
                <button type="button" class="btn" @click="onCancel">Отмена</button>
                <button type="button" class="btn" :disabled="!isUserFound" @click="onAddParent">Добавить</button> 
            </footer>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Modal',

        props: {
            DateOfBirthCurrentUser: {
                type: String,
                default: '',
            }
        },

        data() {
            return {
                IdentificationNumber: '',
                LastName: '',

                users: [],
                selectedUsersIds: [],

                isUserFound: false,
                userNotFoundText: '',
            }
        },

        methods: {
            onCancel() {
                this.$emit('closeModal')
            },

            onAddParent() {
                this.$emit('addParent', this.users[this.selectedUser])
            },

            clearFilter() {
                this.IdentificationNumber = '';
                this.LastName = '';
            },

            searchUserByParams() {
                const searchParams = {
                    DateOfBirthCurrentUser: this.DateOfBirthCurrentUser,
                    IdentificationNumber: this.IdentificationNumber,
                    LastName: this.LastName
                }

                fetch('/users/get-person-by-search-params', {
                    method: 'POST', 
                    body: JSON.stringify(searchParams),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        if (Array.isArray(data)) {
                            this.users = Object.assign([], data)
                            this.isUserFound = true; 
                        } else {
                            this.userNotFoundText = data.text;
                        }
                        this.clearFilter();
                    })
                    .catch((err) => console.error(err))
            }
        }
    }
</script>