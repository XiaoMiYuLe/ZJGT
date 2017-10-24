const Base = require('./base.js');

module.exports = class extends Base {
    //统计数据
    totalmsgAction() {
        var a = {
            "status": "0",
            "message": "请求成功",
            "totalcount": 0,
            "result": [{
                "status": "0",
                "Message": "请求成功",
                "SumLendMoney": "770800.00",
                "LendCount": "13",
                "SumExpectMoney": "23818.84",
                "ContinuedDays": 845
            }]
        }
        return this.success(a);
    }

    //标的列表
    investListAction() {
        var a = {
            "status": "0",
            "message": "",
            "totalcount": 0,
            "result": [{
                "proId": "1818",
                "title": "新手专享标",
                "rate": "15.00",
                "term": "7",
                "total": "28158600.00",
                "typeSing": "新手标",
                "inRate": "14.69",
                "termType": "天",
                "xmType": "1",
                "InvestCount": "12041",
                "lendStatusClass": "4",
                "borrowTitle": "新手专享标",
                "orderNo": 1000,
                "enableStatus": null,
                "StatusLimitation": null,
                "limitation": 0,
                "LeftMoney": 0,
                "IsFull": 0,
                "CollectStartDate": null,
                "CollectEndDate": null,
                "ProfitStartTime": null,
                "ProjectStatus": "0"
            }, {
                "proId": "1895",
                "title": "优选 16期 央企宝 某大型央企公司220万 应收账款转让项目",
                "rate": "11.78",
                "term": "322",
                "total": "2200000.00",
                "typeSing": "",
                "inRate": "0.4590909090909090909090909100",
                "termType": "天",
                "xmType": "3",
                "InvestCount": "0",
                "lendStatusClass": "",
                "borrowTitle": "优选 16期 央企宝 某大型央企公司220万 应收账款转让项目",
                "orderNo": 1250,
                "enableStatus": "true",
                "StatusLimitation": "30",
                "limitation": 1,
                "LeftMoney": 0,
                "IsFull": 0,
                "CollectStartDate": null,
                "CollectEndDate": null,
                "ProfitStartTime": null,
                "ProjectStatus": "7"
            }]
        }
        return this.success(a);
    }
    
    //网站公告
    ggListAction() {
        var a = {
            "status": "0",
            "message": "请求成功",
            "totalcount": 0,
            "result": [{
                "TypeId": "1",
                "Id": "69540",
                "title": "2017.10.12关于网站服务器升级维护的公告"
            },{
                "TypeId": "1",
                "Id": "69539",
                "title": "关于2017年中秋及国庆放假及平台工作安排的公告"
            },{
                "TypeId": "1",
                "Id": "69538",
                "title": "关于五一劳动节和端午节放假安排的公告"
            },{
                "TypeId": "1",
                "Id": "69537",
                "title": "关于网站服务器维护的公告"
            },{
                "TypeId": "1",
                "Id": "69536",
                "title": "关于网站服务器维护的公告"
            },{
                "TypeId": "1",
                "Id": "69535",
                "title": "关于400电话临时维护升级的公告"
            }]
        }
        return this.success(a);
    }    
};