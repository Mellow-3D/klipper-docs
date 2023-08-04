# 3 使用USB烧录M2WE

   #### 3.1 通过USB为eMMC烧录系统镜像

1. 先下载安装需要的软件

   [USB驱动安装工具 Zadig-2.7](https://cdn.mellow.klipper.cn/Utils/zadig-2.7.exe)

   [FLY-BOOT安装程序](https://cdn.mellow.klipper.cn/Utils/FLY-BOOT-Setup.msi)

   [系统镜像烧录工具 Win32diskimager-1.0](https://cdn.mellow.klipper.cn/Utils/win32diskimager-1.0.0-install.exe)

2. 除了第一个Zadig不需要安装可直接运行，另外两个需要安装。安装过程全都点``下一步``或者``Next``就可以了

3. 打开Zadig，顶部菜单栏``Options``里勾选``List All Devices``

   ![usb-flash](../../../images/boards/fly_pi/usb_flash_1.png)

4. 按着BOOT键并且将双头USB接入电脑

![usb-flash](../../../images/boards/fly_pi/usb_flash_2.png ":size=50%")

![usb-flash](../../../images/boards/fly_pi/usb_flash_3.png ":size=42%")

4. 将附赠的双公头USB线一端连接到电脑，然后长按上图中的按钮，将双公头USB线另一端连接到Gemini或Pi的下图中的USB接口

![usb-flash](../../../images/boards/fly_pi/usb_flash_4.png ":size=50%")

?> 确保是在按键按下状态时将设备连接到电脑的

![usb-flash](../../../images/boards/fly_pi/usb_flash_5.png ":size=50%")

5. 如果一切正常，此时zadig中会多出一个``Unknow Device #x``或者``USB Device(VID_1f3a_PID_efe8)``，选择它

![usb-flash](../../../images/boards/fly_pi/usb_flash_6.png ":size=50%")

6. 选择设备后检查一下USB ID是否与上图一致，如果不是请重新选择其他设备
7. 上图中的第二处只能选择``WinUSB(vxxxxxxx)``版本号无所谓
8. 点击``Install Driver``安装驱动

![usb-flash](../../../images/boards/fly_pi/usb_flash_7.png ":size=50%")

9. USB驱动安装成功 (驱动只安装一次，如果以后再次烧录不用再安装驱动)

10. 打开安装好的FLY-BOOT，点击``检查设备``

![usb-flash](../../../images/boards/fly_pi/usb_flash_8.png ":size=50%")

11. 如果前面的步骤操作无误，则会提示发现可用设备（如果没有发现可用设备请仔细查看第4步）

![usb-flash](../../../images/boards/fly_pi/usb_flash_9.png)

12. 点击``启动BOOT``，如果正常则会提示已成功启用BOOT

![usb-flash](../../../images/boards/fly_pi/usb_flash_10.png ":size=50%")

13. 现在可以打开文件资源管理器，多出一个14.5G的U盘（16G eMMC显示大小为14.5G）
14. 这样就可以直接用Win32diskimager或balenaEtcher来烧录系统镜像，盘符选择为这个14.5GU盘的盘符
15. 镜像烧录完成后，请配置 [FLY_Config](/board/fly_pi/FLY_π_fly_config.md "点击即可跳转")
