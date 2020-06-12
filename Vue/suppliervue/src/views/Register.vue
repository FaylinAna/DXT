<template>
  <div class="register">
    <login></login>
  
  </div>
</template>

<script>
// @ is an alias to /src

import Register from '@/components/Register.vue'
import Login from '@/components/login'

export default {
  name: 'register',
  components: {
    Register
  }
}
</script>
