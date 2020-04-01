// var API_ROOT = location.origin;
var API_ROOT = "http://bghb.shushangsoft.com";
var LOGIN_OS = "0";
var TOKEN_ID = getQueryString("token_id");
var ACTIVITY_ID = getQueryString("activityId");
// var TOKEN_ID = "8ea24c289b474f218b0194cccc41de3d";
// var ACTIVITY_ID = "f8c315e6396242de8800da9885a0cff2"; 
var GUIDE_ID = getQueryString("guideId");
var GOODS_ID = getQueryString("goodsId");
var EXTENSION_ID = getQueryString("extensionId");
var SHARE_ID = getQueryString("shareId");
var SLIDING_VERIFICATION = getQueryString("verification");
var SHARING_RECORD_ID = getQueryString("sharingRecordId");

var GROUP_LIST_URL = "./GroupList.html?activityId=" + ACTIVITY_ID + "&token_id=" + TOKEN_ID + "&guideId=" + GUIDE_ID;
var SECKILL_LIST_URL = "./SeckillList.html?activityId=" + ACTIVITY_ID + "&token_id=" + TOKEN_ID + "&guideId=" +
	GUIDE_ID;
var BRAND_LIST_URL = "./BrandList.html?activityId=" + ACTIVITY_ID + "&token_id=" + TOKEN_ID + "&guideId=" + GUIDE_ID;
var latitude = "0";
var longitude = "0";
var timer = "0";

var tempSharingRecordId = "";
setTimeout(function() {
	//open一个新窗口
	timer = 1;
}, 5000);

function toExtensionReg() {
	location.href = API_ROOT + "/H5/html/ExtensionReg.html?token_id=" + TOKEN_ID + "&guideId=" + GUIDE_ID + "&activityId=" +
		ACTIVITY_ID + "&sjs=" + Math.ceil(Math.random() * 10);
}

function gotoMyOrder() {
	location.href = API_ROOT + "/H5/html/MyOrder.html?token_id=" + TOKEN_ID + "&guideId=" + GUIDE_ID + "&activityId=" +
		ACTIVITY_ID + "&sjs=" + Math.ceil(Math.random() * 10);
}

