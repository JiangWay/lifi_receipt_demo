// import axios from "axios";
const MAX_NUMBER = 8;
const MIN_NUMBER = 1;
const TIMEOUT_ERROR_TIME = 6000;

// const useMockApi = process.env.VUE_APP_USE_MOCK_API === 'true'
const useMockApi = true
export function fetchReceiptList() :any {
    const delayTime = (Math.floor(Math.random() * MAX_NUMBER) + MIN_NUMBER) * 100;
    return new Promise((resolve, reject) => {
        if (delayTime >= TIMEOUT_ERROR_TIME) {
            reject("API timeout error");
            return;
        }
        setTimeout(() => { // 反正就只有mock
            const exchangeRate = useMockApi ? getReceiptList() : getReceiptList();
            resolve(exchangeRate);
        }, delayTime);
    });
}

function getReceiptList() {

    return getMockReceiptList()
}

export function getMockReceiptList():any { // 因為免費方案 基礎是歐元
    const mockApiResponse = {
        "invoices": [
            {
                "id": 8166929,
                "invNum": "UN14914477",
                "status": "已確認",
                "type": 0,
                "time": "2021-12-31 13:39:33",
                "amount": 109,
                "sellerName": "揚秦國際企業股份有限公司北市府捷運分公司",
                "details": [
                    {
                        "description": "超厚雞肉起司滿分堡",
                        "quantity": 1,
                        "unitPrice": 70,
                        "amount": 59
                    }, {
                        "description": "雞塊",
                        "quantity": 1,
                        "unitPrice": 35,
                        "amount": 30
                    }, {
                        "description": "奶茶(XL)(熱)",
                        "quantity": 1,
                        "unitPrice": 35,
                        "amount": 20
                    }
                ]
            }, {
                "id": 5740460,
                "invNum": "QX79208148",
                "status": "已確認",
                "type": 1,
                "time": "2021-12-20 18:23:10",
                "amount": 576,
                "sellerName": "臺灣富禮納思股份有限公司敦南和平店",
                "details": [
                    {
                        "description": "【防疫外帶】香炒肉片蔬菜丼",
                        "quantity": 1,
                        "unitPrice": 225,
                        "amount": 225
                    }, {
                        "description": "【外帶】鮮鮭玉子雜炊丼",
                        "quantity": 1,
                        "unitPrice": 270,
                        "amount": 270
                    }, {
                        "description": "【防疫外帶】照燒雞肉丼",
                        "quantity": 1,
                        "unitPrice": 225,
                        "amount": 225
                    }, {
                        "description": "折扣",
                        "quantity": 1,
                        "unitPrice": -144,
                        "amount": -144
                    }
                ]
            }, {
                "id": 6245879,
                "invNum": "QU69378153",
                "status": "驗證中",
                "time": "2021-12-11 00:00:00",
                "type": 1
            }
        ]
    }


    return mockApiResponse
}
