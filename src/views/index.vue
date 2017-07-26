
<template>
    <div class="index">
        <Row class="header" type="flex" align="middle">
            <div class="logo">
                <img src="../assets/img/logo.png" height="30" alt=""/>
                <span>VUE</span>MANAGER <Tag>beta</Tag>
            </div>
            <Dropdown class="login-info" placement="bottom-end">
                <Button type="ghost">
                    <img src="../assets/img/photo.jpg" height="30" alt=""/>Admin
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <Dropdown-menu slot="list">
                    <Dropdown-item divided><Icon type="log-out"></Icon>Log out</Dropdown-item>
                    <Dropdown-item divided><Icon type="settings"></Icon>Setting</Dropdown-item>
                </Dropdown-menu>
            </Dropdown>
        </Row>
        <div class="sidebar">
            <Menu theme="dark" width="100%" class="menu" >
                <router-link to="/">
                    <Menu-item name="1">
                        <i class="fa fa-dashboard"></i>
                        Dashboard
                    </Menu-item>
                </router-link>

                <Submenu name="2">
                    <template slot="title">
                        <i class="fa fa-database"></i>
                        系统组织管理
                    </template>
                    <router-link to="/system-manage">
                        <Menu-item name="2-1">
                            系统管理
                        </Menu-item>
                    </router-link>
                    <router-link to="/organization-manage">
                        <Menu-item name="2-2">
                            组织管理
                        </Menu-item>
                    </router-link>
                </Submenu>
            </Menu>
        </div>
        <div class="main-content">
            <router-view></router-view>
            <p class="author">vue-manager designed by <a href="https://github.com/luosijie" target="_blank">Jesse Luo</a></p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
        }
    };
</script>
