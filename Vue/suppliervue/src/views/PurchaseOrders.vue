<template>
  <v-card class="justify-center">
    <v-card-title>
      Purcharse Order
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="orders"
      :search="search"
    >
    <template v-slot:item.controls="">
         <v-col cols="12" sm="3">
            <v-btn icon color="green">
              <v-icon>visibility</v-icon>
            </v-btn>
          </v-col>
      </template>
    </v-data-table>
  </v-card>
  
</template>
  




<script>
  import axios from "axios";
  export default {
    name: 'PurchaseOrders',
    data: () => ({
       search: '',
       headers: [
          {
            text: 'CardCode',
            align: 'start',
            sortable: false,
            value: 'CardCode',
          },
          {
            text: 'CardName', value: 'CardName'
          },
          { text: 'DocEntry', value: 'DocEntry' },
          { text: 'DocDate', value: 'DocDate' },
          { text: 'DocCurr', value: 'DocCurr' },
          { text: 'DocTotal', value: 'DocTotal' },
          { text: 'DocumentStatus',value: 'DocumentStatus' },
          { text: "", value: "controls", sortable: false }
          ],
      orders: [],
    }),
    methods:{
      getPurchaseOrders(){
        this.loading = true;
        this.orders = [];
        let objeto = this;
        let sendData = { "CompanyDB": "SBODEMOMX",
                          "UserName": "manager",
                          "Password": "1234"
                      };
          axios({
            method: 'post',
            url: 'http://localhost:8086/api/SL/GetAxios?command=PurchaseOrders',
            headers: {
            'content-type': 'application/json'
          },
            data: sendData,
          }).then(function(response){
              console.log(response);
              objeto.loading = false;
              objeto.orders = response.data.value;
          })
      },
    },
    mounted(){
      //this.ListarTareas();
      this.getPurchaseOrders();
    },
    watch: {
      
    }
  }
</script>