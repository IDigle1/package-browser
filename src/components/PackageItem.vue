<template>
    <div class="card-wrap">
        <v-card 
            class="package-item" 
            :loading="cardLoading" 
            elevation="2" 
            @click.stop="showInfo(packageName, packageVersion)"
        >
            <template slot="progress">
                <v-progress-linear
                    color="#9b59b6"
                    indeterminate
                />
            </template>

            <v-card-title>
                <span>{{ packageName }}</span> 
                <v-chip
                    class="version"
                    label
                    outlined
                >{{ packageVersion }}</v-chip>
            </v-card-title>
            <v-card-text>
                {{ packageDescription }}
            </v-card-text>
        </v-card>

        <modal :value="dialog" @close="dialog = false">
            <package-info-card 
                v-if="packageFiles && packageStats"
                :packageInfo="packageInfo" 
            />
        </modal>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import Modal from './Modal.vue';
import PackageInfoCard from './PackageInfoCard.vue';

export default {
  components: { Modal, PackageInfoCard },
    name: "PackageItem",
    props: {
        packageName: String,
        packageVersion: String,
        packageDescription: String
    },
    data() {
        return {
            dialog: false,
            packageVersions: null,
            packageStats: null,
            packageFiles: null,
            cardLoading: false,
        }
    },
    computed: {
        packageInfo() {
            return {
                packageName: this.packageName, 
                packageDescription: this.packageDescription,
                packageVersion: this.packageVersion,
                packageFiles: this.packageFiles.files, 
                totalUsage: this.packageStats.total, 
            }
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
    .card-wrap, 
    .v-card {
        height: 100%;
    }
    
</style>