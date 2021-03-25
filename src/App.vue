<template>
  <v-app>
    <v-header />
    
    <v-main>
      <package-list />
    </v-main>
    
    <v-footer color="#634379">
      <v-container class="theme-max-width">
          <user-card />
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import PackageList from './components/PackageList.vue';
import UserCard from './components/UserCard.vue';
import VHeader from './components/VHeader.vue';
export default {
  name: "App",
  components: {
    PackageList,
    VHeader,
    UserCard
  }
};
</script>

<style lang="scss">
  .theme--light.v-application {
    background: #9b59b626!important;

    .theme-max-width {
      max-width: 960px;

      .github-link {
        font-size: 15px;
      }
      
      .v-chip.v-size--default {
        font-size: 12px;
        height: 22px;
        margin: 0 5px;
      }
    }
  }

  

  
</style>
