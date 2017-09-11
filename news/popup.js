$(function() {
    function news(url) {
        this.url = url;
        return this.init(url);
    }

    news.prototype = {
        init: function(url) {
            this.getData(url);
        },

        getData: function(url) {
            var self = this;

            $.ajax({
                url: url,
                type: 'GET',
                data: {
                    page: 1,
                    roles: 'dev'
                },
                success: function(res) {
                    console.log(res);
                    self.render(res.column.posts)
                }
            })
        },

        render: function(data) {
            data.forEach(function(item, index){
                var dom = '<div class="item" id='+ item.id +'>' +
                            '<img src="'+ item.cover_url +'">' +
                            '<div class="content">' +
                                '<p>' + item.title + '</p>' +
                            '</div>' +
                      '</div>';

                $('#news').append(dom);
                $('.loading').css('display', 'none');
            })

            this.bindClick()
        },

        bindClick: function() {
            $('.item').on('click', function(){
                chrome.tabs.create({
                    url: 'http://www.geekpark.net/news/' + $(this).attr('id')
                })
            })
        }
    }

    new news('http://main_test.geekpark.net/api/v1/columns/81')
})
