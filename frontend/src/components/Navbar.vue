<template>
  <div class="navbar">
    <div @click="$router.push('/')">Django Rest Framework and VueJs 3</div>
    <div class="navbar__btns">
      <button class="btn" @click="$router.push('/')">Home</button>
      <button class="btn" style="margin-left: 20px" @click="$router.push('/streets')">Streets</button>
      <button class="btn" style="margin-left: 20px" @click="$router.push('/houses')">Houses</button>
      <button class="btn" style="margin-left: 20px" @click="$router.push('/routes')">Routes</button>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.navbar {
  height: 70px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__btns {
  margin-left: auto;
}
</style>
