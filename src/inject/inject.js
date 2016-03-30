var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);

        //remove inline styles on some tables
        $('table').each(function(index, item){
            var item=$(item)
            //only one code listing in table, remove table styles
            if(item.find('pre').length===1){
                item.removeAttr('border')
                item.removeAttr('bgcolor')
                item.removeClass()
            }else{
                item.addClass('new_table')
            }
        })

        //add click to copy handler
        var add_click_to_copy=function(item){
            var ele=$(item)
            ele.addClass('code_block')
            var code=ele.text()
            var click_btn=$('<button class="click_to_copy_button">Copy</button>')
            click_btn.attr('data-clipboard-action', 'copy')
            click_btn.attr('data-code', Base64.encode(code))
            ele.prepend(click_btn)
        }
        $('pre').each(function(index, item){
            add_click_to_copy(item)
        })
        $('code').each(function(index, item){
            add_click_to_copy(item)
        })
        window.clipboard=new Clipboard('.click_to_copy_button', {
            text: function(target){
                return Base64.decode(target.getAttribute('data-code'))
            }
        })

        //add highlight
        hljs.configure({
            //languages: ['bash', 'c', 'cpp', 'python', 'perl', 'ruby', 'asm']
        })
        $('code').each(function(index, data){
            hljs.highlightBlock(data)
        })
        $('pre').each(function(index, data){
            hljs.highlightBlock(data)
        })
    }
}, 10);
