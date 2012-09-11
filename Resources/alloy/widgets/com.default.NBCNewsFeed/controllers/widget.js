function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    exports.getNewsData = function(callback, category, subcategory) {
        this.url = "http://feeds.nbclosangeles.com/nbclosangeles/news/top-stories.xml", category != null && (this.url = "http://feeds.nbclosangeles.com/nbclosangeles/" + category + "/" + subcategory + ".xml"), alert(this.url), this.xhr = Titanium.Network.createHTTPClient(), this.xhr.onload = function() {
            var title, image, url, c = 0, newsData = [];
            this.doc = this.responseXML.documentElement, this.items = this.doc.getElementsByTagName("item"), alert(this.items.length);
            for (c = 0; c < this.items.length; c += 1) this.items.item(c).getElementsByTagName("title").item(0) && (title = this.items.item(c).getElementsByTagName("title").item(0).text), this.items.item(c).getElementsByTagName("media:thumbnail").item(0) && (image = this.items.item(c).getElementsByTagName("media:thumbnail").item(0).getAttribute("url")), this.items.item(c).getElementsByTagName("pheedo:origLink").item(0) && (url = this.items.item(c).getElementsByTagName("pheedo:origLink").item(0).text), this.news = {
                title: title,
                image: image,
                url: url
            }, newsData.push(this.news), Ti.API.info(this.news);
            alert(newsData), callback && callback(newsData);
        }, this.xhr.open("GET", this.url), this.xhr.send();
    }, exports.getSubcategories = function() {
        var url = "http://www.nbclosangeles.com/rss/", webView, newsDetailWindow;
        webView = Ti.UI.createWebView({
            url: url
        });
        var flag = !0;
        webView.addEventListener("beforeload", function() {
            if (flag) {
                var html = webView.getHtml();
                index = html.indexOf('class="rss_steps"'), alert(index);
            }
        }), newsDetailWindow = Ti.UI.createWindow({
            visible: !1
        }), newsDetailWindow.add(webView), newsDetailWindow.open();
    }, $.__views.widget = A$(Ti.UI.createView({
        backgroundColor: "white",
        id: "widget"
    }), "View", null), $.addTopLevelView($.__views.widget), _.extend($, $.__views), _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;