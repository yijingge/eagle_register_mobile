//tab栏切换
$(".registerTextStyle span").on("tap", function (e) {
    if ($(this).hasClass("selected")) {
        return false;
    } else {
        $(this).siblings().removeClass("selected");
        $(this).addClass("selected");
        var type = $(this).data("type");
        $(".distributor").hide();
        $(".supplier").hide();
        $("." + type).show();
    }
})

// 分销商手机号验证
function phoneInput() {
    var str = /^\d{11}$/
        if (str.test($('.phoneInput').val())) {
            $(".distributorVerifyCode").attr("disabled", false);
        } else {
            $(".distributorVerifyCode").attr("disabled", true);
        }

        if ($('.verifyCodeBox .distributorVerifyCodeInput').val() !== '') {
            $(".submitBox .distributorBtn").attr("disabled", false);
        } else {
            $(".submitBox .distributorBtn").attr("disabled", true);
        }
}

function distributorVerifyCodeInput() {
    if ($('.phoneInput').val() !== '') {
        $(".submitBox .distributorBtn").attr("disabled", false);
    } else {
        $(".submitBox .distributorBtn").attr("disabled", true);
    }
}

// 供应商手机号验证
function domesticPhoneInput() {
    var str = /^\d{11}$/
    if (str.test($('.domesticPhone').val())) {
        $(".domesticVerifyCode").attr("disabled", false);
    } else {
        $(".domesticVerifyCode").attr("disabled", true);
    }

    if ($('.verifyCodeBox .domesticVerifyCodeInput').val() !== '') {
        $(".submitBox .supplierBtn").attr("disabled", false);
    } else {
        $(".submitBox .supplierBtn").attr("disabled", true);
    }
}
function domesticVerifyCodeInput() {
    var str = /^\d{11}$/
    if ($('.domesticPhone').val() !== '' && str.test($('.domesticPhone').val()) && $(" .supplierType").val()!== '') {
        $(".submitBox .supplierBtn").attr("disabled", false);
    } else {
        $(".submitBox .supplierBtn").attr("disabled", true);
    }
}

function emailVerifyCodeInput() {
    var str = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if ($('.emailInput').val() !== '' && str.test($('.emailInput').val()) && $(" .supplierType").val()!== '') {
        $(".submitBox .supplierBtn").attr("disabled", false);
    } else {
        $(".submitBox .supplierBtn").attr("disabled", true);
    }
}

// 邮箱验证
function emailInput() {
    var str = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (str.test($('.emailInput').val())) {
        $(".emailVerifyCode").attr("disabled", false);
    } else {
        $(".emailVerifyCode").attr("disabled", true);
    }

    if ($('.verifyCodeBox .emailVerifyCodeInput').val() !== '') {
        $(".submitBox .supplierBtn").attr("disabled", false);
    } else {
        $(".submitBox .supplierBtn").attr("disabled", true);
    }
}



// 获取验证码事件
$(".haveVerifyCodeAll").on("tap", function (e) {
    var data = {};
    var type = $(this).data("member");
    if(type === 'distributor') {
        data.memberGroup = 1;
        data.phone = $("."+type+" .phoneInput").val();
        $(".distributorVerifyCode").attr("disabled", true);
    } else if (type === 'supplier') {
        data.memberGroup = 2;
        data.phone = $("."+type+" .domesticPhone").val();
        $(".domesticVerifyCode").attr("disabled", true);
    }
    verificationCode(data, $(this));
})

function verificationCode(dataObj, $this) {

    $.ajax({
        type:"post",
        url:"https://www.feiying360.com/api/phone/sendPhoneVerifyCode",
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType:"json",
        data:JSON.stringify(dataObj),
        success:function(res){
            console.log(res)
            if(res.code == 0) {
                mui.toast("发送短信成功，请注意查收验证码");
            }
        },
        error:function(xhr, textStatus){
            console.log('短信', dataObj)
            mui.toast("验证码发送失败");
        }
    });
}

// 发送邮箱验证码事件
$(".emailVerifyCode").on("tap", function (e) {
    $(".emailVerifyCode").attr("disabled", true);
    if($(this).hasClass("loading")) {
        return false
    }
    var data = {};
    data.email = $(" .emailInput").val();
    $.ajax({
        type:"POST",
        url:"https://www.feiying360.com/api/phone/sendEmailVerifyCode",
        contentType:"application/json;charset=UTF-8",
        crossDomain: true,
        dataType:"json",
        data:JSON.stringify(data),
        success:function(res){
            if(res.code == 0) {
                mui.toast("发送验证码成功，请注意查收验证码");
            }
        },
        error:function(xhr, textStatus){
            console.log('邮箱',data)
            mui.toast("验证码发送失败");
        }
    });
})

// 分销商倒计时
var flag = true;
$("#distributorVerifyCode").on("tap", function () {
    var time = 61;
    distributorVerifyCode.classList.add('disable');
    if (flag) {
        flag = false;
        var timer = setInterval(() => {
            time--;
            distributorVerifyCode.value = time + ' s';
            if (time === 0) {
                clearInterval(timer);
                distributorVerifyCode.value = '重新获取';
                distributorVerifyCode.classList.remove('disable');
                flag = true;
                $(".distributorVerifyCode").attr("disabled", false);
            }
        }, 1000)
    }
});

