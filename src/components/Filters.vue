<template>
    <form @change="getFilteredData">
        <input type="search" placeholder="Введите имя или фамилию"
            v-model="selectedName"/>

        <select v-model="selectedSex">
            <option disabled value=null>Please select one</option>
            <option v-for="sex of sexes" 
                    :key="sex.Id" 
                    :value="sex.Id">
                {{sex.Title}}
            </option>
        </select>

        <select v-model="selectedMaritalStatus">
            <option disabled value=null>Please select one</option>
            <option v-for="status of maritalStatuses" 
                    :key="status.Id" 
                    :value="status.Id">
                {{status.Status}}
            </option>
        </select>

        <button type="button" v-if="isShowClearBtn" @click="onClearFilter">Очистить</button>
    </form>
</template>

<script>
    export default {
        name: 'Filters',

        data() {
            return {
                selectedName: '',
                selectedSex: null,
                selectedMaritalStatus: null,

                sexes: [],
                maritalStatuses: [],
            }
        },

        computed: {
            isShowClearBtn: () => {
                return true;
            }
        },
        mounted() {
            this.getData()
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

            getFilteredData() {
                this.$emit('get-filtered-data', { 
                    fullName: this.selectedName,
                    sexId: this.selectedSex,
                    maritalStatusId: this.selectedMaritalStatus,
                })
            },

onSearchByName(event) {

},
            onClearFilter() {
                this.selectedSex = null;

                window.location.href = '/users';
            },

    
        }
    }
</script>
