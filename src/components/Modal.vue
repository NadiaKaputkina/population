<template>
    <div class="modal">
        <div class="modal-dialog">
            <header class="modal-header">
        
            </header>
            <main class="modal-main">
                <label>
                    Личный номер
                    <input type="text" v-model="IdentificationNumber">
                    <button type="button" @click="searchUserByIdentificationNumber">Поиск</button>
                </label>

                <p v-if="isUserFound">
                    <span>{{user.LastName}}</span>
                    <span>{{user.FirstName}}</span>
                    <span>{{user.DateOfBirth}}</span>
                    <span>{{user.SexId}}</span>
                    <span>{{user.IdentificationNumber}}</span>
                </p>
                <p v-else>Не найден</p>
            </main>
            <footer class="modal-footer">
                <button type="button" @click="onCancel">Отмена</button>
                <button type="button" :disabled="!isUserFound" @click="onAddParent">Добавить</button> 
            </footer>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Modal',

        props: {

        },

        data() {
            return {
                IdentificationNumber: '',

                user: {},
                isUserFound: false,
            }
        },
        computed: {
            isUserNotFound: () => {
                return true
            }
        },

        methods: {
            onCancel() {
                this.$emit('closeModal')
            },
            onAddParent() {
                this.$emit('addParent', value)
            },
            searchUserByIdentificationNumber() {
                 fetch('/users/get-user-by-identification-number', {
                    method: 'POST', 
                    body: JSON.stringify({ IdentificationNumber: this.IdentificationNumber }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        if (!data.user) {
                            this.isUserFound = false;
                        } else {
                            this.user = Object.assign({}, data.user)
                            this.isUserFound = true;
                        }
                    })
            }
        }
    }
</script>