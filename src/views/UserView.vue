<template>
    <div>
        <div class="panel">
            <div class="header">
                <ul class="breadcrumb">
                    <li><a href="/">主页</a><span class="divider">/</span></li>
                </ul>
            </div>
            <div class="inner userinfo">
                <div class="user_big_avatar">
                    <img :src="user.avatar_url" class="user_avatar"
                        :title="user.loginname">
                </div>
                <a class="dark">atian25</a>
                <div class="user_profile">
                    <ul class="unstyled">
                        <span class="big">{{user.score}}</span> 积分
                        <li>
                            <i class="fa fa-lg fa-fw fa-github"></i>
                            <a class="dark" :href="'https://github.com/'+user.githubUsername" target="_blank">
                                {{'@'+user.githubUsername}}
                            </a>
                        </li>
                    </ul>
                </div>
                <p class="col_fade">注册时间 {{this.$changeTime(user.create_at)}}</p>

            </div>
        </div>
        <div class="panel">
            <div class="header">
                <span class="col_fade">最近创建的话题</span>
            </div>
            <div class="cell" v-for="(item, index) in user.recent_topics" :key="index">
                <router-link class="user_avatar pull-left" :to="'/user/'+item.author.loginname">
                    <img :src="item.author.avatar_url" :title="item.author.loginname">
                </router-link>
                <a class="last_time pull-right" >
                    <img class="user_small_avatar" :src="item.author.avatar_url" :title="item.author.loginname">
                    <span class="last_active_time">{{this.$changeTime(item.last_reply_at)}}</span>
                </a>
                <div class="topic_title_wrapper">
                <router-link class="topic_title" :to="'/article/'+item.id" :title="item.title">
                        {{item.title}}
                    </router-link>
                </div>
            </div>

        </div>
        <div class="panel">
            <div class="header">
                <span class="col_fade">最近参与的话题</span>
            </div>
            <div class="cell" v-for="(item, index) in user.recent_replies" :key="index">
                <router-link class="user_avatar pull-left" :to="'/user/'+item.author.loginname">
                    <img :src="item.author.avatar_url" :title="item.author.loginname">
                </router-link>
                <a class="last_time pull-right" >
                    <img class="user_small_avatar" :src="item.author.avatar_url" :title="item.author.loginname">
                    <span class="last_active_time">{{this.$changeTime(item.last_reply_at)}}</span>
                </a>
                <div class="topic_title_wrapper">
                    <router-link class="topic_title" :to="'/article/'+item.id"
                        :title="item.title">
                        {{item.title}}
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, getCurrentInstance } from 'vue'
import { RouterLink } from 'vue-router'
export default {
    props: { loginname: String },
    data(){
        const { proxy } = getCurrentInstance()
        return {
            proxy,
            user:{}
        }
    },
    methods: {
        getUser () {
            this.proxy.$http({
                url: 'https://cnodejs.org/api/v1/user/' + this.loginname
            }).then(res => {
                let { data } = res.data;
                this.user=data
                //console.log(data);
            })
        }
    },
    created(){
        this.getUser()
    },
    components:{RouterLink}
}
</script>

<style scoped>
.panel {
    margin-bottom: 13px;
}

.panel .header {
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
}

.panel .inner,
.panel .inner li {
    line-height: 2em;
}

.panel .header.topic_header,
.panel .inner {
    background-color: #fff;
}

.panel .inner {
    padding: 10px;
    border-radius: 0 0 3px 3px;
}

.panel .inner.post,
.panel .inner.reply,
.panel .inner.topic,
.panel .inner.userinfo {
    padding: 10px;
    border-top: 1px solid #e5e5e5;
}

.breadcrumb {
    padding: 0;
    margin: 0;
    border: none;
    background: 0 0;
}

.breadcrumb,
.pagination ul,
.span-common {
    box-shadow: none;
}

.user_big_avatar {
    float: left;
    margin-right: 10px;
}

.user_big_avatar img {
    width: 40px;
    height: 40px;
}

.panel .inner a {
    color: #778087;
}

.user_profile {
    margin-top: 20px;
    clear: left;
}

.col_fade {
    color: #ababab;
}

.cell {
    position: relative;
    padding: 10px 0 10px 10px;
    font-size: 14px;
    overflow: hidden;
}

.panel .cell {
    padding-right: 10px;
    background: #fff;
    border-top: 1px solid #f0f0f0;
}

.user_avatar img,
.user_big_avatar img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
}
.last_time {
    font-size: 11px;
    display: inline-block;
    margin-left: 20px;
    color: #777;
}

.last_time .user_small_avatar {
    height: 18px;
    width: 18px;
    vertical-align: middle;
    margin-right: 0.5em;
    border-radius: 3px;
}

.last_time .last_active_time {
    text-align: right;
    min-width: 50px;
    display: inline-block;
    white-space: nowrap;
}

.topic_title_wrapper {
    white-space: nowrap;
}

a.topic_title {
    max-width: 70%;
    white-space: nowrap;
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    line-height: 30px;
}

.pull-left {
    float: left;
}

.pull-right {
    float: right;
}

</style>