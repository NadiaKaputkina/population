<template>
    <form>
        <input type="search" placeholder="Введите имя или фамилию"
            v-model="selectedName"/>
       
        <label>
            Пол: 
            <select v-model="selectedSex">
                <option :value=null>All</option>
                <option v-for="sex of sexes" 
                        :key="sex.Id" 
                        :value="sex.Id">
                    {{sex.Title}}
                </option>
            </select>
        </label>

        <label>
            Семейный статус: 
            <select v-model="selectedMaritalStatus">
                <option :value=null>All</option>
                <option v-for="status of maritalStatuses" 
                        :key="status.Id" 
                        :value="status.Id">
                    {{status.Status}}
                </option>
            </select>
        </label>

        <label>
            Есть дети:
            <input type="checkbox" id="checkbox" v-model="hasChild">
        </label>

        <label>
            Количество детей: 
            <input type="number" placeholder="0"
                v-model="countOfChildren"/>
        </label>

        <button type="button" v-if="isShowClearBtn" @click="onClearFilter">Очистить</button>

        <button type="button" @click="onSearch">Поиск</button>
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

                hasChild: false,
                countOfChildren: 0,

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

            onSearch() {
                const searchParams = { 
                    fullName: this.selectedName,
                    sexId: this.selectedSex,
                    maritalStatusId: this.selectedMaritalStatus,
                    hasChild: this.hasChild,
                    countOfChildren: this.countOfChildren,
                }

                this.$emit('get-filtered-data', searchParams)
            },

            onSearchByName(event) {

            },

            onClearFilter() {
                this.selectedSex = null;

                window.location.href = '/users';
            },

            toggleFullFilter() {
                
            }
        }
    }
</script>
