<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-if="isLoggeds"

    >
      <v-list dense>
        <template >
          <v-row
            align="center"
          >
          
          </v-row>
         <v-list-item v-if="role">
              <v-list-item-icon>
             <router-link to="/register"> <v-icon>mdi-account-multiple</v-icon></router-link>
              </v-list-item-icon>
              <v-list-item-title>Administrar Usuarios</v-list-item-title>
          </v-list-item>
            
            <v-list-item link>
               <router-link to="/PurchaseOrders">
              <v-list-item-icon>
                <v-icon>mdi-star</v-icon>
              </v-list-item-icon>
                </router-link>
            </v-list-item>
      
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
      v-if="isLoggeds"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down"> Portal SAP</span>
      </v-toolbar-title>
   
      <v-spacer></v-spacer>
          <v-menu
        left
        bottom
      >
      <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-avatar size="42px">
             
             <img src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Sunglasses&hairColor=Black&facialHairType=Blank&clotheType=CollarSweater&clotheColor=Black&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light"/>
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
         <v-list-item @click="method">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
        <v-list-item @click="method">
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        </v-list>
          </v-menu>
      
   
    </v-app-bar>
    <v-content>
  
    </v-content>
  </v-app>
</template>

<script>
import  { logoutUser}  from '../utils/auth' //C:\Users\DXT-TEST\Documents\PASA Git\Vue\suppliervue\src\utils
import {checkrole} from '../utils/auth'
import {isLoggedIn}from '../utils/auth'

  export default {
    props: {
      source: String,
    },
    data: () => ({
      dialog: false,
      drawer: null,
      role:''
      
    }),
    created(){
       this.role="nil"//this.userAdmin();
       console.log("created");
       console.log(this.role)
    },
    mounted(){
             console.log("mounted");

      this.role = checkrole() == "Administrador";
    },

    computed: {
       isLoggeds(){
        return this.$route.path != '/login' ; 
        },
       
       
    },
   
       methods:{
            method(){
            const vm = this;
            logoutUser();
            vm.$router.push({ name: 'login' });
            },
          userAdmin(){
              return checkrole()==="Administrador";
            }
         

            
            
        }
  }
</script>