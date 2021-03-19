<template>
    <div>
        <v-card class="package-item" :loading="cardLoading" elevation="2" @click="showInfo(name, version)">
            <template slot="progress">
                <v-progress-linear
                    color="#9b59b6"
                    indeterminate
                />
            </template>
            <v-card-title>
                <span>{{ name }}</span> 
                <v-chip
                    class="version"
                    label
                    outlined
                >{{ version }}</v-chip>
            </v-card-title>
            <v-card-text>
                {{ description }}
            </v-card-text>
        </v-card>

        <v-dialog
            v-model="dialog"
            max-width="960"
        >
            <v-card>
                <v-card-title class="headline">
                    <span>{{name}}</span> 
                    <v-chip 
                        class="version"
                        label
                        outlined
                    >{{ version }}</v-chip>
                </v-card-title>

                <v-card-text>
                    <div class="mb-5">
                        {{ description }}
                    </div>

                    <div class="mb-5" v-if="packageStats">
                        <span class="block-title">Package Usage: </span>
                        <span>{{ packageStats.total }}</span>
                    </div>

                    <files-list v-if="packageFiles" :files="packageFiles.files"/>
                </v-card-text>

                <v-card-actions>
                    <v-spacer />

                    <v-btn
                        color="#9b59b6"
                        text
                        @click="dialog = false"
                    >
                        close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import FilesList from './FilesList.vue';
export default {
  components: { FilesList },
    name: "PackageItem",
    props: {
        name: String,
        version: String,
        description: String,
    },
    data() {
        return {
            dialog: false,
            packageVersions: null,
            packageStats: null,
            packageFiles: null,
            cardLoading: false
        }
    },
    methods: {
        ...mapActions({
            getPackageVersions: 'api/getPackageVersions',
            getPackageStats: 'api/getPackageStats',
            getPackageFiles: 'api/getPackageFiles',
        }),

        async showInfo(packageName, version) {
            this.cardLoading = true;

            this.packageVersions = await this.getPackageVersions({ packageName });
            this.packageStats = await this.getPackageStats({ packageName });
            
            this.packageFiles = await this.getPackageFiles({
                packageName,
                version
            });


            this.dialog = true;
            this.cardLoading = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    .v-chip.v-size--default {
        font-size: 12px;
        height: 22px;
        margin: 0 5px;
    }

    .file-list {
        border: #e5e5e5 1px solid;
        list-style: none;
        padding: 10px;
    }
</style>