<template>
    <article class="showUser">
        <nav>
            <a href="/users">Список</a>

            <button type="button" 
                v-if="!isEditMode"
                @click="isEditMode = !isEditMode">Edit</button>

            <template v-else>
                <button type="button" 
                    @click="onCancel">Cancel</button>
                <button type="button" 
                    @click="onSave">Save</button>
                <button type="button"
                    @click="onDelete">Delete</button>
            </template>
        </nav>

        <section class="name">
            <label>
                Имя
                <input type="text" :readonly="!isEditMode" v-model="user.FirstName"/>
            </label>

            <label>
                Фамилия
                <input type="text" :readonly="!isEditMode" v-model="user.LastName"/>
            </label>
            
            <label>
                Пол
                <select :disabled="!isEditMode" v-model="user.SexId">
                    <option v-for="sex of sexes" 
                            :key="sex.Id" 
                            :value="sex.Id">
                        {{sex.Title}}
                    </option>
                </select>
            </label>
        </section>

        <section>
            <label>
                Дата рождения
                <input type="date" :readonly="!isEditMode" v-model="user.DateOfBirth"/>
            </label>

            <label>
                Место рождения
                <input type="text" :readonly="!isEditMode" />
            </label>
        </section>

        <section>
            <label>
                 Дата смерти
                <input type="date" :readonly="!isEditMode" v-model="user.DateOfDeath"/>
            </label>

            <label>
                Место смерти
                <input type="text" :readonly="!isEditMode" />
            </label>
        </section>

        <section>
            <label>
                Личный номер
                <input type="text" :readonly="!isEditMode" v-model="user.IdentificationNumber"/>
            </label>

            <label>
                Документ
                <!-- <select :disabled="!isEditMode" v-model="user.SexId">
                        <option v-for="sex of sexes" 
                                :key="sex.Id" 
                                :value="sex.Id">
                            {{sex.Title}}
                        </option>
                    </select> -->
            </label>

            <label>
                Номер {{}}
                <input type="text" :readonly="!isEditMode"/>
            </label>

            <label>
                Дата выдачи
                <input type="date" :readonly="!isEditMode" />
            </label>
            <label>
                Кем выдан
                <input type="text" :readonly="!isEditMode"/>
            </label>
            <label>
                Срок действия
                <input type="date" :readonly="!isEditMode"/>
            </label>
        </section>

        <section>
            <label>
                Семейное положение
                <select :disabled="!isEditMode" v-model="user.MaritalStatusId">
                    <option v-for="status of maritalStatuses" 
                            :key="status.Id" 
                            :value="status.Id">
                        {{status.Status}}
                    </option>
                </select>
            </label>

            <div>
                <a href="" @click.prevent="getChildren(user.Id)">Дети</a>

                <relative-user v-if="isShowChildren" :userProp="userChildren"></relative-user>

                <button type="button" v-show="isEditMode" @click="addChild">Добавить ребенка</button>
            </div>

            <div>
                <a href="" @click.prevent="getParents(user.Id)">Родители</a>

                <relative-user v-if="isShowParents" :userProp="userParents"></relative-user>

                <button type="button" v-show="isEditMode" @click="addParent">Добавить родителя</button>
            </div>

            <Modal v-if="isShowModalForm">
                <template v-slot:modal-header>
                    <h1>Здесь мог быть заголовок страницы</h1>
                </template>
                 <template v-slot:modal-main>
                    <h1>Здесь мог быть заголовок страницы</h1>
                </template>
                 <template v-slot:modal-footer>
                    <h1>Здесь мог быть заголовок страницы</h1>
                </template>
            </Modal>
        </section>
             
    </article>
</template>

<script>
    import RelativeUser from './RelativeUser.vue';
    import Modal from './Modal.vue';

    export default {
        name: 'ViewUser',

        components: {
            RelativeUser,
            Modal,
        },

        props: {
            propsUser: {
                type: Object,
                default: () => {}
            }
        },

        data() {
            return {
                isEditMode: false,
                isShowChildren: false,
                isShowParents: false,

                user: {},
                userChildren: [],
                userParents: [],

                sexes: [],
                maritalStatuses: [],

                isShowModalForm: false,
            }
        },

        mounted() {
            console.log('mounted')
            this.getData()

            if (this.propsUser) {
                this.user = Object.assign({}, this.propsUser)
            } else {
                this.isEditMode = true
            }
        },

        methods: {
            getData() {
                fetch('/get-filters')
                    .then(response => response.json())
                    .then(data => {
                        this.sexes = Object.assign([], data.sexes);
                        this.maritalStatuses = Object.assign([], data.maritalStatuses);
                    })
            },

            getChildren(userId) {
                fetch(`/users/${this.user.Id}/get-child`)
                    .then(response => response.json())
                    .then(children => {
                        console.log(children)
                        if (Array.isArray(children)) {
                            this.userChildren = this.userChildren.concat(children);
                            this.isShowChildren = true;
                        }
                    })
            },

            getParents(userId) {
                fetch(`/users/${this.user.Id}/get-parents`)
                    .then(response => response.json())
                    .then(parents => {
                         console.log(parents)
                         if (Array.isArray(parents)) {
                            this.userParents = this.userParents.concat(parents);
                            this.isShowParents = true;
                        }
                    })
            },

            addChild() {
                console.log('--add child--')
                this.isOpenModalForm = true;
            },
            addParent() {
                console.log('--add parent--')
            },
            validateUser() {
                return true;
            },

            onCancel() {
                this.user = Object.assign({}, this.propsUser)

                this.isEditMode = false;
            },

            onSave() {
                if (!this.validateUser()) return;

                fetch('/users/save', {
                    method: 'POST', 
                    body: JSON.stringify(this.user),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(user => {
                    console.log(user)
                    this.isEditMode = false;
                    this.user = Object.assign({}, user)
                })
                .catch((error) => {
                    console.log(error)
                })
            },

             onDelete() {
                fetch(`/users/${this.user.Id}/delete`, {
                    method: 'DELETE'
                })
                .then((response) => {
                    if (response.ok) {
                        window.location.href = '/users';
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        }
    }
</script>
