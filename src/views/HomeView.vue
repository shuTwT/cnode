<template>
    <div class="main">
        <div class="header">
            <div class="titlebar">
                <div>CNode社区</div>
            </div>
            <div class="tabbar">
                <div :class="'all ' + primaryTab">
                    <router-link :to="{ name: 'home', query: { tab: 'all' } }" @click="switchTab('all')">全部
                    </router-link>
                </div>
                <div :class="'good ' + primaryTab">
                    <router-link :to="{ name: 'home', query: { tab: 'good' } }" @click="switchTab('good')">精华
                    </router-link>
                </div>
                <div :class="'share ' + primaryTab">
                    <router-link :to="{ name: 'home', query: { tab: 'share' } }" @click="switchTab('share')">分享
                    </router-link>
                </div>
                <div :class="'ask ' + primaryTab">
                    <router-link :to="{ name: 'home', query: { tab: 'ask' } }" @click="switchTab('ask')">问答
                    </router-link>
                </div>
                <div :class="'job ' + primaryTab">
                    <router-link :to="{ name: 'home', query: { tab: 'job' } }" @click="switchTab('job')">招聘
                    </router-link>
                </div>
                <div :class="'test ' + primaryTab">
                    <router-link :to="{ name: 'home', query: { tab: 'all' } }" @click="switchTab('test')">客户端测试
                    </router-link>
                </div>
            </div>
        </div>
        <div class="topic-list">
            <div :class="'topic-item '+isLoading" v-for="(item, index) in topicArray" :key="index">
                <router-link class="user_avatar" :to="'/user/'+item.author.loginname" >
                    <img class="image" :src="item.author.avatar_url" :title="item.author.loginname">
                </router-link>
                <span class="reply_count">
                    <span class="count_of_replies" title="回复数">
                        {{ item.reply_count }}
                    </span>
                    <span class="count_seperator">/</span>
                    <span class="count_of_visits" title="点击数">
                        {{ item.visit_count }}
                    </span>
                </span>
                <div class="topic_title_wrapper">

                    <span v-if="item.top" class="put_top">置顶</span>
                    <span v-else class="put_tab">{{ checkTab(item.tab) }}</span>
                    <router-link class="topic_title" :to="'/article/'  + item.id" title="Node.js 18 新特性解读">
                        {{ item.title }}
                    </router-link>
                </div>
                <a class="last_time">
                    <span class="last_active_time">{{ this.$changeTime(item.last_reply_at) }}</span>
                </a>
            </div>
        </div>
        <div class="pagination">
            <ul>
                <li class="disabled"><a @click="switchPage(page, 'left')">«</a></li>
                <li><a>...</a></li>
                <li><a :href="'/?tab=all&amp;page=' + page">{{ page }}</a></li>
                <li><a>...</a></li>
                <li class="disabled"><a @click="switchPage(page, 'right')">»</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