// 供应商手机号倒计时
var supplier = true
$("#domesticVerifyCode").on("tap", function () {
    var time = 61;
    domesticVerifyCode.classList.add('disable');
    if (supplier) {
        supplier = false;
        var timer = setInterval(() => {
            time--;
            domesticVerifyCode.value = time + ' s';
            if (time === 0) {
                clearInterval(timer);
                domesticVerifyCode.value = '重新获取';
                domesticVerifyCode.classList.remove('disable');
                supplier = true;
                $(".domesticVerifyCode").attr("disabled", false);
            }
        }, 1000)
    }
});

// 供应商邮箱倒计时
var supplierEmail = true
$("#emailVerifyCode").on("tap", function () {
    var time = 61;
    emailVerifyCode.classList.add('disable');
    if (supplierEmail) {
        supplierEmail = false;
        var timer = setInterval(() => {
            time--;
            emailVerifyCode.value = time + ' s';
            if (time === 0) {
                clearInterval(timer);
                emailVerifyCode.value = '重新获取';
                emailVerifyCode.classList.remove('disable');
                supplierEmail = true;
                $(".emailVerifyCode").attr("disabled", false);
            }
        }, 1000)
    }
});

var canClickButton = false
// 分销商注册事件
$(".submitBox .distributorBtn").on("tap",function (e) {

    var data = {};
    data.phone = $(" .phoneInput").val();
    data.verificationCode = $(" .distributorVerifyCodeInput").val();
    if(!/^\d{11}$/.test(data.phone)) {
        mui.toast("输入的手机号无效，请确认后重试！");
        return false;
    }
    if (!data.verificationCode.trim()) {
        mui.toast("请填写短信验证码");
        return false;
    }
    if ($('#distributorChecked').is(':checked')){
        console.log('true')
         } else {
        mui.toast("请先阅读协议并勾选");
        return false;
    }
    if (canClickButton === false) {
        canClickButton = true
        $.ajax({
            type: "POST",
            url: "https://www.feiying360.com/api/phone/member/register",
            contentType: "application/json;charset=UTF-8",
            crossDomain: true,
            dataType: "json",
            data: JSON.stringify(data),
            success: function (res) {
                canClickButton = false
                if (res.code == 0) {
                    $("input[type = 'text']").val("");
                    $("#domesticVerifyCode")[0].value = '获取验证码';
                    window.location.href = 'registerSuccess.html';
                } else {
                    mui.toast(res.msg)
                }
            },
            error: function (xhr, textStatus) {
                console.log(data)
                mui.toast(textStatus)
            }
        });
    } else {
        return false
    }
})

var supplierCanClickButton = false
// 供应商注册事件
$(".submitBox .supplierBtn").on("tap",function (e) {
    var data = {};
    data.phone = $(" .domesticPhone").val();
    console.log(data.verificationCode)
    data.email = $(" .emailInput").val();
    if ( $(" .supplierType").val() === '国内供应商') {
        data.sellerAccountType = 1
        data.email = ''
        data.verificationCode = $(" .verificationCode").val();
    } else if ($(" .supplierType").val() === '海外供应商') {
        data.sellerAccountType = 2
        data.phone = ''
        data.verificationCode = $(" .emailVerificationCode").val();
    }

    if ($(" .supplierType").val() === '国内供应商') {
        if(!/^\d{11}$/.test(data.phone)) {
                mui.toast("输入的手机号无效，请确认后重试！");
                return false;
            }
    }
    if ($(" .supplierType").val() === '海外供应商') {
        var str = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!(str.test(data.email))) {
            mui.toast("输入的邮箱无效，请确认后重试！");
            return false;
        }
    }
    if (data.verificationCode == '') {
        mui.toast("请填写验证码");
        return false;
    }
    if ($('#supplierChecked').is(':checked')){
        console.log('true')
    } else {
        mui.toast("请先阅读协议并勾选");
        return false;
    }
    if (supplierCanClickButton === false) {
        supplierCanClickButton = true
        $.ajax({
            type: "POST",
            url: "https://www.feiying360.com/api/phone/seller/register",
            contentType: "application/json;charset=UTF-8",
            crossDomain: true,
            dataType: "json",
            data: JSON.stringify(data),
            success: function (res) {
                supplierCanClickButton = false
                if (res.code == 0) {
                    $("input[type = 'text']").val("");
                    $(" .supplierType").val('国内供应商')
                    $("#distributorVerifyCode")[0].value = '获取验证码';
                    $("#emailVerifyCode")[0].value = '获取验证码';
                    window.location.href = 'registerSuccess.html';
                } else {
                    mui.toast(res.msg)
                }
            },
            error: function (xhr, textStatus) {
                console.log(data)
                mui.toast(textStatus)
            }
        });
    } else {
        return false;
    }
})
