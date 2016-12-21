var $realStockUrl = $('[data-stock-real-url]')

if ($realStockUrl.length > 0) {
    var g_realStockMap = {}
    $realStockUrl.each(function () {
        var $this = $(this);
        var url = $this.attr('data-stock-real-url')
        if (!url) {
            return;
        }
        $.ajax({
            url: url,
            success: function (e) {
                var snapshot = e.data.snapshot
                var fields = snapshot.fields
                var precloseIndex, last_pxIndex
                for (var i = 0; i < fields.length; i++) {
                    var key = fields[i]
                    if (key == 'preclose_px') {
                        precloseIndex = i
                    }
                    if (key == 'last_px') {
                        last_pxIndex = i
                    }
                }
                for (var i in snapshot) {
                    var nums = snapshot[i]
                    var preClose = nums[precloseIndex],
                        lastPx = nums[last_pxIndex]
                    if (preClose <= 0 || lastPx <= 0) {
                        g_realStockMap[i] = {
                            text:'--',
                            up:true
                        }
                    } else {
                        var ratio = ((lastPx - preClose) * 100 / preClose).toFixed(2)
                        if (ratio >= 0.0) {
                            ratio = '+' + ratio
                        }
                        g_realStockMap[i] = {
                            // text: lastPx + ' ' + ratio + '%',
                            text: ratio + '%',
                            up: ratio >= 0
                        }
                    }
                }
                updateStockRealInfo()
            }
        })
    })

    function updateStockRealInfo() {
        for (var i in g_realStockMap) {
            $('[data-symbol="' + i + '"]')
                .addClass(g_realStockMap[i].up ? 'stock-red' : 'stock-green')
                .find('.js-stock-real')
                // .text('(' + g_realStockMap[i].text + ')')
                .text(g_realStockMap[i].text)
        }
    }
}