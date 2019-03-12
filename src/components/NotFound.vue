<template>

       <div class="container">
          <div class="row">
            
            <div class="message_box">
              <p>Страница не существует =(</p>  
            </div> 

          </div>
        </div>

</template>

<script>
import LoginBox from '@/components/Login/LoginBox.vue'

export default {
  components: {
    LoginBox
  },
}
</script>


<style lang="scss">
.message_box {
  display: block;
  margin: 0 auto;
  margin-top: 25%;
  font-size: 25px;
  font-style: bold;
  color: #444;
  text-align: center;
}

</style>
