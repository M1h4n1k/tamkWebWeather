<template>
  <header class="w-full text-center space-y-4 pb-4">
    <h1 class="text-bold text-3xl">{{ $route.name }}</h1>
    <div class="w-full grid grid-cols-5 gap-2">
      <router-link to="/" class="button"> Recent weather info</router-link>
      <router-link to="/temperature" class="button">Temperature</router-link>
      <router-link to="/wind_speed" class="button">Wind speed</router-link>
      <router-link to="/custom" class="button">Custom value</router-link>
      <router-link to="/info" class="button">Project info</router-link>
    </div>
  </header>

  <main>
    <router-view :key="$route.path"></router-view>
  </main>
</template>

<script>
export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      titles: {
        '': 'Recent weather info',
        temperature: 'Temperature',
        wind_speed: 'Wind speed',
        custom: 'Custom value',
        info: 'Project info'
      }
    }
  },
}
</script>

<style scoped>
.button {
    width: 100%;
    border: 2px solid rgb(209 213 219);
    background-color: rgb(243 244 246);
    padding: 0.5rem;
    border-radius: 0.25rem;
}

.button:hover {
    background-color: rgb(229 231 235);
}
</style>
