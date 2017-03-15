var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		//global configurations and setups
		hljs.configure({});
		window.clipboard=new Clipboard('.click_to_copy_button', {
			text: function(target){
				return Base64.decode(target.getAttribute('data-code'))
			}
		});

		switch(window.location.host){
			case 'www.tldp.org':
			case 'tldp.org':
				tldp();
				break;
			case 'safaribooksonline.com':
			case 'www.safaribooksonline.com':
				safaribooksonline();
				break;
		}
	}
}, 10);

function add_click_to_copy(item){
	var ele=$(item)
	ele.addClass('code_block')
	var code=ele.text()
	var click_btn=$('<button class="click_to_copy_button">Copy</button>')
	click_btn.attr('data-clipboard-action', 'copy')
	click_btn.attr('data-code', Base64.encode(code))
	ele.prepend(click_btn)
}

//setup for www.tldp.org
function tldp(){
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
	});

	//add click to copy button
	$('pre').each(function(index, item){
		add_click_to_copy(item)
		hljs.highlightBlock(item)
	})
	$('code').each(function(index, item){
		add_click_to_copy(item)
		hljs.highlightBlock(item)
	})
}

//setup for safaribooksonline.com
function safaribooksonline(){
	$('pre').each(function(index, item){
		let ele = $(item);
		let txt = ele.text();
		let langs = ele.attr('data-code-language');
		if(txt.split('\n').length>1){
			if(langs){
				langs = langs.split('+');
				langs.forEach(lang=>ele.addClass(lang));
			}
			ele.html(txt);
			add_click_to_copy(item)
			hljs.highlightBlock(item)
		}
	})
	$('code').each(function(index, item){
		let ele = $(item);
		let txt = ele.text();
		let langs = ele.attr('data-code-language');
		if(txt.split('\n').length>1){
			if(langs){
				langs = langs.split('+');
				langs.forEach(lang=>ele.addClass(lang));
			}
			ele.html(txt);
			add_click_to_copy(item)
			hljs.highlightBlock(item)
		}
	})
}
