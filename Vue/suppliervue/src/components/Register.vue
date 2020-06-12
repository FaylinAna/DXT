<template>
  
    <v-card>
        <v-card-text>
            Registro de Usuarios
        </v-card-text>
            <v-form
            ref="form"
            >
            <v-text-field
                v-model="FirstName"
                label="FirstName"
                required
            ></v-text-field>

            <v-text-field
                v-model="LastName"
                label="LastName"
                required
            ></v-text-field>

            <v-text-field
                v-model="Username"
                label="Username"
                required
            ></v-text-field>

            <v-text-field
                v-model="Password"
                label="Password"
                required
            ></v-text-field>
            </v-form>
            <v-btn
                color="success"
                @click="submit"
            >
                Register
            </v-btn>

     <v-alert
      v-model="alert"
      border="left"
      close-text="Close Alert"
      dark
      dismissible
      :value="alert"
     
    >   
    {{Msg}}
        </v-alert>
    </v-card>
 
    
</template>

<script>
 import axios from "axios"; 
 export default {
    name: 'Register',
        
        data() {

             
            return {
              FirstName: '',
              LastName: '',
              Username: '',
              Password: '',
              alert : false,
              Msg : ''
         

           
            };
        },
        methods: {
            submit(){

                    axios.post('https://localhost:44366/api/Users/register', {
                        FirstName: this.FirstName,
                        LastName: this.LastName,
                        Username: this.Username,
                        Password : this.Password
                    
                    })
                    .then( (response) =>  {
                        console.log(response);

                        this.$refs.form.reset();
                        this.alert = true;
                        this.Msg = "Se registro Correctamente el Usuario";
                        
                        setTimeout(()=> this.alert = false,6000)
                        
                    })
                    .catch((error) => {
                         
                         this.alert = true;
                         this.color = "red"
                         this.Msg = error.response.data;
                        
                    })
                }
            
            },
        mounted() {
            console.log('ene')
        },
    }

</script>