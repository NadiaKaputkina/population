<template>
    <div class="modal">
        <header class="modal-header">
            <slot name="modal-header">Заголовок</slot>
        </header>
        <main class="modal-main">
            <slot name="modal-main"></slot>
        </main>
        <footer class="modal-footer">
            <slot name="modal-footer">
                <button type="button" @click="onCancel">Отмена</button>
            </slot>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'Modal',

        props: {

        },

        methods: {
            onCancel() {
                this.$emit('closeModal')
            }
        }
    }
</script>