<template>
    <div class="panel markdown-body">
        <div class="header topic_header">
            <span class="topic_full_title">
                <span v-if="articleData.top" class="put_top">置顶</span>
                {{ articleData.title }}
            </span>
            <div class="changes">
                <span>
                    发布于 {{ this.$changeTime(articleData.create_at) }}
                </span>
                <span>
                    作者 <a href="/user/atian25">{{ author.loginname }}</a>
                </span>
                <span>
                    {{ articleData.visit_count }} 次浏览
                </span>
                <span> 来自 {{ articleTab }}</span>
            </div>
        </div>
        <div class="inner topic">
            <div class="topic_content" v-html="markdownText">
            </div>
        </div>
    </div>
    <div class="panel">
        <div class="header">
            <span class="col_fade">13 回复</span>
        </div>
        <div class="cell reply_area reply_item" v-for="(item, index) in replies" :key="index">
            <div class="author_content">
                <a class="user_avatar">
                    <img :src="item.author.avatar_url"></a>

                <div class="user_info">
                    <a class="dark reply_author">{{item.author.loginname}}</a>
                    <a class="reply_time">{{index+1}}楼•{{this.$changeTime(item.create_at)}}</a>
                </div>
                <div class="user_action">
                    <span>
                       <svg t="1653891925122" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2846" width="200" height="200"><path d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z" p-id="2847"></path></svg>
                        <span class="up-count">
                            {{item.ups.length}}
                        </span>
                    </span>
                    <span>
                    </span>
                </div>
            </div>
            <div class="reply_content markdown-body" v-html="item.content">
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, getCurrentInstance } from 'vue'
export default {
    props: { id: String },
    data () {
        const { proxy } = getCurrentInstance()
        return {
            proxy,
            replies:reactive([]),
            articleData: {},
            author: {},
            articleTab: '',
            markdownText: ''
        }
    },
    methods: {
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
        getArticle () {
            this.proxy.$http({
                url: 'https://cnodejs.org/api/v1/topic/' + this.id
            }).then(res => {
                let { data } = res.data;
                this.articleData = data;
                this.author = data.author;
                this.markdownText = data.content;
                this.articleTab = this.checkTab(data.tab);
                this.replies=data.replies;
                //console.log(data.replies);
            })
        }
    },
    created () {
        this.getArticle();
    }
}
</script>

<style scoped>
.panel .header {
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
}

.content .topic_full_title {
    font-size: 22px;
    font-weight: 700;
    margin: 8px 0;
    display: inline-block;
    vertical-align: bottom;
    width: 75%;
    line-height: 130%;
}

.content .changes,
.cell,
.unstyled li div,
.user_name,
a.dark,
a.topic_title {
    overflow: hidden;
}

.content .changes {
    font-size: 12px;
    color: #838383;
}

.content .changes span:before {
    content: "•";
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

.panel .inner.topic {
    padding: 10px;
    border-top: 1px solid #e5e5e5;
}

.topic_content {
    margin: 0 10px;
}
.cell {
    position: relative;
    padding: 10px 0 10px 10px;
    font-size: 14px;
}
.panel .cell {
    padding-right: 10px;
    background: #fff;
    border-top: 1px solid #f0f0f0;
}
.user_avatar img, .user_big_avatar img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
}
.reply_area .author_content{ 
    display: flex;
    flex-direction: row;
}
.reply_author{ 
    margin-left:10px
}
.reply_time{ 
    margin-left: 10px;
}
.user_action{ 
    position: absolute;
    right: 0;
}
.user_action .icon{ 
    height: 20px;
    width: 20px;
}
</style>