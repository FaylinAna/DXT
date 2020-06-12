<template>

      
          <v-menu
        
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
      
   
</template>

<script>
import  { logoutUser}  from '../utils/auth' //C:\Users\DXT-TEST\Documents\PASA Git\Vue\suppliervue\src\utils

export default {

 
        methods:{
            method(){
            const vm = this;
            logoutUser();
            vm.$router.push({ name: 'login' });
            }
        }
}
</script>
