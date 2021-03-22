<template>
    <v-card>
        <v-card-title class="justify-center">
            <v-avatar>
            <img :src="avatarImageLink" alt="">
            </v-avatar>
            <div class="d-flex flex-column pl-2">
                <span>Evgeny Falaleev</span>
                <a class="github-link" :href="githubLink">github.com/IDigle1/package-browser</a>
                
            </div>
        </v-card-title>
        
    </v-card>
</template>

<script>
export default {
    name: 'UserCard',
    data: () => ({
        avatarImageLink: 'https://hsto.org/getpro/moikrug/uploads/user/100/045/068/3/avatar/medium_0a1f9d108ffbfe97f221f6c74418a166.jpg',
        githubLink: 'https://github.com/IDigle1/package-browser'
    })
}
</script>