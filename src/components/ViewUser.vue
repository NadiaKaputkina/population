<template>
    <div class="wrap">
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
                    @click="onClickDelete">Delete</button>
            </template>
        </nav>

        <fieldset>
            <legend>Имя:</legend>
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
        </fieldset>

        <fieldset>
            <legend>Рождение:</legend>
            <label>
                Дата рождения
                <input type="date" :readonly="!isEditMode" v-model="user.DateOfBirth"/>
            </label>

            <label>
                Место рождения
                <input type="text" :readonly="!isEditMode" />
            </label>

            <a href="" @click.prevent="getParents(user.Id)">Показать родителей</a>

            <relative-user v-if="isShowParentsTable" 
                title="Родители" 
                :userProp="userParents"></relative-user>
            <p v-else>{{userParentsNotFoundText}}</p>

            <button type="button" v-show="isEditMode" :disabled="isHaveParents" @click="addParent">Добавить родителя</button>
        </fieldset>

        <fieldset disabled="false">
            <legend>Смерть:</legend>
            <label>
                 Дата смерти
                <input type="date" :readonly="!isEditMode" v-model="user.DateOfDeath"/>
            </label>

            <label>
                Место смерти
                <input type="text" :readonly="!isEditMode" />
            </label>
        </fieldset>

        <fieldset>
            <legend>Документы:</legend>
            <label>
                Личный номер
                <input type="text" :readonly="!isEditMode" v-model="user.IdentificationNumber"/>
            </label>

            <label>
                Документ
                <select :disabled="!isEditMode" v-model="user.documentId">
                    <!-- <option v-for="sex of sexes" 
                            :key="sex.Id" 
                            :value="sex.Id">
                        {{sex.Title}}
                    </option> -->
                    <option value="1">Паспорт</option>
                    <option value="2">Вид на жительство</option>
                    <option value="3">Другое</option>
                </select>
            </label>

            <label>
                Номер
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
        </fieldset>

        <fieldset>
            <legend>Семейное положение:</legend>
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
        
            <a href="" @click.prevent="getChildren(user.Id)">Показать детей</a>

            <relative-user v-if="isShowChildrenTable" 
                title="Дети" 
                :userProp="userChildren"></relative-user>
            <p v-else>{{userChildrenNotFoundText}}</p>

            <button type="button" v-show="isEditMode" @click="addChild">Добавить ребенка</button>
        </fieldset>

             
        <Modal type="Добавить родителя"
            v-if="isShowModalForm"
            @closeModal="isShowModalForm = false"
            @addParent="addSelectedParent($event)">
        </Modal>

        <ModalDialog
            v-if="isShowModalDialog"
            @closeModal="isShowModalDialog = false">
            <template v-slot:modal-header>
                Внимание!
            </template>
             <template v-slot:modal-main>
                Вы действительно хотите удалить запись?
            </template>
             <template v-slot:modal-footer>
                <button type="button" @click="isShowModalDialog = false">Отмена</button>
                <button type="button" @click="onDelete">Удалить</button>
            </template>
        </ModalDialog>
    </div>
</template>

<script>
    import RelativeUser from './RelativeUser.vue';
    import Modal from './Modal.vue';
    import ModalDialog from './ModalDialog.vue';

    export default {
        name: 'ViewUser',

        components: {
            RelativeUser,
            Modal,
            ModalDialog
        },

        props: {
            propsUser: {
                type: Object,
                default: () => {}
            }
        },

        computed: {
            isHaveParents: function () {
                return this.userParents.length >= 2;
            }
        },
 
        data() {
            return {
                user: {},

                isShowChildrenTable: false,
                isShowParentsTable: false,
                userChildren: [],
                userParents: [],
                userChildrenNotFoundText: '',
                userParentsNotFoundText: '',

                isEditMode: false,
                sexes: [],
                maritalStatuses: [],

                isShowModalForm: false,
                isShowModalDialog: false,
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
                        if (Array.isArray(children)) {
                            this.userChildren = Object.assign([], children);
                            this.isShowChildrenTable = true;
                        } else {
                             this.userChildrenNotFoundText = children.text
                        }
                    })
            },

            getParents(userId) {
                fetch(`/users/${this.user.Id}/get-parents`)
                    .then(response => response.json())
                    .then(parents => {
                         if (Array.isArray(parents)) {
                            this.userParents = Object.assign([], parents);
                            this.isShowParentsTable = true;
                        } else {
                            this.userParentsNotFoundText = parents.text
                        }
                    })
            },

            addChild() {
                console.log('--add child--')
                this.isShowModalForm = true;
            },
            addParent() {
                console.log('--add parent--')
                this.isShowModalForm = true;
            },
            addSelectedParent(parent) {
                this.userParents.push(parent);

                if (!this.user.parentsIds) {
                    this.user.parentsIds = [];
                }
                this.user.parentsIds.push(parent.Id);

                this.isShowModalForm = false;
                this.isShowParentsTable = true;
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
                    this.isEditMode = false;
                    this.user = Object.assign({}, user);
                })
                .catch((error) => {
                    console.log(error)
                })
            },

            onClickDelete() {
                this.isShowModalDialog = true;
            },

            onDelete() {
                this.isShowModalDialog = false;

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
