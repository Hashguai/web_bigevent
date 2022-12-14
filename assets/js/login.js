$(function () {
    // 点击 "去注册账号" 的链接
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击 "去登录" 的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从 layui 中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify()函数自定义表单校验规则
    form.verify({
        // 自定义一个叫pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box [name="password"]').val()
            if(pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的submit提交事件
    $('#form_reg').on('submit', function (e) {
        // 1.阻止表单的默认提交事件
        e.preventDefault()
        // 2.发起Ajax的POST请求
        var data = { username: $('#form_reg [name="uname"]').val(), password: $('#form_reg [name="password"]').val() }
        $.post('http://www.liulongbin.top:3007/api/reguser', data, function(res) {
            if(res.status !== 0) {
                return layer.msg(res.message)
            }

            layer.msg('注册成功，请登录！')
            // 模拟人的点击行为
            $('#link_login').click()
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        // 阻止事件默认提交行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'http://www.liulongbin.top:3007/api/login',
            // 快速获取表单的数据
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg(res.message)
                // 将登录成功得到的token字符串，保存到localStorage中
                localStorage.getItem('token', res.token)
                // 跳转到后台主页
                location.href = './index.html'
            }
        })
    })
})

