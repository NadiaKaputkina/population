<template>
    <table class="table">
        <thead>
            <tr>
                <th></th>
                <th v-for="role of propRoles" :key="role">
                    {{role}}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="action of propActions" :key="action">
                <td>
                    {{action}}
                </td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'RolesPage',

    props: {
        propRoles: {
            type: Array,
            default: () => []
        },
        propActions: {
            type: Array,
            default: () => []
        }
    }
}
</script>