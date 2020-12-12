<template>
    <table>
        <caption>{{title}}</caption>
        <thead>
            <tr>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Пол</th>
                <th>Дата рождения</th>
                <th>Личный номер</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user of userProp" :key="user.Id">
                <td>{{user.FirstName}}</td>
                <td>{{user.LastName}}</td>
                <td>{{user.SexId}}</td>
                <td>{{user.DateOfBirth}}</td>
                <td>{{user.IdentificationNumber}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'RelativeUser',

    props: {
        title: {
            type: String,
            default: ''
        },
        userProp: {
            type: Array | Object,
            default: () => []
        }
    },

    
}
</script>