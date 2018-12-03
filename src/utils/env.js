let baseUrl = '';

let ruleUrl = '';

var host = window.location.host;
if(host==='m.xxxxingqiu.com'||'www.aaa88.com'||'www.xxxxingqiu.com'){
	baseUrl = 'https://prod.aaa88.com';
	ruleUrl = 'http://test.aaa88.com/wap/cashcoupon/rule.html';
}else{
    baseUrl = 'https://dev.xxxxingqiu.com';
	ruleUrl = 'http://test.aaa88.com/wap/cashcoupon/rule.html';
}

export {
	baseUrl,
	ruleUrl
}
