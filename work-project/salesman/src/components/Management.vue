<template>
    <article>
        <table class="ui celled striped table">
            <thead>
                <tr><th>文件导出</th>
            </tr></thead>
            <tbody>
                <tr>
                    <td>
                        <i class="file outline icon"></i>
                        <a @click="fileDownload('')">导出店铺信息</a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <i class="file outline icon"></i>
                        <a @click="fileDownload('')">导出店铺昨日扫码指标</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <a id="download"></a>
    </article>
</template>

<script type="text/babel">
    export default {
        name: 'management',
        mounted() {
            this.setActiveItem($('#mgmt-btn'))
        },
        methods: {
            fileDownload: function(url) {
                $.ajax({
                    url: url,
                    type: 'get',
                    success: function(data) {
                        if(data.error_msg){
                            alert(data.error_msg)
                            return
                        }

                        $('#download').attr('href', url)[0].click()
                    }
                })
            },

            setActiveItem: function(target) {
                target.addClass('active')
                $.each(target.siblings(), function(index, el){
                    $(el).removeClass('active')
                })
            }
        }
    }
</script>

<style scoped>
    a {
        cursor: pointer;
    }
</style>
