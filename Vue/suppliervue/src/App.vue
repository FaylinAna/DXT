<template>
  <v-app>
    
    <v-content>
      <v-container fluid>

        <v-row >
          <v-col  cols="2" sm="2">
            <Menu></Menu>
          </v-col>
          <v-col cols="10" align="center" sm="10">
          <router-view></router-view>
        
          </v-col>
         
      </v-row>
      
      </v-container>
      
    </v-content>
  </v-app>
</template>


<script>
import Register from './components/Register';
import Menu from './components/Menu';
import toolbar from './components/toolbar';
import loadfiles from './components/loadfiles'

export default {
  name: 'App',

  components: {
    Register,
    Menu,
    toolbar,
    loadfiles
  },

  data: () => ({
    //
  }),
};
</script>
