<template>
  <div>
        <v-card-title class="headline">
            <span>{{ packageInfo.packageName }}</span> 
            <v-chip 
                class="version"
                label
                outlined
            >
                {{ packageInfo.packageVersion }}
            </v-chip>
        </v-card-title>

        <v-card-text>
            <div class="mb-5">
                {{ packageInfo.packageDescription }}
            </div>
            <div class="mb-5">
                <span class="font-weight-bold">Package Usage: </span>
                <span>{{ packageInfo.totalUsage }}</span>
            </div>
            <files-list :files="packageInfo.packageFiles"/>
        </v-card-text>
    </div>
</template>

<script>
import FilesList from './FilesList.vue'
export default {
    name: 'PackageInfoCard',
    components: {
        FilesList
    },
    props: {
        packageInfo: {
            type: Object,
            packageDescription: String,
            packageFiles: Array, 
            totalUsage: Number || String, 
            packageName: String, 
            packageVersion: String
        }
    }
}
</script>