<template>
  <div class="dialoguePage" ref="inputV">
    <div class="dialogueContent">
      <marquee-top></marquee-top>
      <div class="dialogueList" v-for="(item, index) in chatting" :key="index">
        <!-- 横向滚动列表 -->
        <div class="x-scroll" v-if="item.type==='x-scroll'">
          <div v-for="(arr, index) in item.arr" :key="index">
            <system-entry v-if="arr.type === 'systemEntry'" :system="arr"></system-entry>
            <!-- 推荐文章 -->
            <article-recommend v-else-if="arr.type === 'recomdArticleItem'" :article="arr"></article-recommend>
            <!-- 问题卡组 -->
            <questions-card @qCardDetail = "qCardDetail"
              v-else-if="(arr.type === 'youMayAsk') || (arr.type === 'simQdiffA')"
              :question="arr"
              @changeCover="changeCover"
              @detailQuestion="detailQuestion"
              ref="question"
            ></questions-card>
            <!-- 答案卡和helpDesk组件 -->
            <answer-card @listenToChildMes = 'showMesFromChild' @aCardDetail = "aCardDetail"
              v-else-if="(arr.type === 'answerCardItem') || (arr.type === 'helpDesk')"
              :answer="arr"

              @changeCover="changeCover"
              ref="answer"
            ></answer-card>
          </div>
        </div>
        <!-- 普通对话 -->
        <div v-else class="dialogueListItem" :class="item.type">{{item.text}}</div>
      </div>
    </div>

    <div class="inputValue">
      <!-- 胶囊 -->
      <capsule-button :capsules="capsules" @searchCapsule="searchCapsule"></capsule-button>
      <!-- 输入联想 -->
      <div class="tipCard" v-show="tipCard.length > 0 && tipCardShow">
        <div class="tipCardItem" v-for="(tip, index) in tipCard" :key="index" @click="sendMsg(tip)">
          <div>{{tip}}</div>
        </div>
      </div>
      <!-- 输入框 -->
      <div class="inputComponents">
        <form action="javascript:return true">
          <el-input
            type="text"
            :placeholder="pleaseEnter"
            v-model="inputValue"
            @keyup.native="inputIng($event, inputValue)"
            @blur="hideTipCardShow"
            @focus="inputFocus"
            :fetch-suggestions="inputIng"
          >
            <img
              slot="suffix"
              @click="sendMsg(inputValue)"
              src="../../assets/img/dialogue/icon_send.svg"
            >
          </el-input>
        </form>
      </div>
    </div>

    <detail-card @detailQuestion="detailQuestion" :detailCardShow="detail" @showChange="changeCover"></detail-card>
    <!-- 遮罩层 -->
    <transition name="el-zoom-in--center">
      <div class="cover" v-if="coverShow" @click="hideCover"></div>
    </transition>
  </div>
</template>

<script>
import marqueeTop from "./marqueeTop.vue";
import QuestionsCard from "./questionsCard.vue";
import AnswerCard from "./answerCard.vue";
import capsuleButton from "./capsuleButton.vue";
import articleRecommend from "./articleRecommend.vue";
import systemEntry from "./systemEntry.vue";
import dialogueCommonConstant from "../../constant/dialogueCommon.js";
import detailCard from "./detailCard.vue";