function loadDefaultShareSettings() {
	$.post(API_ROOT + '/new/h5/share/', {
		url: location.href.split('#')[0],
		activityId: ACTIVITY_ID,
		token_id: TOKEN_ID
	}, function(result) {
		tempSharingRecordId = result.data.sharingRecordId
		console.log('http://' + location.host + "/new/sys/redirectUrl?activityId=" + ACTIVITY_ID + "&guideId=" +
					GUIDE_ID + "&token_id=" + TOKEN_ID + "&sharingRecordId=" + tempSharingRecordId);
		// alert("分享人Id:" + SHARE_ID)
		// alert(tempSharingRecordId)
		// alert('http://' + location.host + "/new/sys/redirectUrl?activityId=" + ACTIVITY_ID + "&guideId=" + GUIDE_ID +
		// 	"&token_id=" + TOKEN_ID + "&sharingRecordId=" + tempSharingRecordId)
		// alert('http://' + location.host + "/image/show/?token_id=" + TOKEN_ID + "&loginOs=0&fileId=" + result.data.sharingImage);
		wx.config({
			debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: result.data.appId,
			timestamp: result.data.timestamp,
			nonceStr: result.data.noncestr,
			signature: result.data.signature,
			jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "hideAllNonBaseMenuItem", "showMenuItems"]
		});
		wx.ready(function() {
			wx.hideAllNonBaseMenuItem();
			if (result.data.sharingFriend == 1)
				wx.showMenuItems({
					menuList: ["menuItem:share:appMessage"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
				});
			if (result.data.sharingCircl == 1)
				wx.showMenuItems({
					menuList: ["menuItem:share:timeline"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
				});

			wx.onMenuShareTimeline({
				title: result.data.sharingTitle,
				link: 'http://' + location.host + "/new/sys/redirectUrl?activityId=" + ACTIVITY_ID + "&guideId=" +
					GUIDE_ID + "&token_id=" + TOKEN_ID + "&sharingRecordId=" + tempSharingRecordId,
				imgUrl: 'http://' + location.host + "/image/show/?token_id=" + TOKEN_ID + "&loginOs=0&fileId=" + result.data
					.sharingImage,
				success: function() {
					//回调要执行的代码
					// alert("执行回调")
					shareInset();
				}
			});

			wx.onMenuShareAppMessage({
				title: result.data.sharingTitle,
				desc: result.data.sharingDescribe,
				link: 'http://' + location.host + "/new/sys/redirectUrl?activityId=" + ACTIVITY_ID + "&guideId=" +
					GUIDE_ID + "&token_id=" + TOKEN_ID + "&sharingRecordId=" + tempSharingRecordId,
				imgUrl: 'http://' + location.host + "/image/show/?token_id=" + TOKEN_ID + "&loginOs=0&fileId=" + result.data
					.sharingImage,
				type: 'link',
				dataUrl: '',
				success: function() {
					//回调要执行的代码
					// alert("执行回调")
					shareInset();
				}
			});
			wx.getLocation({
				type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
				success: function(res) {
					latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
					longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
					//var speed = res.speed; // 速度，以米/每秒计
					//var accuracy = res.accuracy; // 位置精度
				},
				fail: function(res) {},
				cancel: function(res) {}
			});
		});
	});

	//wx.error(function (res) {
	//  alert("出错了：" + res.errMsg);
	//});
}





function getRedPack() {
	$.post(API_ROOT + "/client/enterprisePayment/?activityId=" + ACTIVITY_ID + "&token_id=" + TOKEN_ID + "&longitude=" +
		longitude + "&latitude=" + latitude,
		function(result) {
			if (!result.ret != "200")
				alert(result.msg);
			else
				alert("领取成功！");
		});
}

function getRedPack() {
	alert("进入getRedPack方法")
	// alert(API_ROOT + "/new/client/isReceiveRedCheck/?activityId=" + ACTIVITY_ID + "&token_id=" + TOKEN_ID + "&longitude=" +
	// 	longitude + "&latitude=" + latitude + "&timer=" + timer)
	$.post(API_ROOT + "/new/client/isReceiveRedCheck/?activityId=" + ACTIVITY_ID + "&token_id=" + TOKEN_ID + "&longitude=" +
		longitude + "&latitude=" + latitude + "&timer=" + timer,
		function(result) {
			// if(ACTIVITY_ID != "2fc9616de53242d2b0bc155b88b509a3"){
			// 	alert("预警接口返回:" + result.data.ret)
			// 	alert("预警接口返回:" + result.data.msg)
			// }
			// alert("预警接口返回:" + result.data.ret)
			// alert("预警接/口返回:" + result.data.msg)
			if (result.ret == "200" && result.data.checkResult == 1) {
				// if(result.data.mode == 2){
				// 	//开启二次分享
				// }
				location.href = "../html/GetRedPack.html?activityId=" + ACTIVITY_ID + "&token_id=" + TOKEN_ID + "&longitude=" +
					longitude +
					"&latitude=" + latitude + "&timer=" + timer + "&sharingRecordId=" + tempSharingRecordId;
			} else {
				alert(result.msg);
			}
		});
}


function shareInset() {
	// alert(TOKEN_ID)
	// alert(ACTIVITY_ID)
	// alert(tempSharingRecordId)
	$.post(API_ROOT + "/new/h5/share/inset/", {
		token_id: TOKEN_ID,
		activityId: ACTIVITY_ID,
		uid: tempSharingRecordId,
		extensionId : SHARE_ID,
		guideId:GUIDE_ID
	}, function(result) {
		// alert(result)
		if (result.ret != "200") {
			// alert(result.msg)
		} else {
			
			// alert("shareInset success")
			location.href = "../html/GetRedPack.html?activityId=" + ACTIVITY_ID + "&token_id=" + TOKEN_ID + "&longitude=" +
				longitude +
				"&latitude=" + latitude + "&timer=" + timer + "&sharingRecordId=" + tempSharingRecordId + "&extensionId=" + EXTENSION_ID 
		}
	});
}

function formatTextMaxLength(text, maxLength) {
	if (text == null) return ''
	maxLength = maxLength || 12
	if (text.length > maxLength) {
		return text.substring(0, maxLength) + '..'
	} else {
		return text
	}
}

$(function() {})

$.extend({
	postWithTokenId: function(url, callBack) {
		if (url.indexOf('?') > 0) {
			url += '&token_id=' + TOKEN_ID + "&loginOS=0";
		} else {
			url += '?token_id=' + TOKEN_ID + "&loginOS=0";
		}
		$.post(url, callBack)
	}
})
$.extend({
	postWithTokenId: function(url, parms, callBack) {
		if (url.indexOf('?') > 0) {
			url += '&token_id=' + TOKEN_ID + "&loginOS=0";
		} else {
			url += '?token_id=' + TOKEN_ID + "&loginOS=0";
		}
		$.post(url, parms, callBack)
	}
})
$.extend({
	getWithTokenId: function(url, callBack) {
		if (url.indexOf('?') > 0) {
			url += '&token_id=' + TOKEN_ID + "&loginOS=0";
		} else {
			url += '?token_id=' + TOKEN_ID + "&loginOS=0";
		}
		$.get(url, callBack)
	}
})
$.extend({
	getWithTokenId: function(url, parms, callBack) {
		if (url.indexOf('?') > 0) {
			url += '&token_id=' + TOKEN_ID + "&loginOS=0";
		} else {
			url += '?token_id=' + TOKEN_ID + "&loginOS=0";
		}
		$.get(url, parms, callBack)
	}
})

//乘法函数，用来得到精确的乘法结果   
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。   
//调用：accMul(arg1,arg2)   
//返回值：arg1乘以arg2的精确结果   

function accMul(arg1, arg2) {
	var m = 0,
		s1 = arg1.toString(),
		s2 = arg2.toString();

	try {
		m += s1.split(".")[1].length
	} catch (e) {}
	try {
		m += s2.split(".")[1].length
	} catch (e) {}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

function accAdd(arg1, arg2) {
	var r1, r2, m;
	try {
		r1 = arg1.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2))
	return (arg1 * m + arg2 * m) / m
}

function accSub(arg1, arg2) {
	var r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2));
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

