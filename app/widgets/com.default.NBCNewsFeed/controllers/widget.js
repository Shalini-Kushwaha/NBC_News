exports.getNewsData = function(callback, category, subcategory) {

    this.url = 'http://feeds.nbclosangeles.com/nbclosangeles/news/top-stories.xml';
    if (category != null) {
        this.url = 'http://feeds.nbclosangeles.com/nbclosangeles/' + category + '/' + subcategory + '.xml';
    }
    alert(this.url);
    this.xhr = Titanium.Network.createHTTPClient();

    this.xhr.onload = function() {
        var title, image, url, c = 0, newsData = [];
        this.doc = this.responseXML.documentElement;
        this.items = this.doc.getElementsByTagName('item');
        alert(this.items.length);
        for ( c = 0; c < this.items.length; c += 1) {
            if (this.items.item(c).getElementsByTagName('title').item(0)) {
                title = this.items.item(c).getElementsByTagName('title').item(0).text;
            }
            if (this.items.item(c).getElementsByTagName('media:thumbnail').item(0)) {
                image = this.items.item(c).getElementsByTagName('media:thumbnail').item(0).getAttribute('url');
            }
            if (this.items.item(c).getElementsByTagName('pheedo:origLink').item(0)) {
                url = this.items.item(c).getElementsByTagName('pheedo:origLink').item(0).text;
            }
            this.news = {
                title : title,
                image : image,
                url : url
            };
            newsData.push(this.news);
            Ti.API.info(this.news);
        }
        alert(newsData);

        if (callback) {
            callback(newsData);
        }
    };

    this.xhr.open('GET', this.url);
    // Open the URL we entered at the top of this file.
    this.xhr.send();
};

exports.getSubcategories = function() {
    var url = 'http://www.nbclosangeles.com/rss/';
    var webView, newsDetailWindow;
    webView = Ti.UI.createWebView({
        url : url
    });
    var flag=true;
    webView.addEventListener('load', function() {
        if(flag){
            var html=webView.getHtml();
            index=html.indexOf('class="rss_steps"');
            alert(index);
            // html=html.split('id="footer"')[0];
            // html=html.split('<ul>');
            // //html=html[1].split('</div>')[0];
            // alert(html[1]);
            // flag=false;
        }
    });
    newsDetailWindow = Ti.UI.createWindow({
        visible:false
    });
    newsDetailWindow.add(webView);
    newsDetailWindow.open();
}; 