export default {
  name: "dialoguePage",
  components: {
    marqueeTop,
    QuestionsCard,
    AnswerCard,
    capsuleButton,
    articleRecommend,
    systemEntry,
    detailCard
  },
  data() {
    return {
      detail: {
        show: false,
        content: {},
        filenameExtension: ""
      },
      passedAsk: "",
      askInit: "你好",
      tipCardShow: false,
      inputValue: "",
      pleaseEnter: dialogueCommonConstant.pleaseEnter,
      coverShow: false,
      capsules: [],
      tipCard: [],
      chatting: [
        // {
        //   type: "x-scroll",
        //   arr: [
        //     {
        //       type: "recomdArticleItem",
        //       title: "recomdArticle011111111111111111111111111111111111111111",
        //       content: "http://janssenprod.vinfol.com/AMSe-userMannual.pdf"
        //     },
        //     {
        //       type: "recomdArticleItem",
        //       title: "帮助文档",
        //       content: "http://janssenprod.vinfol.com/e-Process System FAQ.pdf"
        //     },
        //     {
        //       type: "answerCardItem",
        //       property: {
        //         title: "短一点就不显示咯",
        //         shortText: "",
        //         longText:
        //           "责任归属：销售部、市场部 1.对于活动总体预算支出达到或超过5万元的支出达到或超过5万元的支出达到或超过5万元的推广活动，活动申请部门应当提交活动申请，经过医学事务部、HCC和财务部等相关部门的事前审批。对于活动总体预算支出少于5万元的推广活动，无需提前申请，直接进入下述4.3的流程。 2.推广活动的申请由销",
        //         html: "",
        //         pdf: "",
        //         jpg: "",
        //         mp4: ""
        //       }
        //     },
        //     {
        //       type: "answerCardItem",
        //       property: {
        //         title: "短一点但还有jpg要显示啊！",
        //         shortText: "",
        //         longText:
        //           "-申请人请准确选择推广活动类型\n-申请人请选择准确的业务需求描述\n-在“产品相关”选择“是“",
        //         html: "",
        //         pdf: "http://janssenprod.vinfol.com/AMSeuserManual.pdf",
        //         jpg: "http://janssenprod.vinfol.com/AMS活动申请与审批的注意事项22-27.1jpg",
        //         mp4: ""
        //       }
        //     },
        //     {
        //       type: "answerCardItem",
        //       property: {
        //         title: "AMS活动申请与审批的注意事项",
        //         shortText: "",
        //         longText:
        //           "-申请人请准确选择推广活动类型\n-申请人请选择准确的业务需求描述\n-在“产品相关”选择“是“，必须同时勾选“所属产品线“\n-请申请人准确选择 HCP 的服务类型\n-在会议日程与服务付费两栏中 HCP 的服务时间应前后一致\n-申请人应完整准确地填写“费用明细“项目对推广活动，如果是城市会，请检查活动类型是否为“城市会-网络会议” 或“城市会-纯现场”；如果是卫星会/展台，请检查活动类型是否为“卫星会/展台。\n\nAMS 申请界面上，“A 基本信息“一栏中，已对推广活动、产品培训及学术活动等三类活动的“业务需求”，进行了详细描述，方便大家根据具体活动来选择。\n对于推广活动，在“产品相关”一栏应选择 ”是“，同时, 必须进一步选择“所属产品线”（AMS 界面上紧挨着“产品相关”的下一行即是您应选的“ 所属产品线”一栏）\n\n对于推广活动，在“服务付费”一栏中“类型”应该是“演讲服务-推广活动”，或者“会议主持”，不应该是“顾问咨询”，“顾问咨询”是公司医学部/市场部等可以开展的活动“会议日程”中的专家服务时间，应与在“服务付费”一栏中专家“提供服务的时间”应保持一致。\n\n费用规划的完整性/必要性: 在“费用明细“中，请完整列示会议开支项目；若涉及易拉宝、展台有产品信息，在备注栏中注明 CRC 号；针对 HCP 用车，视具体情形 (比如, 会议在讲者任职的医院召开；但申请中有讲者的车费) 简要说明发生车费的理由。\n\n• 早餐/午餐/晚餐: AMS 系统分别列示了早餐、 午餐、晚餐，请根据具体情形，选择相应的选项。\n• 打车费用: 对于神州不覆盖的城市，选“打车费用（HCP 自行垫付）”，对于旅行社协调的会议用车，选“打车费用（旅行社支付），对于神州专车覆盖的城市，选“打车费用（神州专车）”。",
        //         html: "",
        //         pdf: "http://janssenprod.vinfol.com/AMSeuserManual.pdf",
        //         jpg: "http://janssenprod.vinfol.com/AMS活动申请与审批的注意事项22-27.jpg",
        //         mp4: ""
        //       }
        //     },
        //     {
        //       type: "answerCardItem",
        //       property: {
        //         title: "中国多发性骨髓瘤诊治指南(2017年修订)",
        //         shortText: "",
        //         longText: "????????????????????????????????????",
        //         html:
        //           '<p style="text-align:justify;text-justify:inter-ideograph"><span style="font-size: 14px;font-family: 宋体">&quot;多发性骨髓瘤(MM)是一种克隆性浆细胞异常增殖的恶性疾病，在很多国家是血液系统第２ 位常见恶性肿瘤，多发于老年，目前仍无法治愈。随着新药不断世及检测手段的提高，ＭＭ 的诊断和治疗得以不断改进和完善，每两年一次的中国ＭＭ 诊治指南的更新对于提高我国MM的诊治水平具有重要意义。&quot;</span></p><p style="text-align:justify;text-justify:inter-ideograph"><span style="font-size: 14px;font-family: 宋体">请您在使用这些文献信息的时候注意，我们所提供的文献和资料<strong>仅公司内部使用，请勿转发给外部客户</strong>。</span></p><p style="text-align:justify;text-justify:inter-ideograph"><span style="font-size: 14px;font-family: 宋体">如有外部客户需要此文献全文，可再次联系我们。</span></p><p style="line-height: 16px;"><img style="vertical-align: middle; margin-right: 2px;" src="/console/scripts/plugs/ueditor/dialogs/attachment/fileTypeImages/icon_pdf.gif"/><a style="font-size:12px; color:#0066cc;" href="https://img.sobot.com/console/4876b1aa51654272a13918a6f0107fc2/kb/file/a3cb8ef25bee4026be71a59641c6a364.pdf" title="中国多发性骨髓瘤诊治指南(2017年修订).pdf">中国多发性骨髓瘤诊治指南(2017年修订).pdf</a></p><p><br/></p>',
        //         pdf: "",
        //         jpg: "http://janssenprod.vinfol.com/AMS活动申请与审批的注意事项22-27.jpg",
        //         mp4: ""
        //       }
        //     },
        //     {
        //       type: "answerCardItem",
        //       property: {
        //         title: "如何打开iDiscover报告?",
        //         shortText: "",
        //         longText: "",
        //         html: "",
        //         pdf: "",
        //         jpg: "",
        //         mp4:
        //           "http://janssenprod.vinfol.com/iDiscover第一讲访问iDiscover和打开报告.mp4"
        //       }
        //     },
        //     {
        //       type: "youMayAsk",
        //       property: {
        //         title: "猜你想问",
        //         contents: [
        //           "1发票、小票未当场取得怎么办？取得的发票、小票时间与实际消费不一致, 怎么办？",
        //           "2AMS Helpdesk 的联系方式是？",
        //           "3哪些变更属于重大变更？",
        //           "3哪些变更属于重大变更？",
        //           "3哪些变更属于重大变更？",
        //           "3哪些变更属于重大变更？",
        //           "4提交AMS时应注意的主要问题有哪些？",
        //           "1发票、小票未当场取得怎么办？取得的发票、小票时间与实际消费不一致, 怎么办？"
        //         ]
        //       }
        //     },
        //     {
        //       type: "helpDesk",
        //       property: {
        //         contents:
        //           "请通过iConnect递交问询，由我们专业的医学信息团队为您解答。\nPlease contact with xjp_medinfo@its.jnj.com to get more information.\nAEPQC问题转CCC团队。"
        //       }
        //     },
        //     {
        //       type: "helpDesk",
        //       property: {
        //         contents:
        //           "请通过iConnect递交问询，由我们专业的医学信息团队为您解答。\n"
        //       }
        //     },
        //     {
        //       type: "simQdiffA",
        //       property: {
        //         title: "相似问题",
        //         contents: [
        //           "1使用类克时，可以使用无菌注射用水和0.9%氯化钠以外的溶液溶解及稀释本品吗？",
        //           "2AMS Helpdesk 的联系方式是？",
        //           "3哪些变更属于重大变更？",
        //           "4提交AMS时应注意的主要问题有哪些？"
        //         ]
        //       }
        //     }
        //   ]
        // }
      ] // 存放所有对话
    };
  },
  mounted() {
    let vm = this;
    console.log("enter");
    vm.passedAsk = vm.$route.query.text;
    vm.sendMsg(vm.passedAsk);
    vm.scrollToBottom();
  },
  beforeRouteLeave(to, from, next) {
    from.meta.keepAlive = true;
    next();
  },
  activated() {
    this.scrollToBottom();
  },
  methods: {

    showMesFromChild(attitude,id) {
      var vm = this
      //子传父，赞、踩发请求
      console.log(attitude, id);
      var dominName = vm.GLOBAL.dominName
      var attitudeUrl =
        dominName + '/adapter/janssen/v2/' + attitude + `?ids=${id}`
      console.log(attitudeUrl);

      this.$http
        .get(attitudeUrl)
        .then(
          response => {
            if (response.status === 200) {
              let outputs = response.body;
              console.log('outputs');
              console.log(outputs);
              debugger
              outputs = vm.bouncer(outputs);
              console.log('response02');

              //dialog处理最早期的后台 返回结构，写得复杂些
              let dialog,
                systemEntry,
                answerCard,
                youMayAsk,
                hotQs,
                simQs,
                quick_replies,
                recomdArticle,
                helpDesk;
              let scrollArr = [];
              let answerArr = [];
              let answerCardArr = [];

              //dialog
              {
                dialog = outputs.filter(item => {
                  return item.type == "dialog";
                });
                //type为'dialog'的为0的时候，直接用第一个回复做答案

                if (dialog.length == 0) {
                }
                if (dialog.length != 0) {
                  let answer = dialog[0].property.text;

                  dialog.forEach(item => {
                    answerArr.push(item.property.text);
                  });
                }
              }

              // systemEntry
              {
                systemEntry = outputs.filter(item => {
                  return item.type == "systemEntry";
                });
                systemEntry = systemEntry[0];
                if (systemEntry && systemEntry.property) {
                  systemEntry.name =
                    response.body.result.intents[0].parameters.name;
                  scrollArr.push(systemEntry);
                }
              }

              //youMayAsk
              {
                youMayAsk = outputs.filter(item => {
                  return item.type == "youMayAsk";
                });
                youMayAsk = youMayAsk[0];
                if (youMayAsk) {
                  scrollArr.push(youMayAsk);
                }
              }

              //hotQs
              {
                hotQs = outputs.filter(item => {
                  return item.type == "hotQs";
                });
                hotQs = hotQs[0];
                if (hotQs) {
                  scrollArr.push(hotQs);
                }
              }

              //answerCard
              {
                answerCard = outputs.filter(item => {
                  return item.type == "answerCard";
                });
                //如果答案卡对象下有answerCard[0]且内容contents存在
                if (answerCard[0] && answerCard[0].contents) {
                  answerCardArr = answerCard[0].contents;
                }

                if (answerCardArr) {
                  answerCardArr.forEach(item => {
                    item.type = "answerCardItem";
                    scrollArr.push(item);
                  });
                }
              }

              // recomdArticle
              {
                recomdArticle = outputs.filter(item => {
                  return item.type == "recomdArticle";
                });
                recomdArticle = recomdArticle[0];
                if (recomdArticle && recomdArticle.property) {
                  recomdArticle.property.contents.forEach(item => {
                    item.type = "recomdArticleItem";
                    scrollArr.push(item);
                  });
                }
              }

              //helpDesk
              {
                helpDesk = outputs.filter(item => {
                  return item.type == "helpDesk";
                });
                helpDesk = helpDesk[0];
                if (helpDesk) {
                  scrollArr.push(helpDesk);
                }
              }

              //simQdiffA
              {
                simQs = outputs.filter(item => {
                  return item.type == "simQdiffA";
                });
                simQs = simQs[0];
                if (simQs) {
                  scrollArr.push(simQs);
                }
              }

              //quick_replies
              {
                quick_replies = outputs.filter(item => {
                  return item.type == "quick_replies";
                });
                quick_replies = quick_replies[0];
                if (quick_replies) {
                  quick_replies = quick_replies.property.replies;
                }
                if (!quick_replies) {
                  quick_replies = [];
                }
                this.capsules = quick_replies;
              }

              //视图数据更新
              if (answerArr) {
                answerArr.forEach(item => {
                  vm.chatting.push({ type: "answer", text: item });
                });
              }
              if (scrollArr.length > 0) {
                vm.chatting.push({ type: "x-scroll", arr: scrollArr });
              }
              console.log("chatting");
              console.log(vm.chatting);
            } else {
              vm.chatting.push({ type: "answer", text: "获取数据失败" });
            }
            vm.scrollToBottom();
          },
          )
    },

    qCardDetail(data) {
      console.log('qCardDetail');
      console.log(data);
      this.detail = data
    },
    aCardDetail(data) {
      console.log('aCardDetail');
      console.log(data);
      this.detail = data
    },
    changeCover(data) {
      this.$emit("changeCover", data);
    },
    inputFocus(e) {
      let bfscrolltop = document.body.scrollTop;
      setTimeout(function() {
        document.body.scrollTop = document.body.scrollHeight;
      }, 100);
      // window.addEventListener('touchmove', fn, false);
    },
    //向chatting添加对话item,type:ask/answer
    addChattingItem(type, content) {
      let vm = this;
      vm.chatting.push({ type: type, text: content });
    },

    scrollToBottom() {
      let vm = this;
      vm.$nextTick(() => {
        let container = vm.$el.querySelector(".dialogueContent");
        container.scrollTop = container.scrollHeight;
      });
    },

    bouncer(arr) {
      return arr.filter(function(val) {
        return !(!val || val === "" || val === "undefined");
      });
    },

    sendMsg(msg) {
      let vm = this;
      console.log("click");

      vm.tipCardShow = false;
      if (msg.length !== 0) {
        // vm.addChattingItem("ask", msg);
        vm.chatting.push({ type: "ask", text: msg });
        vm.scrollToBottom();
        vm.$http
          .get(vm.GLOBAL.API.message, {
            params: {
              q: msg,
              app_key: vm.GLOBAL.userData.app_key,
              user_id: vm.GLOBAL.userData.wwid
            }
          })
          .then(
            response => {
              if (response.status === 200 && response.body.code === 0) {
                let outputs = response.body.result.intents[0].outputs;
                outputs = vm.bouncer(outputs);

                //dialog处理最早期的后台 返回结构，写得复杂些
                let dialog,
                  systemEntry,
                  answerCard,
                  youMayAsk,
                  hotQs,
                  simQs,
                  quick_replies,
                  recomdArticle,
                  helpDesk;
                let scrollArr = [];
                let answerArr = [];
                let answerCardArr = [];

                //dialog
                {
                  dialog = outputs.filter(item => {
                    return item.type == "dialog";
                  });
                  //type为'dialog'的为0的时候，直接用第一个回复做答案

                  if (dialog.length == 0) {
                  }
                  if (dialog.length != 0) {
                    let answer = dialog[0].property.text;

                    dialog.forEach(item => {
                      answerArr.push(item.property.text);
                    });
                  }
                }

                // systemEntry
                {
                  systemEntry = outputs.filter(item => {
                    return item.type == "systemEntry";
                  });
                  systemEntry = systemEntry[0];
                  if (systemEntry && systemEntry.property) {
                    systemEntry.name =
                      response.body.result.intents[0].parameters.name;
                    scrollArr.push(systemEntry);
                  }
                }

                //youMayAsk
                {
                  youMayAsk = outputs.filter(item => {
                    return item.type == "youMayAsk";
                  });
                  youMayAsk = youMayAsk[0];
                  if (youMayAsk) {
                    scrollArr.push(youMayAsk);
                  }
                }

                //hotQs
                {
                  hotQs = outputs.filter(item => {
                    return item.type == "hotQs";
                  });
                  hotQs = hotQs[0];
                  if (hotQs) {
                    scrollArr.push(hotQs);
                  }
                }

                //answerCard
                {
                  answerCard = outputs.filter(item => {
                    return item.type == "answerCard";
                  });
                  //如果答案卡对象下有answerCard[0]且内容contents存在
                  if (answerCard[0] && answerCard[0].contents) {
                    answerCardArr = answerCard[0].contents;
                  }

                  if (answerCardArr) {
                    answerCardArr.forEach(item => {
                      item.type = "answerCardItem";
                      scrollArr.push(item);
                    });
                  }
                }

                // recomdArticle
                {
                  recomdArticle = outputs.filter(item => {
                    return item.type == "recomdArticle";
                  });
                  recomdArticle = recomdArticle[0];
                  if (recomdArticle && recomdArticle.property) {
                    recomdArticle.property.contents.forEach(item => {
                      item.type = "recomdArticleItem";
                      scrollArr.push(item);
                    });
                  }
                }

                //helpDesk
                {
                  helpDesk = outputs.filter(item => {
                    return item.type == "helpDesk";
                  });
                  helpDesk = helpDesk[0];
                  if (helpDesk) {
                    scrollArr.push(helpDesk);
                  }
                }

                //simQdiffA
                {
                  simQs = outputs.filter(item => {
                    return item.type == "simQdiffA";
                  });
                  simQs = simQs[0];
                  if (simQs) {
                    scrollArr.push(simQs);
                  }
                }

                //quick_replies
                {
                  quick_replies = outputs.filter(item => {
                    return item.type == "quick_replies";
                  });
                  quick_replies = quick_replies[0];
                  if (quick_replies) {
                    quick_replies = quick_replies.payload.replies;
                  }
                  if (!quick_replies) {
                    quick_replies = [];
                  }
                  this.capsules = quick_replies;
                }

                //视图数据更新
                if (answerArr) {
                  answerArr.forEach(item => {
                    vm.chatting.push({ type: "answer", text: item });
                  });
                }

                if (scrollArr.length > 0) {
                  vm.chatting.push({ type: "x-scroll", arr: scrollArr });
                }
                console.log("chatting");
                console.log(vm.chatting);
              } else {
                vm.chatting.push({ type: "answer", text: "获取数据失败" });
              }
              vm.scrollToBottom();
            },
            error => {
              console.error(error);
              vm.chatting.push({ type: "answer", text: "获取数据失败" });
              vm.scrollToBottom();
            }
          );
      }

      vm.inputValue = "";
    },

    // 隐藏提示框
    hideTipCardShow() {
      let vm = this;
      setTimeout(() => {
        window.scroll(0, 0);
        vm.tipCardShow = false;
      }, 0);
    },

    // 自动联想
    inputIng(event, value) {
      let vm = this;
      if (value.length === 0) {
        vm.tipCardShow = false;
      } else {
        if (event.keyCode === 13) {
          vm.sendMsg(value);
        } else {
          vm.$http
            .get(vm.GLOBAL.API.recommendByQuery, {
              params: {
                q: value,
                userId: vm.GLOBAL.userData.wwid
              }
            })
            .then(
              response => {
                vm.tipCard = response.body;
                if (vm.tipCard.length > 0) {
                  vm.tipCardShow = true;
                } else {
                  vm.tipCardShow = false;
                }
              },
              error => {
                vm.tipCardShow = false;
                vm.tipCard = [];
              }
            );
        }
      }
    },

    // 获取详情问题列表的问题进行查询
    detailQuestion(question) {
      console.log('detailQuestion');
      this.sendMsg(question);
    },

    // 根据点击的胶囊关键字进行查询
    searchCapsule(capsule) {
      this.sendMsg(capsule);
    },

    deleteChatting() {
      this.chatting = [];
    },

    // 监听子组件传值，控制遮罩层显示
    changeCover(cover) {
      this.coverShow = cover;
    },

    // 隐藏遮罩层
    hideCover() {
      if (this.$refs.answer) {
        this.$refs.answer.forEach(item => {
          item.hideCover();
        });
      }
      if (this.$refs.question) {
        this.$refs.question.forEach(item => {
          item.hideCover();
        });
      }

      this.changeCover(false);
    }
  }
};
</script>

