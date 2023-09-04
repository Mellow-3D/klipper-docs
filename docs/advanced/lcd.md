>[!WARNING]
>通电前请注意屏线方向是否正确

>[!WARNING]
>如果搭配CAN工具板则有可能导致归位超时，只需执行下方命令即可

>[!WARNING]
>此操作可以解决归位超时，但是会修改Klipper源码，请慎重选择

```bash
sed -i 's/TRSYNC_TIMEOUT = 0.025/TRSYNC_TIMEOUT = 0.05/g' /home/fly/klipper/klippy/mcu.py 
sudo systemctl restart klipper
```

> [!WARNING]
> 如果更新了Klipper则可能会将源码修改回去

# FLY LCD43/50/70 

* 开始使用LCD屏幕前确认已阅读并完成[系统镜像](../introduction/system.md)部分文档

* LCD屏幕分HDMI和DSI两个版本

* HDMI是可以给其他设备使用，DSI是给树莓派使用

   

# 核心板安装方法

![link](../images/screen/lcd-link.png)

![link](../images/screen/lcd-link1.png)

# LCD HDMI

1. 烧录完成后会出现 BOOT 盘（如果未出现，请重新拔下 sd 卡，再插入电脑）

![boot](../images/screen/boot.png)



2. 打开BOOT盘下的**FLY-Config.conf**

![boot2](../images/screen/boot2.png)



3. 启用 klipperscreen
   将`KlipperScreen=false`修改为`KlipperScreen=true`

![kp](../images/screen/kp.png)



4. 更改默认显示方式
   将`Display=NONE`修改为`Display=HDMI

![link](../images/screen/lcdplay.png)

保存配置文件后弹出SD卡插到主板



## 屏幕接线

> [!NOTE]
> 请注意这需要占用上位机一个HDMI与USB

   type-c是触摸与供电请与HDMI接到上位机，购买FLY-LCD-HDMI时候会赠送一个HDMI转MINIHDMI

   

   ![LCD-HDMI](../images/screen/LCD-HDMI.png)

   ![LCD-HDMI](../images/screen/LCD-HDMI2.png)



### LCD HDMI直连FLY PI V2方法

![](../images/boards/fly_pi_v2/hdmi.jpg)

   

# LCD DSI

> [!NOTE]
> 请注意金手指方向



> [!NOTE]
> 请注意这是给树莓派用的

![DSI](../images/screen/dsi-link.png)



## 树莓派配置

> [!NOTE]
> 树莓派无法使用触摸时候可以按此方法修改配置

树莓派使用FLY LCD-DSI时需要使用**SSH连接树莓派**修改以下配置，否则可能无法使用触摸。

![display](../images/screen/pi.png)

```bash
sudo nano /boot/config.txt
```



![cfg](../images/screen/pi-1.png)



找到

```bash
dtoverlay=vc4-kms-v3d
```

修改

```bash
dtoverlay=vc4-kms-v3d,f
```

保存并且退出

```bash
CTRL+S
CTRL+X
```



