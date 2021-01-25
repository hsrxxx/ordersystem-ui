<template>
    <div>
        <el-container style="height: 100vh; border: 1px solid #eee">
            <OrderSystemAside></OrderSystemAside>
            <el-container>
                <el-header>
                    <OrderSystemHeader></OrderSystemHeader>
                </el-header>
                <OrderSystemMain></OrderSystemMain>
            </el-container>
        </el-container>
    </div>
</template>


<script>

    import { OrderSystemAside, OrderSystemMain, OrderSystemHeader } from './components'

    export default {
        data() {
            return {
                tableData: [],
            }
        },
        components: {
            OrderSystemAside,
            OrderSystemMain,
            OrderSystemHeader,
        },
    }
    
</script>

<style>

</style>