<style>
.inputComponents input {
  border-radius: 20px;
}

.inputComponents .el-input--suffix .el-input__inner {
  padding-right: 45px;
}
</style>

<style scoped lang="scss" >
.el-input {
  width: 96%;
}

.dialoguePage {
      background-color: #F5F7FA;
  // margin: 0em 0.8em;
  height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

.dialogueContent {
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling:touch;
  flex: 1;
}

.dialogueContent .dialogueList {
  overflow-y: scroll;
}

.dialogueContent .ask {
  float: right;
  color: $ask-font-color;
  float: right;
  border-radius: 2em 2em 0.5em 2em;

  /*.dialogueContent*/
  clear: both;
  font-size: $font-size-14px;
  margin: 0.5em;
  width: fit-content;
  max-width: 70%;
  min-width: 10%;
  padding: 1.2em;
 background:rgba(24,128,254,1);
box-shadow:0px 4px 8px 0px rgba(210,210,210,0.5);
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
}

.dialogueContent .answer {
  float: left;
  color: $answer-font-color;
  background-color: $answer-background-color;
  border-radius: 0.5em 2em 2em 2em;

  /*.dialogueContent*/
  clear: both;
  font-size: $font-size-14px;
  margin: 0.5em;
  width: fit-content;
  max-width: 70%;
  min-width: 10%;
  padding: 1.2em;
 box-shadow:0px 4px 8px 0px rgba(210,210,210,0.5);
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
}

.tipCard {
  margin-left: 1%;
  font-size: $font-size-14px;
  width: 98%;
  position: absolute;
  bottom: 3em;
  min-height:5rem;
  max-height:60vh;
  overflow: auto;
  // box-shadow: 0em 0.4em 0.8em 0em $box-shadow-color;
  border-radius: 20px 20px 2px 2px;
  background: $answer-background-color;
  border: 0.1rem solid rgba(220,223,230,1);
  box-sizing: border-box;
}

.tipCardItem {
  padding: 0.5em 5%;
  border-bottom: 0.1rem solid rgba(220,223,230,1);
  width: 90%;
}

.tipCard div {
  display: inline-block;
}

.inputComponents {
  text-align: center;
  position: sticky;
}

.inputValue {
  bottom: 0.5em;
  margin-bottom: 0.8em;
  position: sticky;
}

.inputValue img {
  height: 30px;
  padding-top: 5px;
  padding-right: 5px;
}

.inputValue i {
  font-size: $font-size-close;
  padding-left: 0.1em;
  vertical-align: middle;
  color: $item-border-color;
}

.x-scroll {
  overflow-x: scroll;
  -webkit-overflow-scrolling:touch;
  overflow-y: hidden;
  white-space: nowrap;
  // margin: 0.5em -0.8em;
}

.x-scroll div {
  display: inline-block;
  vertical-align: top;
}

.x-scroll::-webkit-scrollbar {
  display: none;
}
.dialogueContent::-webkit-scrollbar {
  display: none;
}
.tipCard::-webkit-scrollbar {
  display: none;
}

.cover {
  position: absolute;
  left: 0;
  top: 0;
  background: $cover-bakcground-color;
  width: 100%;
  height: 100%;
  filter: alpha(opacity=60);
  opacity: 0.6;
  z-index: 990;
}
</style>
