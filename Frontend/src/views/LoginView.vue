<template>
  <div class="min-h-screen flex items-center justify-center">
    <LoginForm @login-success="handleLoginSuccess" />
  </div>
</template>

<script>
import LoginForm from '@/components/Login.vue';

export default {
  components: {
    LoginForm
  },
  methods: {
    handleLoginSuccess() {
      this.$router.push('/form');
    }
  }
};
</script>