function getDateStr(addDays) {
	var today = new Date();
	today.setDate(today.getDate() + addDays);
	var h = today.getFullYear();
	var m = today.getMonth() + 1;
	var d = today.getDate();
	m = m < 10 ? "0" + m : m;
	d = d < 10 ? "0" + d : d;
	return h + "-" + m + "-" + d;
}

function openwindow(url, name, iWidth, iHeight) {
	var url; //转向网页的地址;
	var name; //网页名称，可为空;
	var iWidth; //弹出窗口的宽度;
	var iHeight; //弹出窗口的高度;
	//window.screen.height获得屏幕的高，window.screen.width获得屏幕的宽
	var iTop = (window.screen.height - 30 - iHeight) / 2; //获得窗口的垂直位置;
	var iLeft = (window.screen.width - 10 - iWidth) / 2; //获得窗口的水平位置;
	return window.open(url, name, 'height=' + iHeight + ',,innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' +
		iWidth + ',top=' + iTop + ',left=' + iLeft +
		',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
}


function getArrayFromString(str) {
	return str.split(',');
}

function getStringFromArray(arr) {
	return arr.join(',');
}

function getQueryString(key) {
	var result = location.search.match(new RegExp("[\?\&]" + key + "=([^\&]+)", "i"));
	if (result == null || result.length < 1) {
		return "";
	}
	return result[1];
}

//计算当前时间是否在  两组时间范围内   true为在范围内
function nowInDateBetwen(d1, d2) {
	//如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
	var dateBegin = new Date(d1.replace(/-/g, "/")); //将-转化为/，使用new Date  开始时间
	var dateEnd = new Date(d2.replace(/-/g, "/")); //将-转化为/，使用new Date  结束时间
	var dateBegin = new Date(d1); //将-转化为/，使用new Date
	var dateEnd = new Date(d2); //将-转化为/，使用new Date
	var dateNow = new Date(); //获取当前时间

	var beginDiff = dateNow.getTime() - dateBegin.getTime(); //时间差的毫秒数  距离开始时间差      
	var beginDayDiff = Math.floor(beginDiff / (24 * 3600 * 1000)); //计算出相差天数

	var endDiff = dateEnd.getTime() - dateNow.getTime(); //时间差的毫秒数 距离结束时间差
	var endDayDiff = Math.floor(endDiff / (24 * 3600 * 1000)); //计算出相差天数       
	if (endDayDiff < 0) { //已过期
		return false
	}
	if (beginDayDiff < 0) { //没到开始时间
		return false;
	}
	return true; // 在直播时间内
}

function redEnvelopeSending(){
	//根据分享Id  是否滑动验证成功  发送红包
		// alert("/new/client/share/?activityId=" + ACTIVITY_ID + "&token_id=" + TOKEN_ID + 
		// "&longitude=" + longitude + "&latitude=" + latitude + 
		// "&sharingRecordId=" + SHARING_RECORD_ID);
		// alert("进入红包发送接口")
        $.post(API_ROOT + "/new/client/share/?activityId=" + ACTIVITY_ID + "&token_id=" + TOKEN_ID + 
		"&longitude=" + longitude + "&latitude=" + latitude + 
		"&sharingRecordId=" + SHARING_RECORD_ID + "&userId=" + GUIDE_ID, function (result) {
          if (result.ret != "200") {
            // alert(result.msg);
            // vaptchaObj.reset();
          } else if(result.ret == "210"){
			// window.history.go(-1);
		  } else {
            // alert("领取成功！");
            // window.history.go(-1);
          }
        });
}
function getFormatDate() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentDate = date.getFullYear() + "-" + month + "-" + strDate
            + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return currentDate;
}
