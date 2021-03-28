<template>
    <v-dialog
        v-model="dialog"
        max-width="960"
        @click:outside="$emit('close')"
    >
        <v-card>

            <slot></slot>

            <v-card-actions>
                <v-spacer />
                <v-btn
                    color="#9b59b6"
                    text
                    @click="$emit('close')"
                >
                    close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        value: Boolean
    },
    data() {
        return {
            dialog: false
        }
    },
    watch: {
        value(newVal) {
            this.dialog = newVal;
        }
    }
}
</script>