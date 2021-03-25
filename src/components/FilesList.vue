<template>
    <div>
        <p class="block-title font-weight-bold">Files</p>

        <v-simple-table class="file-list">
            <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-left">
                        Name
                    </th>
                    <th class="text-left">
                        Type
                    </th>
                    
                    <th class="text-left">
                        Size
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="file in files"
                :key="file.name"
                >
                    <td>{{ file.name }}</td>
                    <td>{{ file.type }}</td>
                    <td>{{ file.size }}</td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
export default {
    name: 'FilesList',
    props: {
        files: {
            type: Array,
            required: true
        }
    }
}
</script>

<style>
    .block-title {
        font-size: 20px;
        font-weight: bold;
    }

    .file-list {
        border: thin solid rgba(0, 0, 0, 0.12);
    }

    .file-list {
        border: #e5e5e5 1px solid;
        list-style: none;
        padding: 10px;
    }
</style>