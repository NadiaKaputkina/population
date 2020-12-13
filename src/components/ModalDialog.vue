<template>
    <div class="modal">
        <div class="modal-dialog">
            <header class="modal-header">
                <slot name="modal-header"></slot>
            </header>
            <main class="modal-main">
                <slot name="modal-main"></slot>
            </main>
            <footer class="modal-footer">
                <slot name="modal-footer">
                    <button type="button" @click="onCancel">Ok</button>
                </slot>
            </footer>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ModalDialog',

        props: {

        },

        data() {
            return {
                
            }
        },

        methods: {
            onCancel() {
                this.$emit('closeModal')
            }
        }
    }
</script>