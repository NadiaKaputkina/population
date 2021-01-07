<template>
<div>
    <table class="table">
        <thead>
            <tr>
                <th></th>
                <th v-for="role of rolesNames" :key="role">
                    <input type="text" v-if="isEditRoleName" v-model="roleName"/> 
                    <template v-else>{{role}}</template>
                    <button class="btn-sm" @click="onEditRoleName()">Edit</button>
                    <button class="btn-sm" @click="onCopyRole()">Copy</button>
                </th>
                <th>
                    <button class="btn-sm" @click="onCreateNewRole()">New</button>
                </th>
            </tr>
        </thead>
        <tbody>
            <template v-for="object of objsNames">
                <tr :key="object">
                    <td>{{object}}</td>
                </tr>
                <tr v-for="action of actionsNames" :key="`${object}_${action}`">
                    <td>
                        {{`@${object}_${action}`}}
                    </td>
                    <td>
                        <input type="checkbox" :checked="true"/>
                    </td>
                    <td>
                        <input type="checkbox" :checked="true"/>
                    </td>
                    <td>
                        <input type="checkbox" :checked="true"/>
                    </td>
                    <td></td>
                </tr>
            </template>
        </tbody>
    </table>

    <button class="btn" @click="onSave">Save</button>
    <button class="btn" @click="onCreateNewObject()">New Object</button>
    <a href="/" class="link">Cancel</a>
</div>
</template>

<script>
import swal from 'sweetalert';

export default {
    name: 'RolesPage',

    props: {
        r: {
            type: Array,
            default: () => []
        },
        propRoles: {
            type: Array,
            default: () => []
        },
        propActions: {
            type: Array,
            default: () => []
        },
        propObj: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            rolesNames: [],
            actionsNames: [],
            objsNames: [],

            isEditRoleName: false,
            objectName: '',
            roleName: '',
        }
    },

    mounted() {
        this.rolesNames = this.rolesNames.concat(this.propRoles);
        this.actionsNames = this.actionsNames.concat(this.propActions);
        this.objsNames = this.objsNames.concat(this.propObj);
    },

    methods: {
        onSave() {
            console.log('Сохранить')
        },

        onEditRoleName() {
            console.log('onEditRoleName')
            this.isEditRoleName = true;
        },

        onCopyRole() {
             console.log('onCopyRole')
        },

        onCreateNewObject() {
            swal("Введите имя объекта", {
                content: "input",
                buttons: {
                    confirm: {
                        text: "OK",
                        visible: true,
                        closeModal: true
                    },
                    cancel: {
                        text: "Cancel",
                        value: null,
                        visible: true,
                        closeModal: true,
                    },
                }
            })
            .then(objectName => {
                this.onfetchNewObject(objectName)
            })
        },

        onfetchNewObject(objectName) {
            if (objectName) {
                fetch('/roles/new-object', {
                    method: 'POST', 
                    body: JSON.stringify({title: objectName}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(objs => {
                    console.log(objs)
                    this.objName = objs.objName;
                    this.objsNames.concat(objs.objsList)
                })
                .catch(err => console.log(err))
            }
        }
    }
}
</script>