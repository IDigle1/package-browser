<template>
        <v-container fluid class="theme-max-width">
            <v-row v-if="getPackages">
                <v-col cols="12" v-for="item in getPackages.objects" :key="item.name">
                    <package-item 
                        :name="item.package.name"
                        :version="item.package.version"
                        :description="item.package.description"
                    />
                </v-col>
            </v-row>

            <v-row v-if="showPreloader" >
                <v-col class="d-flex justify-center">
                    <v-progress-circular 
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
import { mapGetters, mapActions } from 'vuex';
import PackageItem from './PackageItem';

export default {
    name: "PackageList",
    components: {
        PackageItem
    },
    data: () => ({
        showPreloader: false,
        currentPage: 1
    }),

    methods: {
        ...mapActions({
            searchPackage: 'api/searchPackage'
        })
    },

    computed: {
        ...mapGetters({
            getPackages: 'api/getPackages'
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
        }
    }
}
</script>

<style lang="scss" scoped>
</style>