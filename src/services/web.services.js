const fs = require("fs"),
    request = require("request"),
    gPlay = require("google-play-scraper"),
    WP_API = require("wpapi"),
    config = require('../config/config.js')

const wpApi = new WP_API({
    endpoint: global.gConfig.wordpress.endpoint,
    username: global.gConfig.wordpress.username,
    password: global.gConfig.wordpress.password,
});

const download = (url, path, callback) => {
    request.head(url, (err, res, body) => {
        request(url).pipe(fs.createWriteStream(path)).on("close", callback);
    });
};

exports.preview = (req, res) => {
    appId = Buffer.from(req.params["appId"], "base64").toString("utf-8");
    gPlay
        .app({
            appId: appId,
        })
        .then((resp) => {
            res.render("pages/preview", {
                data: JSON.parse(JSON.stringify(resp)),
            });
        })
        .catch((err) => {
            res.send(err);
        });
}

exports.submit = (req, res) => {
    const url_featured = req.body.featured;
    const path =
        "../tmp/" + req.body.title.toLowerCase().replace(" ", "_") + ".png";
    download(url_featured, path, () => {
        wpApi
            .media()
            .file(path)
            .create({
                title: req.body.title,
                alt_text: req.body.title + " featured image",
                caption: req.body.title,
                description: req.body.title,
            })
            .then((resp) => {
                wpApi
                    .posts()
                    .create({
                        status: req.body.status,
                        title: req.body.title,
                        featured_media: resp.id,
                        content: req.body.content,
                        format: "standard",
                        categories: req.body.categories,
                        tags: req.body.tags,
                    })
                    .then((result) => {
                        try {
                            fs.unlinkSync(path);
                        } catch (err) {
                            console.error(err);
                        }

                        res.render("pages/submit", {
                            data: JSON.parse(JSON.stringify(resp)),
                            error: ""
                        })
                    })
                    .catch((err) => {
                        res.render("pages/submit", {
                            data: "",
                            error: err
                        });
                    })
            })
            .catch((err) => {
                res.render("pages/submit", {
                    data: "",
                    error: err
                });
            });
    });
}