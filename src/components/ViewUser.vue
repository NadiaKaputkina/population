<template>
    <div class="showUser">
        <div>
            <a href="/users">Список</a>

            <button type="button" 
                v-if="!isEditMode"
                @click="isEditMode = !isEditMode">Edit</button>

            <template v-else>
                <button type="button" 
                    @click="onCancel">Cancel</button>
                <button type="button" 
                    @click="onSave">Save</button>
            </template>
        </div>

        
        <input type="text" :readonly="!isEditMode" v-model="user.FirstName"/>
        <input type="text" :readonly="!isEditMode" v-model="user.LastName"/>
        <input type="date" :readonly="!isEditMode" v-model="user.DateOfBirth"/>

        <select :disabled="!isEditMode" v-model="user.SexId">
            <option v-for="sex of sexes" 
                    :key="sex.Id" 
                    :value="sex.Id">
                {{sex.Title}}
            </option>
        </select>

        <select :disabled="!isEditMode" v-model="user.MaritalStatusId">
            <option v-for="status of maritalStatuses" 
                    :key="status.Id" 
                    :value="status.Id">
                {{status.Status}}
            </option>
        </select>
        
        <input type="text" :readonly="!isEditMode" v-model="user.IdentificationNumber"/>
        <input type="date" :readonly="!isEditMode" v-model="user.DateOfDeath"/>

    </div>
</template>

<script>
    export default {

        name: 'ViewUser',

        props: {
            propsUser: {
                type: Object,
                default: () => {}
            }
        },

        data() {
            return {
                isEditMode: false,

                user: this.propsUser,

                sexes: [],
                maritalStatuses: [],
            }
        },

        mounted() {
            this.getData()

            this.user = Object.assign({}, this.propsUser)
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

            onCancel() {
                this.user = Object.assign({}, this.propsUser)

                this.isEditMode = false;
            },

            onSave() {
                this.isEditMode = false;
            }
        }
    }
</script>
