<template>
  <v-data-table
    :headers="headers"
    :items="Users"
    sort-by="Name"
    class="elevation-3"
    align="center"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Administracion de Usuarios</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>

        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn fab dark color="indigo" v-on="on"><v-icon dark>add</v-icon></v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                  <v-form
                      ref="form"
                      lazy-validation
                    >
                    <v-text-field
                      v-model="editedItem.cardCode"
                      label="Codigo Cliente"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.name"
                      label="Nombre"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.username"
                      :rules="emailRules"
                      label="email"
                    ></v-text-field>
                    <v-select
                      v-model="editedItem.role"
                      :items="roles"
                      label="Rol de Usuario"
                      required
                    ></v-select>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error"  @click="close">Cancel</v-btn>
              <v-btn color="success"  @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>


<script>
import axios from "axios";
import  { loginUser}  from '../../utils/auth' //C:\Users\DXT-TEST\Documents\PASA Git\Vue\suppliervue\src\utils

 
  export default {
    data: () => ({
      select: null,
      roles: ['Administrador','Provedor','UsuarioSap'],
      dialog: false,
      emailRules: [
        v => !!v || 'UserName is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      headers: [
        {
          text: 'CardCode',
          align: 'start',
          sortable: false,
          value: 'cardCode',
        },
        { text: 'Nombre', value: 'name' },
        { text: 'Username', value: 'username' },
        { text: 'Role', value: 'role' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      
      Users: [],
      editedIndex: -1,
      editedItem: {
        CardCode: '',
        Name: '',
        username: '',
        role:'',
      },
      defaultItem: {
         cardCode: '',
         name: '',
         userName: '',
         role:'',
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      this.initialize()
    },
    methods: {
      initialize () {

          let objeto = this;

            axios({
            method: 'get',
            url: 'https://localhost:44366/api/Users',
          }).then(function(response){
              console.log(response);
              console.log("respomse data",response.data);
              objeto.Users = response.data;

          }).catch((error) => {
                         
                        console.log(error)
                        
                    })

        
        
      },
      editItem (item) {
        
        this.editedIndex = this.Users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.Users.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.Users.splice(index, 1)
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save () {
        console.log(this.editedItem)
        
        if (this.editedIndex > -1) {


          Object.assign(this.Users[this.editedIndex], this.editedItem)
        } else {
             axios.post('https://localhost:44366/api/Users/register', {
                        cardCode : this.editedItem.cardCode,
                        name: this.editedItem.name,
                        userName: this.editedItem.username,
                        role : this.editedItem.role,
                        password : '',
                    })
                    .then( (response) =>  {
                        console.log(response);
                        this.Users.push(this.editedItem) 
                        this.close()
                    }).catch((error) => {
                      console.log(error.response.data);
                      confirm(error.response.data)   
                    
                        
                    })
                    
                }
          
    
       
      },
    },
  }
</script>