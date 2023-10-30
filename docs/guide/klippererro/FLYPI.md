* 可以使用串口与WIFI连接到设备

* 请提前准备好Putty或其他SSH终端工具

* 请确定SD卡或者M2WE有烧录对应上位机的系统

* **请把驱动，限位，风扇，等外设拆除！！！**

# 通过串口连接确定

* 使用USB Type-c线材将FLY-上位机与电脑连接

<img src="../../images/boards/fly_c8/topc.png" alt="topc" style="zoom:80%;" />

![power2](../../images/boards/fly_pi_v2/power2.jpg)

![piusb](../../images/boards/fly_pi/piusb.png)

![usb-flash](../../images/boards/fly_pi/usb_flash_2.png ":size=50%")

![ch340](../../images/boards/fly_pi_lite2/ch340.png)

* 如果主板与电脑连接正常，打开设备管理器，就可以看到CH340的端口了

![PUTTY](../../images/system/ssh2.png ":no-zooom")

* 打开Putty，进行如下设置,端口填写前面在设备管理器看到的端口

![putty](../../images/system/ssh3.png ":no-zooom")

* 如果等待一分钟内一直这个界面请按两次回车

![ssh](../../images/guides/flash_gemini/ssh.png)

* 回车后出现下方界面则代表系统已经启动

![ssh1](../../images/guides/flash_gemini/ssh1.png)

* 请确保系统镜像是否下载正确！！！
* 请确保系统盘已经正常烧录！！！
* 如果不确定系统盘是否烧录成功可以直接将sd卡接但电脑上查看是否有boot盘弹出！！！
* 系统未启动可以按上位机重置键，判断系统是否启动！！！
* 确定了系统盘烧录正常，并且ssh连接正常但是没有任何信息显示，请直接咨询客服！！！

> [!Warning]
>
> 如果没有正常启动，请先确定镜像是否烧录正确，截屏下来并且发给客服咨询
