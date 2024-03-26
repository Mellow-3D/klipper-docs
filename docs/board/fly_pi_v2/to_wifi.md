## 通过SSH软件连接

使用 [串口连接](/board/fly_pi_v2/to_ssh "点击即可跳转") 到SSH软件后使用nmtui命令连接WiFi

1. 在SSH软件输入`sudo nmtui`命令后回车，再输入`mellow`，会出现下图所示界面

![nmtui1](../../images/boards/fly_pi/nmtui1.png)

![nmtui2](../../images/boards/fly_pi/nmtui2.png)

2. 选择`Activate a connection`后回车

![nmtui3](../../images/boards/fly_pi/nmtui6.png)

3. 进入如下界面，通过键盘上的`↑``↓`键选择要连接的WiFi后，回车，输入密码后等待连接成功

![nmtui4](../../images/boards/fly_pi/nmtui4.png)

<img src="../../images/boards/fly_pi/nmtui5.png" alt="nmtui5" style="zoom:90%;" />

4.连接成功后如图所示

![nmtui6](../../images/boards/fly_pi/nmtui6.png)

5. 按`ESC`键退出，返回命令行界面，输入`ip a`，图中`192.168.2.126`即为上位机的IP地址

![nmtui7](../../images/boards/fly_pi/nmtui7.png)

