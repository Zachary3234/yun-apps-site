<template>
  <el-input :value="value" @input="$emit('input', $event)" 
    prefix-icon="el-icon-search" placeholder="请输入内容" clearable></el-input>
</template>

<script>
module.exports = {
    props: {
        value: String
    }
}
</script>

<style>

</style>