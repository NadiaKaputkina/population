<template>
    <form class="extended-filter">
        <div class="form-group">
            <input type="search" class="form-input" placeholder="Введите имя или фамилию"
                v-model="selectedName"/>
        </div>

        <div class="form-group">
            <label class="form-label">
                Пол: 
                <select v-model="selectedSex" class="form-input">
                    <option :value=null>All</option>
                    <option v-for="sex of sexes" 
                            :key="sex.Id" 
                            :value="sex.Id">
                        {{sex.Title}}
                    </option>
                </select>
            </label>
        </div>

        <div class="form-group">
            <label class="form-label">
                Семейный статус: 
                <select v-model="selectedMaritalStatus" class="form-input">
                    <option :value=null>All</option>
                    <option v-for="status of maritalStatuses" 
                            :key="status.Id" 
                            :value="status.Id">
                        {{status.Status}}
                    </option>
                </select>
            </label>
        </div>

        <div class="form-group">
            <label class="form-label">
                Есть дети:
                <input type="checkbox" id="checkbox" class="form-input" v-model="hasChild">
            </label>
        </div>

        <div class="form-group">
            <label class="form-label">
                Количество детей: 
                <input type="number" placeholder="0" class="form-input"
                    v-model="countOfChildren"/>
            </label>
        </div>

        <button type="button" class="btn btn-clear" v-if="isShowClearBtn" @click="onClearFilter">Очистить</button>

        <button type="button" class="btn" @click="onSearch">Поиск</button>
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
