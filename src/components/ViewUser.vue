<template>
    <div>
        <nav>
            <a href="/users" class="link">Список</a>

            <button type="button" 
                class="btn"
                v-if="!isEditMode"
                @click="isEditMode = !isEditMode">Edit</button>

            <template v-else>
                <button type="button" class="btn"
                    @click="onCancel">Cancel</button>
                <button type="button" class="btn"
                    @click="onSave">Save</button>
                <button type="button" class="btn"
                    @click="onClickDelete">Delete</button>
            </template>
        </nav>

        <fieldset class="block">
            <legend class="block-title">Имя:</legend>
            <div>
                <img :src="photoURL" :title="photoTitle" width="200" height="auto"/> 
                <input type="file" id="photo" name="photo" @change="onChangeFileUpload" accept="image/*" :disabled="!isEditMode"/>
            </div>

            <div class="form-group">
            <label class="form-label"> 
                Имя
                <input type="text" class="form-input" :readonly="!isEditMode" v-model="user.FirstName"/>
            </label>
            </div>
            
            <div class="form-group">
            <label class="form-label"> 
                Фамилия
                <input type="text" class="form-input" :readonly="!isEditMode" v-model="user.LastName"/>
            </label>
            </div>
            
            <div class="form-group">
            <label class="form-label"> 
                Пол
                <select class="form-input" :disabled="!isEditMode" v-model="user.SexId">
                    <option v-for="sex of sexes" 
                            :key="sex.Id" 
                            :value="sex.Id">
                        {{sex.Title}}
                    </option>
                </select>
            </label>
            </div>
        </fieldset>

        <fieldset class="block">
            <legend class="block-title">Рождение:</legend>
        
            <div class="form-group">
                <label class="form-label"> 
                    Дата рождения
                    <input type="date" class="form-input" :readonly="!isEditMode" v-model="user.DateOfBirth"/>
                </label>
            </div>
            
            <div class="form-group">
                <label class="form-label"> 
                    Место рождения
                    <input type="text" class="form-input" :readonly="!isEditMode" />
                </label>
            </div>

            <div class="form-group">
                <a href="" class="link" @click.prevent="getParents(user.Id)">Показать родителей</a>

                <relative-user v-if="isShowParentsTable" 
                    title="Родители" 
                    :userProp="userParents"></relative-user>
                <p v-else>{{userParentsNotFoundText}}</p>

                <button type="button" class="btn" v-show="isEditMode" :disabled="isHaveParents" @click="addParent">Добавить родителя</button>
            </div>
        </fieldset>

        <fieldset class="block" disabled="false">
            <legend class="block-title">Смерть:</legend>
            <div class="form-group">
                <label class="form-label"> 
                    Дата смерти
                    <input type="date" class="form-input" :readonly="!isEditMode" v-model="user.DateOfDeath"/>
                </label>
            </div>
            
            <div class="form-group">
                <label class="form-label"> 
                    Место смерти
                    <input type="text" class="form-input" :readonly="!isEditMode" />
                </label>
            </div>
        </fieldset>

        <fieldset class="block">
            <legend class="block-title">Документы:</legend>
            <div class="form-group">
                <label class="form-label"> 
                    Личный номер
                    <input type="text" class="form-input" :readonly="!isEditMode" v-model="user.IdentificationNumber"/>
                </label>
            </div>

           <div class="form-group">
                <label class="form-label"> 
                    Документ
                    <select class="form-input" :disabled="!isEditMode" v-model="user.documentId">
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
           </div>

            <div class="form-group">
                <label class="form-label"> 
                    Номер
                    <input type="text" class="form-input" :readonly="!isEditMode"/>
                </label>
            </div>

            <div class="form-group">
                <label class="form-label"> 
                    Дата выдачи
                    <input type="date" class="form-input" :readonly="!isEditMode" />
                </label>
            </div>

            <div class="form-group">
                <label class="form-label"> 
                    Кем выдан
                    <input type="text" class="form-input" :readonly="!isEditMode"/>
                </label>
            </div>

            <div class="form-group">
                <label class="form-label"> 
                    Срок действия
                    <input type="date" class="form-input" :readonly="!isEditMode"/>
                </label>
            </div>
        </fieldset>

        <fieldset class="block">
            <legend class="block-title">Семейное положение:</legend>
            <div class="form-group">
                <label class="form-label"> 
                    Семейное положение
                    <select class="form-input" :disabled="!isEditMode" v-model="user.MaritalStatusId">
                        <option v-for="status of maritalStatuses" 
                                :key="status.Id" 
                                :value="status.Id">
                            {{status.Status}}
                        </option>
                    </select>
                </label>
            </div>

            <div class="form-group">
                <a href="" class="link" @click.prevent="getChildren(user.Id)">Показать детей</a>

                <relative-user v-if="isShowChildrenTable" 
                    title="Дети" 
                    :userProp="userChildren"></relative-user>
                <p v-else>{{userChildrenNotFoundText}}</p>

                <button type="button" class="btn" v-show="isEditMode" @click="addChild">Добавить ребенка</button>
            </div>
        </fieldset>
   
        <Modal type="Добавить родителя"
            v-if="isShowModalForm"
            :DateOfBirthCurrentUser="user.DateOfBirth"
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

        <ModalDialog v-if="isSuccess"
            @closeModal="isSuccess = false">
            <template v-slot:modal-main>
                Сохранено
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

                isSuccess: false,

                photo: null,

                file: null,
                base64Img: null,
            }
        },

        mounted() {
            console.log('mounted')
            if (this.propsUser) {
                this.user = Object.assign({}, this.propsUser)
            } else {
                this.isEditMode = true
            }
            this.getData();
            this.getPhotoByUser();
        },

        computed: {
            isHaveParents: function () {
                return this.userParents.length >= 2;
            },
            photoTitle: function() {
                return this.photo ? this.photo.Title : '';
            },
            photoURL: function() {
                return this.photo ? this.photo.Path : this.base64Img;
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
                    .catch(error => console.log(error))
            },

            getPhotoByUser() {
                const UserId = this.user.Id;

                fetch('/get-photo-by-user', {
                    method: 'POST',
                    body: JSON.stringify({ UserId: UserId }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        this.photo = Object.keys(data).length ? Object.assign({}, data) : null;
                    })
                    .catch(error => console.log(error))
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

            onChangeFileUpload(event) {
                this.file = event.target.files[0];
                this.encodeImage(this.file)
            },

            encodeImage(input) {
                if (input) {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        this.base64Img = e.target.result
                    }
                    reader.readAsDataURL(input)
                }
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
                .then(response => {
                    if (response.ok) this.onSavePhoto();
                    return response.json()
                }).then(user => {
                    this.isEditMode = false;
                    this.user = Object.assign({}, user);
                    this.isSuccess = true;

                    setTimeout(() => {
                        this.isSuccess = false;
                    }, 2000)
                })
                .catch((error) => {
                    console.log(error)
                })
            },
            
            onSavePhoto() {
                if (this.file) { 
                    let formData = new FormData();
                    formData.append('Photo', this.file);
                    formData.append('Title', `${this.user.LastName} ${this.user.FirstName}`);
                    formData.append('UserId', this.user.Id)

                    fetch('/upload', {
                        method: 'POST',
                        body: formData
                    })
                    .then(response => response.json())
                    .then(data => {
                        this.photo = Object.keys(data).length ? Object.assign({}, data) : null;
                    })
                    .catch(error => console.log(error))
                }
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
