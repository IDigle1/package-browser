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
import { mapActions, mapMutations } from 'vuex';

export default {
    name: 'VHeader',
    data() {
        return {
            search: '',
        }
    },
    methods: {
        ...mapMutations({
            setPreloaderState: 'setPreloaderState',
        }),

        ...mapActions({
            searchPackage: 'api/searchPackage',
            request: 'request',
        }),

        updateValue(value) {
            this.$emit('update-value', value);
        },

        sendSearchQuery() {
            this.setPreloaderState(true);

            this.searchPackage({
                query: this.search
            });
        }
    }
}
</script>