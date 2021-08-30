<template>
  <div class="page">
        <div class="label">
            <span>应用</span>
        </div>
        <div class="row">
            <div class="item" onclick="navTo('apps/calcpaper')">
                计算器草稿纸
            </div>
            <div class="item">
                JSON编辑器
            </div>
            <div class="item">
                时间戳转换
            </div>
            <div class="item">
                代码格式转换
            </div>
            <div class="item">
                http测试
            </div>
            <div class="item">
                文本对比
            </div>
            <div class="item">
                Markdown
            </div>
        </div>
        <div class="label">
            <span>游戏</span>
        </div>
        <div class="row">
            <div class="item">
                2048
            </div>
            <div class="item" onclick="navTo('games/revolution')">
                大富豪
            </div>
            <div class="item">
                猜颜色
            </div>
        </div>
    </div>
</template>

<script>
module.export = {

}
</script>

<style scoped>
    .foo {
        height: 0;
    }
</style>