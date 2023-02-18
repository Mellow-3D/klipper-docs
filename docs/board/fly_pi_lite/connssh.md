

# 连接到SSH

* 请提前准备好Putty或其他SSH终端工具

## 1.1 串口连接

* Fly-Pi-Lite不支持串口连接到SSH

## 1.2 远程连接

* 如果主板已经启动且已经连接到网络，可以使用IP连接到SSH
* 打开Putty，进行如下设置，IP填写前面查看的，也可以在路由器后台查看
* 注意，Putty选择SSH而不是Serial

![putty](../../images/system/ssh6.png ":no-zooom")

* 第一次连接回弹出这个窗口，点击“是”即可

![putty](../../images/system/ssh7.png ":no-zooom")

* 会提示输入用户名，在新窗口终端中输入```fly```后回车

![putty](../../images/system/ssh8.png ":no-zooom")

* 提示输入密码，输入```mellow```后回车

![putty](../../images/system/ssh9.png ":no-zooom")

* 登录成功

* 至此，您已经完成FLY-π-lite的配置

