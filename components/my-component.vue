<template>
<div>
  <h1>
      {{ greating }} World!
  </h1>
    <div class="test">Test in my component</div>
</div>
</template>

<script>
module.exports =  {
    data() {
        return {
            greating: 'Hello'
        }
    }
}
</script>

<style scoped>
    .test {
        background-color: #aaa;
    }
</style>
