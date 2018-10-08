let baseUrl = '';

let ruleUrl = '';

var host = window.location.host;
if(host==='m.caimiaoxingqiu.com'||'www.wdjzt88.com'||'www.caimiaoxingqiu.com'){
	baseUrl = 'https://prod.wdjzt88.com';
	ruleUrl = 'http://test.wdjzt88.com/wap/cashcoupon/rule.html';
}else{
    baseUrl = 'https://dev.caimiaoxingqiu.com';
	ruleUrl = 'http://test.wdjzt88.com/wap/cashcoupon/rule.html';
}

export {
	baseUrl,
	ruleUrl
}