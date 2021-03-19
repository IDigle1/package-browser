<template>
    <v-toolbar height="80px" max-height="80px" elevation="2" color="#9b59b6" class="mb-5 pr-0 pl-0">
        <v-container class="theme-max-width">
            <v-row :no-gutters="true">
                <v-col class="pt-5 pb-5" cols="12">
                    <v-text-field 
                        hide-details="true"
                        :value="value"
                        @input="updateValue($event.target.value)"
                        @keydown.enter="getSearch()"
                        placeholder="type a package name"
                        solo 
                    />
                </v-col>
            </v-row>
        </v-container>
    </v-toolbar>
</template>

<script>
export default {
    name: 'VHeader',
    props: {
        value: String
    },
    methods: {
        updateValue(value) {
            this.$emit('update-value', value);
        },

        getSearch() {
            this.$emit('get-search');
        }
    }
}
</script>

<style>

</style>