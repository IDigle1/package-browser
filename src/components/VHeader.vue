<template>
    <v-toolbar height="80px" max-height="80px" elevation="2" color="#9b59b6" class="mb-5 pr-0 pl-0">
        <v-container class="theme-max-width">
            <v-row :no-gutters="true">
                <v-col class="pt-5 pb-5" cols="12">
                    <v-text-field 
                        v-model="search"
                        hide-details="true"
                        @keydown.enter="sendSearchQuery()"
                        placeholder="type a package name"
                        solo 
                    />
                </v-col>
            </v-row>
        </v-container>
    </v-toolbar>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'VHeader',
    data: () => ({
        search: '',
    }),
    methods: {
        updateValue(value) {
            console.log(value);
            this.$emit('update-value', value);
        },

        ...mapActions({
            searchPackage: 'api/searchPackage',
            request: 'request'
            }),
        sendSearchQuery() {
            this.searchPackage({
                query: this.search
            });
        }
    }
}
</script>