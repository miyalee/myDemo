$(function() {
    function news(url) {
        this.url = url;
        return this.init(url);
    }

    news.prototype = {
        el_news: $('#news'),
        el_loading: $('.loading'),
        el_loadMore: $('#loadMore'),

        init: function(url) {
            this.page = 1;
            this.url = url;
            this.getData(this.url, this.page);
        },

        getData: function(url, page) {
            var self = this;

            $.ajax({
                url: url,
                type: 'GET',
                data: {
                    page: page,
                    roles: 'dev'
                },
                success: function(res) {
                    console.log(res);
                    self.render(res.column.posts);
                }
            })
        },

        DateFormat: function(timestamp) {
            var date = new Date(timestamp);

            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        },

        render: function(data) {
            var self = this;

            data.forEach(function(item, index){
                var dom = '<div class="item" id='+ item.id +'>' +
                            '<img src="'+ item.cover_url +'">' +
                            '<div class="content">' +
                                '<p>' + item.title + '</p>' +
                                '<p>' + self.DateFormat(item.published_timestamp * 1000) + '</p>' +
                            '</div>' +
                      '</div>';

                self.el_news.append(dom);
                self.el_loading.hide();
                self.el_loadMore.show();

                setTimeout(function() {
                    $('.item').css('opacity', 1);
                }, 100)
            })

            this.bindClick()
        },

        bindClick: function() {
            var self = this;

            $('.item').on('click', function(){
                chrome.tabs.create({
                    url: 'http://www.geekpark.net/news/' + $(this).attr('id')
                })
            })

            self.el_loadMore.on('click', function() {
                self.page += 1;
                self.getData(self.url, self.page)
            })
        }
    }

    new news('http://main_test.geekpark.net/api/v1/columns/81')
})
