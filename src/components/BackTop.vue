<template>
    <div class="backtop iconfont icon-up-arrow" ></div>
</template>
<script >

</script>
<style scoped>
    .backtop {
        position: absolute;
        z-index: 10;
        bottom: 150px;
        right: 12%;
        transition: all .3s;
    }
    .backtop:hover {
        cursor: pointer;
        transform: translateY(-5px);
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
</style>