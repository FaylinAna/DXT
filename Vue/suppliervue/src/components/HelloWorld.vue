<template>
  <v-container>
        <v-card>
          <v-card-text>
            Listado Usuarios
          </v-card-text>
        </v-card>
        <v-card>
           <v-data-table
            :headers="headers"
            :items="users"
            :items-per-page="5"
            class="elevation-1">
          </v-data-table>
        </v-card>
    
  </v-container>
</template>

<script>
  import axios from "axios";
  export default {
    name: 'HelloWorld',

    data: () => ({
       headers :[
         {text: 'Nombre',value: 'FirstName'},
         {text: 'Apellido',value: 'LastName'},
         {text: 'Usuario',value: 'Username'}
       
       ],
       users:[
       ],
    }),
    methods:{
      getAllUser(){
        console.log('lsitas');
        axios(
          {
            method : 'get',
            url : 'https://localhost:44366/api/Users'
          }).then(function(response){
            console.log(response);
          })
        
      }      
    },
    mounted(){
      this.getAllUser();
    }
  }
</script>
