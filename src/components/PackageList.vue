<template>
        <v-container fluid class="theme-max-width">
            <v-row v-if="getPackages">
                <v-col md="6" cols="12" v-for="item in getPackages.objects" :key="item.name">
                    <package-item 
                        :packageName="item.package.name"
                        :packageVersion="item.package.version"
                        :packageDescription="item.package.description"
                    />
                </v-col>
            </v-row>

            <v-row v-if="getPreloaderState" >
                <v-col class="d-flex justify-center">
                    <v-progress-circular 
                        v-if="getPreloaderState"
                        color="#9b59b6" 
                        indeterminate
                    />
                </v-col>
            </v-row>

            <v-container v-if="getPackages" class="theme-max-width text-center mt-5 mb-5">
                <v-pagination 
                    color="#9b59b6" 
                    :length="getPagesCount" 
                    :total-visible="8"
                    v-model="currentPage" 
                />
            </v-container>
        </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import PackageItem from './PackageItem';

export default {
    name: "PackageList",
    components: {
        PackageItem
    },
    data: () => ({
        currentPage: 1
    }),

    methods: {
        ...mapActions({
            searchPackage: 'api/searchPackage'
        }),

        ...mapMutations({
            setPreloaderState: 'setPreloaderState',
        })

    },

    computed: {
        ...mapGetters({
            getPackages: 'api/getPackages',
            getPreloaderState: 'getPreloaderState'
        }),

        getPagesCount() {
            return Math.ceil(this.getPackages.total / 10);
        }
    },

    watch: {
        currentPage() {
            this.searchPackage({
                currentPage: this.currentPage
            });
        },

        getPackages(value) {
            if (value) {
                this.setPreloaderState(false);
            } else {
                this.setPreloaderState(true);
            }
        },
    }
}
</script>