import { reactive, getCurrentInstance } from 'vue'
import { RouterLink } from 'vue-router'
export default {
    data () {
        const { proxy } = getCurrentInstance()
        return {
            proxy,
            topicArray: reactive([]),
            isLoading:'loading',
            page: '',
            tab: '',
            primaryTab: ''
        }
    },
    methods: {
        switchPage (page, position) {
            if (position == 'left' && page > 1) {
                window.location.href = `/?tab=${this.tab}&page=${parseInt(this.page) - 1}`
            } else if (position == 'right' && page < 40) {
                window.location.href = `/?tab=${this.tab}&page=${parseInt(this.page) + 1}`
            }
        },
        switchTab (tab) {
            
            this.isLoading='loading'
            this.topicArray=[]
            this.page = this.$route.query.page ? this.$route.query.page : '1';
            this.tab = this.$route.query.tab ? this.$route.query.tab : 'all';
            this.getTopic();
            if (tab == 'all') {
                this.primaryTab = 'primary-all'
            }
            else if (tab == 'good') {
                this.primaryTab = 'primary-good'
            }
            else if (tab == 'share') {
                this.primaryTab = 'primary-share'
            }
            else if (tab == 'ask') {
                this.primaryTab = 'primary-ask'
            }
            else if (tab == 'job') {
                this.primaryTab = 'primary-job'
            }
            else if (tab == 'test') {
                this.primaryTab = 'primary-test'
            }
           // console.log(tab);
        },
        checkTab (tab) {
            let articleTab = '';
            if (tab == 'all') {
                articleTab = '全部'
            }
            else if (tab == 'good') {
                articleTab = '精华'
            }
            else if (tab == 'share') {
                articleTab = '分享'
            }
            else if (tab == 'ask') {
                articleTab = '问答'
            }
            else if (tab == 'job') {
                articleTab = '招聘'
            }
            else if (tab == 'dev') {
                articleTab = '客户端测试'
            }
            return articleTab;
        },
        getTopic () {
            this.proxy.$http({
                url: `https://cnodejs.org/api/v1/topics?tab=${this.tab}&page=${this.page}&limit=10`
            }).then(res => {
                let { data } = res.data
                this.topicArray = data;
                this.isLoading=''
                //console.log(res)
            })
        }
    }, created () {
        this.page = this.$route.query.page ? this.$route.query.page : '1';
        this.tab = this.$route.query.tab ? this.$route.query.tab : 'all';
        this.getTopic();
        // console.log(this.tab);
    }, mounted () { },
    components: { RouterLink }
}
</script>

