<script >
import {  getCurrentInstance } from 'vue';
import { RouterView, RouterLink } from 'vue-router'
import Tabulation from './components/Tabulation.vue';
import { mainStore } from './stores/index.js'
import { storeToRefs } from "pinia";
export default {
    setup(){
        const store = mainStore();
        const { user_accessToken,user_loginname,user_id,user_avatar_url } = storeToRefs(store);
        return {
        store,user_accessToken,user_loginname,user_id,user_avatar_url
        }
    },
    data () {
        const { proxy } = getCurrentInstance()
        return {
            proxy,
            isShowLoginDialog: 0,
            isNavOpened: false
        }
    },
    methods: {
        login () {
            let inputData = document.querySelector('#accesstoken').value
            this.proxy.$http({
                method: 'post',
                url: `https://cnodejs.org/api/v1/accesstoken`,
                data: { accesstoken: inputData },
            }).then(res => {
                let { data } = res.data;
                user_accessToken.value=inputData;
                user_loginname.value=data.loginname;
                user_id.value=data.id;
                user_avatar_url.value=data.avatar_url;
                //console.log(data);
            }).catch(error=>{
                if (error.response.data.error_msg=='错误的accessToken') {
                    alert('错误的accessToken')
                }
                //console.log(error.response.data)
            })
            /*
            store.$patch((state) => {
            state.msg = "pinia good!";
            state.counter++;
            });*/
        },
        openNav () {
            if (this.isNavOpened == false) {
                document.querySelector('#sidebar').style.height = '200px';
                let dom = document.querySelector('#nav')
                dom.style.height = '164px';
                dom.style.width = '100%';
                let doms = document.querySelectorAll('.nav-item')
                for (const key of doms) {
                    key.style.height = '25%';
                    key.style.width = '100%';
                }
                doms = document.querySelectorAll('.nav-item a')
                for (const key of doms) {
                    key.style.height = 'auto';
                    key.style.width = 'auto';
                    key.style.lineHeight = 'normal';

                }
                this.isNavOpened = true;
            } else {
                document.querySelector('#sidebar').style.height = '54px';
                let dom = document.querySelector('#nav')
                dom.style.height = '0';
                dom.style.width = '0';
                let doms = document.querySelectorAll('.nav-item')
                for (const key of doms) {
                    key.style.height = '0';
                    key.style.width = '0';
                }
                doms = document.querySelectorAll('.nav-item a')
                for (const key of doms) {
                    key.style.height = '0';
                    key.style.width = '0';
                    key.style.lineHeight = '0';

                }
                this.isNavOpened = false;
            }

        }
    },
    created () { 
 
        window.addEventListener('resize', function () {
            if (window.innerWidth >= 768) {
                document.querySelector('#sidebar').style.height = '100vh';
                let dom = document.querySelector('#nav')
                dom.style.height = '75%';
                dom.style.width = '80%';
                let doms = document.querySelectorAll('.nav-item')
                for (const key of doms) {
                    key.style.height = '20%';
                    key.style.width = '100%';
                }
                doms = document.querySelectorAll('.nav-item a')
                for (const key of doms) {
                    key.style.height = 'auto';
                    key.style.width = 'auto';
                    key.style.lineHeight = 'normal';

                }
            } else {
                document.querySelector('#sidebar').style.height = '54px';
                let dom = document.querySelector('#nav')
                dom.style.height = '0';
                dom.style.width = '0';
                let doms = document.querySelectorAll('.nav-item')
                for (const key of doms) {
                    key.style.height = '0';
                    key.style.width = '0';
                }
                doms = document.querySelectorAll('.nav-item a')
                for (const key of doms) {
                    key.style.height = '0';
                    key.style.width = '0';
                    key.style.lineHeight = '0';

                }
            }
        })
    },
    components: { RouterView, RouterLink, Tabulation }
}
</script>

