const gPlay = require("google-play-scraper"),
    WPAPI = require("wpapi"),
    config = require("../config/config.js");

const wpApi = new WPAPI({
    endpoint: global.gConfig.wordpress.endpoint,
    username: global.gConfig.wordpress.username,
    password: global.gConfig.wordpress.password,
});

const search = async (element) => {
    const res = await wpApi.posts().search(element.appId);
    return JSON.stringify(res);
};

exports.get = (req, res) => {
    gPlay
        .developer({
            devId: global.gConfig.playstore.devId,
        })
        .then(async (resp) => {
            let arr = [];
            for (const element of resp) {
                let obj = new Object();
                let c = await search(element);

                obj.appId = element.appId;
                obj.title = element.title;
                obj.status = 0;

                if (c.length > 2) {
                    obj.status = 1;
                }
                arr.push(obj);
            }
            res.send(arr);
        })
        .catch((err) => {
            res.send(err);
        });
};

exports.categories = (req, res) => {
    wpApi
        .categories()
        .then((resp) => {
            let arr = [];
            resp.forEach((element) => {
                let obj = new Object();
                obj.id = element.id;
                obj.name = element.name;
                arr.push(obj);
            });
            res.send(arr);
        })
        .catch((err) => {
            res.send(err);
        });
};

exports.tags = (req, res) => {
    wpApi
        .tags()
        .then((resp) => {
            let arr = [];
            resp.forEach((element) => {
                let obj = new Object();
                obj.id = element.id;
                obj.name = element.name;
                arr.push(obj);
            });
            res.send(arr);
        })
        .catch((err) => {
            res.send(err);
        });
};