<style scoped>

  .login {
      width: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      text-align: center;
      background-image:url(http://78rbeb.com1.z0.glb.clouddn.com/wp-content/uploads/2014/03/free-blurred-web-backgrounds-04.jpg);
  }

</style>

<template>
  <div class="login">
    <Row type="flex" justify="center" align="middle" style="height:100%">
      <Col span="4">
        <h1 style="margin-bottom:10px;">后台管理系统</h1>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <Form-item prop="user">
                <Input type="text" v-model="formInline.user" placeholder="Username">
                </Input>
            </Form-item>
            <Form-item prop="password">
                <Input type="password" v-model="formInline.password" placeholder="Password">
                </Input>
            </Form-item>
            <Form-item>
                <Button type="success" @click="handleSubmit('formInline')" long>登录</Button>
            </Form-item>
        </Form>
      </Col>
    </Row>
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
                      appId:'backend',
                      grant_type:'password',
                      username:this.formInline.user,
                      password:this.formInline.password
                    }
                    api.Login(data).then(res =>{
                      console.log(res);
                      if(res.code == 200){
                        this.$store.commit(types.LOGIN, res.data.access_token);
                        this.$router.replace('/index');
                      }else{
                        this.$Message.error(res.message);
                      }
                    });
                  } else {
                        message.error('表单验证失败!');
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
