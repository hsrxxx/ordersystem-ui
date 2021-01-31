<template>
    <el-main>
        <div>
            <el-button type="primary" plain size="small" icon="el-icon-plus" @click="handleAdd">新增</el-button>
            <el-button type="success" plain size="small" icon="el-icon-edit" :disabled="updateDisabled" @click="handleUpdate(multipleSelection[0])">修改</el-button>
            <el-button type="danger" plain size="small" icon="el-icon-delete" :disabled="deleteDisabled" @click="handleDeletes(multipleSelection)">删除</el-button>
        </div>
        
        <el-dialog title="新增菜品" :visible.sync="dialogFormVisible" width="30%" :showClose="false" :close-on-click-modal="false">
            <el-form id="form" :model="form" :rules="rules" ref="form" label-width="60px">
                <el-form-item label="菜品" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="单价" prop="price">
                    <el-input v-model="form.price" type="number" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="口味" prop="flavor">
                    <el-input v-model="form.flavor" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="分类" prop="tid">
                    <el-select v-model="form.tid" placeholder="请选择分类">
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="form.remark" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')" :loading="addLoading">{{ form.id === '' ? '新 增':'修 改' }}</el-button>
            </div>
        </el-dialog>

        <el-table 
            id="menu"
            ref="multipleTable"
            :data="tableData" 
            :header-cell-style="{background:'#f8f8f9'}" 
            style="margin-top:20px"
            @selection-change="handleSelectionChange">
             <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="编号" header-align="center" align="center" width="80">
            </el-table-column>
            <el-table-column prop="name" label="菜品" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="price" label="单价" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="flavor" label="口味" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="type" label="分类" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="remark" label="备注" header-align="center" align="center">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100" 
                header-align="center"
                align="center">
                <template slot-scope="scope">
                    <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                    <el-button @click="handleUpdate(scope.row)" type="text" size="small">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            style="margin-top:20px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            :current-page="1"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="limit"
            layout="->, total, sizes, prev, pager, next, jumper"
            :total="count">
        </el-pagination>
    </el-main>
</template>

<script>

    import { findAllMenu, findAllType, findByIdMenu, deleteByIdMenu, deleteBatchIdsMenu, updateByIdMenu, saveMenu } from '@/request/api'

    export default {
        name: 'OrderSystemMenu',
        data() {

            // 自定义校验
            var validateName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('菜品不能为空'));
                }
                callback();
            };
            var validatePrice = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('单价不能为空'));
                }
                setTimeout(() => {
                    if (value instanceof Number || typeof value == 'number') {
                        callback(new Error('请输入数字'));
                    } else {
                        if(value.toString().split(".").length !== 2 && value.toString().split(".").length !== 1){
                            callback(new Error('请输入数字'));
                        }
                        callback();
                    }
                }, 1000);
            };
            var validateFlavor = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('口味不能为空'));
                }
                callback();
            };
            var validateType = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('分类不能为空'));
                }
                callback();
            };
            return {
                tableData: [],
                count: 0,
                index: 1,
                limit: 10,
                multipleSelection: [],
                updateDisabled: true,
                deleteDisabled: true,
                dialogFormVisible: false,
                addLoading: false,
                form: {
                    id: '',
                    name: '',
                    price: '',
                    flavor: '',
                    tid: '',
                    remark: '',
                },
                rules: {
                    name: [

                        { validator: validateName, required: true, trigger: 'blur' }
                    ],
                    price: [
                        { validator: validatePrice, required: true, trigger: 'blur' }
                    ],
                    flavor: [
                        { validator: validateFlavor, required: true, trigger: 'blur' }
                    ],
                    tid: [
                        { validator: validateType, required: true, trigger: 'blur' }
                    ]
                },
                options: [],
            }
        },
        created() {
            this.findAllMenu(this.index,this.limit)
            findAllType().then(res => { this.options = res })
        },
        methods: {
            findAllMenu(index, limit){
                findAllMenu(index,limit)
                    .then( res => {
                        this.tableData = res.data
                        this.count = res.count
                    })
            },
            saveOrUpdate(){

                let data = {
                    id: this.form.id,
                    name: this.form.name,
                    price: this.form.price,
                    flavor: this.form.flavor,
                    tid: this.form.tid,
                    remark: this.form.remark,
                }
                this.addLoading = true
                
                if(data.id === ''){
                    saveMenu(data).then(res => {
                        this.$Message.success("新增成功!")
                        this.findAllMenu(this.index, this.limit)
                    })
                }else{
                    updateByIdMenu(data).then(res => {
                        this.$Message.success("修改成功!")
                        this.findAllMenu(this.index, this.limit)
                    })
                }

                this.dialogFormVisible = false
                this.addLoading = false
            },


            // 按钮交互
            submitForm(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.saveOrUpdate()
                    } else {
                        return false;
                    }
                })
            },
            handleDelete(row) {
                deleteByIdMenu(row.id).then(res => {
                    this.$Message("删除成功!")
                    this.findAllMenu(this.index, this.limit)
                })
            },
            handleDeletes(row){
                let ids = []
                for (let index = 0; index < row.length; index++) {
                    ids.push(row[index].id)
                }
                let params = {
                    ids: ids
                }
                deleteBatchIdsMenu(params).then(res => {
                    this.$Message("删除成功!")
                    this.findAllMenu(this.index, this.limit)
                })
            },
            handleUpdate(row) {
                this.dialogFormVisible = true
                findByIdMenu(row.id).then(res => {
                    // this.form = res
                    this.form = {
                        id: res.id,
                        name: res.name,
                        price: (res.price).toString(),
                        flavor: res.flavor,
                        tid: res.tid,
                        remark: res.remark,
                    }
                })
            },
            handleAdd(){
                this.dialogFormVisible = true
                this.form = {
                    id: '',
                    name: '',
                    price: '',
                    flavor: '',
                    tid: '',
                    remark: '',
                }
            },

            // 分页
            // 修改每页数量
            handleSizeChange(val) {
                if(this.count < val){
                    this.index = Math.ceil(this.count / val)
                }
                this.limit = val
                this.findAllMenu(this.index, this.limit)
            },
            // 修改第几页
            handleCurrentChange(val) {
                this.index = val
                this.findAllMenu(this.index, this.limit)
            },

            // 多选
            handleSelectionChange(val) {
                this.multipleSelection = val;

                if (this.multipleSelection.length === 1) {
                    this.updateDisabled = false
                }else{
                    this.updateDisabled = true
                }

                if (this.multipleSelection.length === 0) {
                    this.deleteDisabled = true
                }else{
                    this.deleteDisabled = false
                }
            }


        }
    }
</script>

<style>
    /* 清除 input[type=number] 样式 */
    input[type=number] {
        -moz-appearance:textfield;
    }
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>