<template>
    <div class="sidebar" id="sidebar">
        <tabulation class="tab" @click="openNav()"></tabulation>
        <div class="userbar">
            <div class="userimg" @click="isShowLoginDialog = 1"></div>
        </div>
        <div class="nav" id="nav">
            <div class="nav-item">
                <a href="/?tab=all&page=1">首页</a>
            </div>
            <div class="nav-item">
                <router-link to="/start">新手入门</router-link>
            </div>
            <div class="nav-item">
                <router-link to="/api">API</router-link>
            </div>
            <div class="nav-item">
                <router-link to="/about">关于</router-link>
            </div>
        </div>
    </div>
    <div class="content">
        <RouterView />
    </div>
    <div class="logindialog-bg" v-if="isShowLoginDialog">
        <div class="logindialog">
            <div class="logindialog-cancel" @click="isShowLoginDialog = 0">关闭</div>
            <div class="inner">
                <div id="signin_form" class="form-horizontal">
                    <div class="control-group">
                        <label class="control-label" for="name">accessToken</label>
                        <div class="controls">
                            <input class="input-xlarge" id="accesstoken" name="name" size="30" type="password">
                        </div>
                    </div>
                    <div class="form-actions">
                        <input type="submit" class="span-primary" @click="login()" value="登录">
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style>
@import '@/assets/base.css';



.sidebar {
    background-color: #2172f3;

}

.nav-item {
    border-bottom: 1px solid #9c9c9c;
}

.nav-item a {
    color: white;

}

.put_top,
.put_tab {
    margin: 12px;
    padding: 2px 15px;
    border-radius: 5px;
    min-width: 30px;
    min-height: 30px;
}

.put_top {
    background-color: #80bd01;
    color: white;
}

.put_tab {
    background-color: #e5e5e5;
    color: #9c9c9c;
}
.logindialog-cancel{ 
    background-color: #08c;
    border-radius: 56px;
}

@media screen and (min-width: 768px) {
    #app {
        position: relative;
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
    }

    .tab {
        height: 0;
        width: 0;
        opacity: 0;
    }

    .sidebar {
        width: 15%;
        height: 100vh;
        position: fixed;
        left: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .sidebar .userbar {
        width: 100%;
        height: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .sidebar .userbar .userimg {
        background-color: black;
        height: 78px;
        width: 78px;
        border-radius: 300px;
        cursor: pointer;
    }

    .sidebar .nav {
        height: 75%;
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .sidebar .nav .nav-item {
        width: 100%;
        height: 20%;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .nav-item a:after {
        background-color: #fff;
    }

    .content {
        width: 85%;
        min-height: 100vh;
        position: absolute;
        right: 0;
    }

    .logindialog-bg {
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: rgba(55, 55, 55, 0.8);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .logindialog {
        height: 50%;
        width: 50%;
        position: absolute;
        border-radius: 12px;
        background-color: aliceblue;
        box-shadow: 5px 5px 5px #131313;
    }

    .logindialog-cancel {
        position: absolute;
        right: 0;
        margin-right: 5px;
        margin-top: 5px;
        cursor: pointer;
    }

    .logindialog .inner {
        position: absolute;
        left: 25%;
        top: 25%;
    }

    .control-group {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 12px;
        margin-bottom: 12px;
    }

    .form-actions {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .span-primary {
        cursor: pointer;
        border-radius: 3px;
        background-color: #08c;
    }

    input {
        background-color: #fff;
        border: 1px solid #ccc;
        transition: border linear .2s, box-shadow linear .2s;
        border-radius: 12px;
        height: 30px;
    }

    input:focus {
        border-color: rgba(82, 168, 236, .8);
        outline: 0;
        box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(82 168 236 / 60%);
    }


}

@media screen and (max-width: 768px) {
    #app {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .sidebar {
        width: 100%;
        height: 54px;
        padding-left: 10px;
    }

    .icon.tab {
        max-width: 32px;
        max-height: 32px;
    }

    .userbar {
        width: 0;
        height: 0;
    }

    .nav {
        height: 168px;
    }

    .nav-item {
        height: 25%;
        display: flex;
        align-items: center;
    }

    .sidebar div,
    .sidebar div a {
        height: 0;
        width: 0;
        line-height: 0;
        overflow: hidden
    }

}
</style>
