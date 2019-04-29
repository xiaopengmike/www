import Toast from '../../dist/toast/toast';

// "van-picker": "../../dist/picker/index"


Page({
    data: {
        columns: ['销售-ST', '非销售', '销售-新员工-IM'],
        diffX:0,
        diffY:0,
        role: 1,
        radio : true,
        show: 1,
        imgUrls: [
            '../../static/img/index/01.jpg',
            '../../static/img/index/02.jpg',
            '../../static/img/index/03.jpg',
        ],
        youMayAskArr: [],
        hotQs: [],
        channels: [
            'HCC',
            'RST',
            'MI',
            'CIO',
            'IT',
            'FIN',
            'Legal',
            'BQ',
            'HR',
        ],
        sysProcess: [
            {name:'E-Process',desc:'AMS/Travel/IO'},
            {name:'iCenter',desc:'销售核量/奖金/主数据'},
            {name:'iDiscover',desc:'BI报告、口袋报告'},
            {name:'Traffic and Meal',desc:'商宴通/神州专车'},
            {name:'Office 365',desc:'移动办公/OneDrive/Skype'},
            {name:'iConnect',desc:'客户拜访/活动/爱协作'},
            {name:'Concur',desc:'财务报销'},
            {name:'Vault',desc:'CRC Review'},
        ],
        youMayAskArr: [],
        hotQArr: ["客服电话是多少","产假能休多久","劳务付费的一般原则有哪些","公司有哪些福利","离职时我需要归还哪些公司财产？","CYP3A4酶抑制剂或诱导剂对阿比特龙的影响？","阿比特龙对药物代谢酶的影响？"],
        current: 'tab1',
        current_scroll: 'tab1',
        bannerUrl01: 'http://janssenprod.vinfol.com/Banner1-公司动态-用创新方式促进公司合规建设.pdf',
        bannerUrl02: 'http://janssenprod.vinfol.com/Banner2-2018保险年度延长至5月31日的通知.pdf',
        bannerUrl03: 'http://janssenprod.vinfol.com/Banner3-人事公告-张崇德 Announcement-CharltonZhang.pdf',
        background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
        indicatorDots: true,
        vertical: false,
        autoplay: false,


        circular: false,
        interval: 2000,
        duration: 500,
        previousMargin: 0,
        nextMargin: 0
    },

    bannerClick(e){

        debugger
        var imgSrc = e.currentTarget.dataset.src
        var fileName = imgSrc.split('index/')[1]

        if(fileName=="01.jpg"){
            wx.navigateTo({
                url: `../test/test?url=${this.data.bannerUrl01}`,
            })
        }

        if(fileName=="02.jpg"){
            wx.navigateTo({
                url: `../test/test?url=${this.data.bannerUrl02}`,
            })
        }

        if(fileName=="03.jpg"){
            wx.navigateTo({
                url: `../test/test?url=${this.data.bannerUrl03}`,
            })
        }

    },

    onChange(event) {
        const { picker, value, index } = event.detail;
        Toast(`当前值：${value}, 当前索引：${index}`);
        console.log(event.detail);
    },

    popShowFalse(e) {
        this.setData({show: false})
    },

    toDialoge(e) {
        wx.navigateTo({
            url: `../dialogue/dialogue?text=你好`
        })
    },
    moveThrottle(e){
        var _this = this;
        this.throttle(_this.move(e));
    },

    throttle(method){
        var timer=null;
        return function(){
            var context=this, args=arguments;
            clearTimeout(timer);
            timer=setTimeout(function(){
                method.apply(context,args);
            },100);
        }
    },

    mytouchstart(e) {
        this.diffX =  e.touches[0].pageX - e.currentTarget.offsetLeft;
        this.diffY =  e.touches[0].pageY - e.currentTarget.offsetTop;
    },

    move(e) {
        var touchs = e.touches[0];
        var pageX = touchs.pageX;
        var pageY = touchs.pageY;

        var x = pageX - this.diffX;
        var y =  pageY - this.diffY;
        if (x < 10){
            x=10;
        }
        if (x >(this.data.screenWidth -  100) ){
           x = (this.data.screenWidth - 100);

        }
        if (y < 10){
            y=10;
        }
        if (y > (this.data.screenHeight - 100)){
            y = (this.data.screenHeight -100);
        }

        this.setData({
         ballTop: y,
         ballLeft: x
        });

    },

    sysQItemClick(e) {
        //sysQItemClick
        debugger
        var text = e.currentTarget.dataset.tapdata.name
        if(typeof text=='object'){
            text = text.name
        }
        //其他情况为字符串
        text.split(' ').join('')
        console.log(text);
        wx.navigateTo({
            url: `../dialogue/dialogue?text=${text}`
        })

    },
    qItemClick(e) {
        var text = e.currentTarget.dataset.tapdata
        if(typeof text=='object'){
            text = text.name
        }
        console.log(text);
        wx.navigateTo({
            url: `../dialogue/dialogue?text=${encodeURIComponent(text)}`
        })
    },
    handleChange(e) {
        this.setData({
            current: e.currentTarget.dataset.key
        });
    },

    handleChangeScroll({detail}) {
        this.setData({
            current_scroll: detail.key
        });
    },
    changeProperty: function (e) {
        var propertyName = e.currentTarget.dataset.propertyName
        var newData = {}
        newData[propertyName] = e.detail.value
        this.setData(newData)
    },
    changeIndicatorDots: function (e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function (e) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    intervalChange: function (e) {
        this.setData({
            interval: e.detail.value
        })
    },
    durationChange: function (e) {
        this.setData({
            duration: e.detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        debugger
        console.log('role');
        console.log(options);
        var role = options.role;
        this.setData({
            role: role,
                    });

        var _this = this;
        wx.getSystemInfo({
            success: function (res) {
                _this.setData({
                    screenHeight: res.windowHeight,
                    screenWidth: res.windowWidth,
                   });
            }
        });
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        var w = this
        wx.request({
            // url: `
            url: `http://janssenprod.vinfol.com/adapter/janssen/recommendByUserLabel?userId=${w.data.role}`,
            success(res) {
                //
                console.log(res.data)
                var recommendArr = []

                for (var i = 0;i<8

                    ;i++){
                    recommendArr.push(res.data[i])
                }
                w.data.youMayAskArr = recommendArr
                w.setData({youMayAskArr: w.data.youMayAskArr})

            }
        })

        wx.request({
            // url: `
            url: `http://janssenprod.vinfol.com/adapter/janssen/hotQuestion`,
            success(res) {
                //
                console.log(res.data)
                var hotQuestion = []

                for (var i = 0;i<6

                    ;i++){
                    hotQuestion.push(res.data[i])
                }
                // w.data.hotQArr = hotQArr
                w.setData({hotQArr: hotQuestion})

            }
        })
    }
    ,

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    }
    ,

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    }
    ,

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    }
    ,

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
