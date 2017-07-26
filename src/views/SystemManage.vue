<template>
    <VmTable title="系统管理"
             type="edit"
             :columns="dataColumns"
             :data="dataTable"
             :total="dataTotal"
             v-on:add-ok="add"
             v-on:edit-ok="edit"
             v-on:delete-ok="deletefn"
             v-on:page-change="pageChange"
             class="vm-margin">
    </VmTable>
</template>

<script>
    import VmTable from '../components/vm-table';
    import { mapState } from 'vuex';
    export default {
        name:'SystemManage',
        components:{
            VmTable
        },
        methods: {
            add: function (data) {
                this.dataTable.unshift(data);
            },
            edit: function (data) {
                this.dataTable.forEach(function (elem) {
                    if (elem.id === data.id) {
                        for (let i in data) {
                            elem[i] = data[i];
                        }
                    }
                });
            },
            deletefn: function (data) {
                for (let i = 0; i < this.dataTable.length; i++) {
                    for (let j = 0; j < data.length; j++) {
                        if (this.dataTable[i].id === data[j].id) {
                            this.dataTable.splice(i, 1);
                        }
                    }
                }
            },
            pageChange:function (pageInfo) {
                let params = {
                    offset:pageInfo.showNum * (pageInfo.currentPage-1),
                    limit:pageInfo.showNum,
                    order:'asc'
                };
                this.$store.dispatch('getSystemList',params);
            }
        },
        data(){
            return {
                dataColumns: [
                    {
                        id: '20156541',
                        title: '编号',
                        key: 'systemId'
                    },
                    {
                        id: '20156542',
                        title: '图标',
                        key: 'icon'
                    },
                    {
                        id: '20156543',
                        title: '系统标题',
                        key: 'title'
                    },
                    {
                        id: '20156544',
                        title: '系统名称',
                        key: 'name'
                    }
                    ,
                    {
                        id: '20156545',
                        title: '根目录',
                        key: 'basepath'
                    },
                    {
                        id: '20156546',
                        title: '状态',
                        key: 'status'
                    }
                ],
            };
        },
        mounted(){
            this.$store.dispatch('getSystemList');
        },
        computed: mapState({
            dataTable:state=>state.systemList,
            dataTotal:state=>state.systemListCount
        }),

    };
</script>