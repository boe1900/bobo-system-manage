

<template>
    <div class="login">
        <div class="login-form">
            <h1 style="margin-bottom:10px;">后台管理系统</h1>
            <Form ref="formInline" :model="formInline" :rules="ruleInline">
                <Form-item prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="Username"/>
                </Form-item>
                <Form-item prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="Password"/>
                </Form-item>
                <Form-item>
                    <Button type="success" @click="handleSubmit('formInline')" long>登录</Button>
                </Form-item>
            </Form>
        </div>
    </div>
</template>
<script>
    import * as types from '../store/types';
    import api from '../fetch/api';

    export default {
        data () {
            return {
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
            }
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
                    this.$store.commit(types.LOGIN, "123456");
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
                })
            }
        },
        mounted(){
          if (localStorage.token) {
            this.$router.replace('/index');
          }
        }
    };
</script>
