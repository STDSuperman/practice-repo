const got = require('got');

const mainHandler = async (event, context, callback) => {
    got.post('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=f5f03967-f508-4552-9549-43e6d26411ec', {
        body: `{
            "msgtype": "text",
            "text": {
                "content": "快乐时间到，快乐水冲冲冲！！！",
                "mentioned_list":["@all"]
            }
        }`,
        responseType: 'json'
    });
    return event;
};

exports.main_handler = mainHandler;