<style  scoped>
@media screen and (min-width: 768px) {
    .main {
        width: 100%;
        min-height: 100%;
    }

    .header {
        width: 100%;
        height: 10vh;
        background-color: #2196f3;
        display: flex;
        flex-direction: column;
    }

    .titlebar {
        height: 50%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .titlebar>div {
        text-align: center;
        font-size: larger;
        font-weight: bolder;
        color: white;
    }

    .tabbar {
        height: 50%;
        display: flex;
        flex-direction: row;
    }

    .tabbar>div {
        flex: 1;
        cursor: pointer;
        text-align: center;
        height: 100%;
    }

    .tabbar>.all.primary-all,
    .tabbar>.good.primary-good,
    .tabbar>.share.primary-share,
    .tabbar>.ask.primary-ask,
    .tabbar>.job.primary-job,
    .tabbar>.test.primary-test {
        background-color: #0088f8;
    }

    .tabbar>div>a {
        color: white;
        width: 100%;
        height: 100%;
    }

    .tabbar>div>a:after {
        background-color: #fff;
    }

    .topic-list {
        width: 100%;
        height: 80vh;
        display: flex;
        flex-direction: column;
        animation: flyin 1s;
    }

    .topic-item {
        width: 100%;
        height: 10%;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #f0f0f0;
        justify-content: center;
        align-items: center;
    }

    .topic-item:hover {
        background-color: #f5f5f5;
    }

    .user_avatar img {
        width: 30px;
        height: 30px;
        border-radius: 3px;
        cursor: pointer;
    }

    .last_time {
        cursor: pointer;
        min-height: 30px;
        min-width: 50px;
    }

    .last_time .user_small_avatar {
        height: 18px;
        width: 18px;
        vertical-align: middle;
        margin-right: 0.5em;
        border-radius: 3px;
    }

    .topic-item .user_avatar {
        width: 5%;
    }

    .topic-item .reply_count {
        max-width: 10%;
        min-width: 60px;
        min-height: 30px;
    }

    .topic-item .reply_count>span {
        font-size: small;
    }

    .topic-item .topic_title_wrapper {
        width: 50%;
    }

    .topic-item .topic_title{ 
        min-height: 30px;
        min-width: 200px;
    }

    .pagination {
        width: 100%;
        height: 10vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .pagination ul {
        box-shadow: none;
        display: inline-block;
        margin-bottom: 0;
        margin-left: 0;
        border-radius: 4px;
        box-shadow: 0 1px 2px rgb(0 0 0 / 5%);
    }

    .pagination ul>li {
        display: inline;
    }

    .pagination ul>li:first-child>a {
        border-left-width: 1px;
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
    }

    .pagination ul>.disabled>a,
    .pagination ul>.disabled>a:focus,
    .pagination ul>.disabled>a:hover,
    .pagination ul>.disabled>span {
        color: #999;
        cursor: default;
        background-color: transparent;
    }

    .pagination ul>li>a,
    .pagination ul>li>span {
        float: left;
        padding: 4px 12px;
        line-height: 20px;
        text-decoration: none;
        background-color: #fff;
        border: 1px solid #ddd;
        border-left-width: 0;
    }
}

@media screen and (max-width: 768px) {
    .main {
        width: 100%;
        min-height: 100%;
    }

    .header {
        width: 100%;
        height: 10vh;
        background-color: #2196f3;
        display: flex;
        flex-direction: column;
    }

    .titlebar {
        height: 50%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .titlebar>div {
        text-align: center;
        font-size: larger;
        font-weight: bolder;
        color: white;
    }

    .tabbar {
        height: 50%;
        display: flex;
        flex-direction: row;
    }

    .tabbar>div {
        flex: 1;
        cursor: pointer;
        text-align: center;
        height: 100%;
    }

    .tabbar>.all.primary-all,
    .tabbar>.good.primary-good,
    .tabbar>.share.primary-share,
    .tabbar>.ask.primary-ask,
    .tabbar>.job.primary-job,
    .tabbar>.test.primary-test {
        background-color: #0088f8;
    }

    .tabbar>div>a {
        color: white;
        width: 100%;
        height: 100%;
    }

    .tabbar>div>a:after {
        background-color: #fff;
    }

    .topic-list {
        width: 100%;
        height: 90vh;
        display: flex;
        flex-direction: column;
        animation: flyin 1s;
    }

    .topic-item {
        width: 100%;
        height: 10%;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #f0f0f0;
        justify-content: center;
        align-items: center;
    }

    .topic-item:hover {
        background-color: #f5f5f5;
    }

    .user_avatar img {
        width: 30px;
        height: 30px;
        border-radius: 3px;
        cursor: pointer;
    }

    .user_small_avatar {
        height: 18px;
        width: 18px;
        vertical-align: middle;
        margin-right: 0.5em;
        border-radius: 3px;
    }

    .last_time {
        cursor: pointer;
        overflow: hidden;
        height: 18px;
        width: 60px;
    }

    .topic-item .user_avatar {
        width: 30px;
    }

    .topic-item .reply_count {
        display: flex;
        position: absolute;
        left: 85px;
        bottom: 0;
        text-align: left;
        line-height: 2em;
        font-size: 10px;
    }

    .topic-item .reply_count>span {
        font-size: 10px;
        color: #b4b4b4;
    }


    .topic-item .topic_title_wrapper {
        width: 65%;
    }

    .put_top,
    .put_tab {
        width: 20px;
        height: 20px;
        font-size: x-small
    }

    .topic_title {
        font-size: smaller;
        display: inline-block;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .last_active_time {
        display: inline-block;
        font-size: smaller;
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        text-overflow: ellipsis;
    }
    .pagination {
        width: 100%;
        height: 10vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .pagination ul {
        box-shadow: none;
        display: inline-block;
        margin-bottom: 0;
        margin-left: 0;
        border-radius: 4px;
        box-shadow: 0 1px 2px rgb(0 0 0 / 5%);
    }

    .pagination ul>li {
        display: inline;
    }

    .pagination ul>li:first-child>a {
        border-left-width: 1px;
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
    }

    .pagination ul>.disabled>a,
    .pagination ul>.disabled>a:focus,
    .pagination ul>.disabled>a:hover,
    .pagination ul>.disabled>span {
        color: #999;
        cursor: default;
        background-color: transparent;
    }

    .pagination ul>li>a,
    .pagination ul>li>span {
        float: left;
        padding: 4px 12px;
        line-height: 20px;
        text-decoration: none;
        background-color: #fff;
        border: 1px solid #ddd;
        border-left-width: 0;
    }
}
</style>