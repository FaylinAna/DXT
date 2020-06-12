<template>
  <v-app id="login" class="secondary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                
                  <h1 class="flex my-4 primary--text">Inicio de Sesion</h1>
                </div>
                <v-form>
                  <v-text-field
                    append-icon="person"
                    name="login"
                    label="Login"
                    type="text"
                    v-model="Username"
                    :error="error"
                    :rules="[rules.required]"/>
                  <v-text-field
                    :type="hidePassword ? 'Password' : 'text'"
                    :append-icon="hidePassword ? 'visibility_off' : 'visibility'"
                    v-model="Password"
                    :error="error"
                    @click:append="hidePassword = !hidePassword"/>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-snackbar
        v-model="showResult"
        :timeout="2000"
        top>
        {{ result }}
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
import  { loginUser}  from '../../utils/auth' //C:\Users\DXT-TEST\Documents\PASA Git\Vue\suppliervue\src\utils

export default {
  name: 'login',
  data() {
    return {
      loading: false,
      Username: '',
      Password: '',
      hidePassword: true,
      error: false,
      showResult: false,
      result: '',
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },

  methods: {
    async login() {

      try {
                  await  loginUser(this.Username, this.Password)
                    this.$router.push('/')
                } 
                catch (err) {
                    alert(`Error: ${err}`)                    
                }
      
      
    }

    
  }
}
</script>

<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
