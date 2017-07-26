<template>
    <Row class="vm-login vm-panel">
        <Col span="10" class="login-form">
            <div class="login-header">
                <img src="../assets/img/logo.png" height="80" alt="">
                <p><span>VUE</span>MANAGER</p>
            </div>
            <div class="login-form">
                <Form ref="formInline" :model="formInline" :rules="ruleInline">
                    <Form-item prop="user" class="form-item">
                        <Input type="text" v-model="formInline.user" placeholder="please enter username"/>
                    </Form-item>
                    <Form-item prop="password" class="form-item">
                        <Input type="password" v-model="formInline.password" placeholder="please enter password"/>
                    </Form-item>
                    <Form-item class="form-item">
                        <Button type="primary" @click="handleSubmit('formInline')" long>Login</Button>
                    </Form-item>
                </Form>
                <!--<Input v-model="username" placeholder="please enter username"></Input>-->
                <!--<Input v-model="password" type="password" placeholder="Please enter password"></Input>-->
                <!--<Button type="primary">Login</Button>-->
            </div>
            <div class="login-footer">
                <Checkbox v-model="remember">Remember</Checkbox>
                <span class="forget"><a href="#">Forget Password</a></span>
            </div>
        </Col>
        <Col span="14" class="login-ad">
        <span class="photo-author">Photo: Jure Kravanja</span>
        </Col>
    </Row>
</template>
<script>
    import * as types from '../store/types';
    export default {
        name: 'VmLogin',
        data: function () {
            return {
                remember: false,
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let data = {
                            appId: 'backend',
                            grant_type: 'password',
                            username: this.formInline.user,
                            password: this.formInline.password
                        }
                        this.$store.commit(types.LOGIN, '123456');
                        let redirect = this.$route.query.redirect || '/';
                        this.$router.push({
                            path: redirect
                        });
//                    api.Login(data).then(res =>{
//                      console.log(res);
//                      if(res.code == 200){
//                        this.$store.commit(types.LOGIN, res.data.access_token);
//                        let redirect = this.$route.query.redirect || '/';
//                        this.$router.push({
//                            path: redirect
//                        });
//                        // this.$router.replace('/index');
//                      }else{
//                        this.$Message.error(res.message);
//                      }
//                    });
                    } else {
                        this.$message.error('表单验证失败!');
                    }
                });
            }
        },
        mounted(){
            if (localStorage.token) {
                this.$router.replace('/index');
            }
        }
    };
</script>
