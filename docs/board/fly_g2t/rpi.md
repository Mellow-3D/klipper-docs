# 树莓派使用说明

本次教程使用FLY CM4扩展版与**树莓派CM4**为例

## 注意事项：

- 确保在安装扩展板前，上位机已经关闭电源。
- 避免在潮湿或灰尘环境中使用扩展板。
- 安装屏幕时，请注意不要带电拔插注意屏线方向，以免造成损坏。
- 安装风扇时，请注意风扇的电流和电压规格，以免造成损坏。
- 请注意UART1已经默认启用无需在配置
- **树莓派可以使用全部接口！！！**
- **注意：树莓派使用的系统内核版本必须大于`5.17.x`, 执行命令`uname -r`查看内核版本**



## 串口使用方法

**正在完善仅供参考**

* 树莓派刷好最新系统后需要在**编辑boot盘下的config.txt文件**
* 在**config.txt**中添加即可

```
dtoverlay=uart3
```

uart1的id为

```
[mcu] 
serial: /dev/ttyAMA0
baud: 250000
restart_method:command
```

uart3的id为

```
[mcu] 
serial: /dev/ttyAMA1
baud: 250000
restart_method:command
```

### 接线方法

**正在作图**

## FAN使用方法

添加配置

```
[mcu host]       
serial: /tmp/klipper_host_mcu 

[temperature_sensor Raspberry Pi]
sensor_type: temperature_host

[temperature_fan core_fan] 
pin: host:gpio12
max_power: 1.0
sensor_type: temperature_host   #设置为上位机主控温度
control:watermark                  #控制方式
target_temp: 48                   #上位机散热风扇启动温度
min_temp: 0                     #最低温度，低于此温度将会报错
max_temp: 90                    #最高温度，高于此温度将会报错
off_below: 0.10
kick_start_time: 0.50
max_speed: 0.8                   #最大转速，为满功率运转时的80%
min_speed: 0.3                    #最小转速，为满功率运转时的30%
```

### 接线方法

**正在作图**

## 屏幕使用方法

Github地址:[FLY-TFT](https://github.com/kluoyun/FLY-TFT)


### 1. 介绍

FLY-TFT-V2是一款基于st7796的TFT液晶屏，支持电容触摸与电阻触摸两种，分辨率320x480，使用SPI接口

### 2. 系统安装

> 注意：树莓派使用的系统内核版本必须大于`5.17.x`, 执行命令`uname -r`查看内核版本

* 使用 [Raspberry Imager](https://www.raspberrypi.com/software/) 安装最新的 **MainsailOS**
    1. 下载并安装 [Raspberry Imager](https://www.raspberrypi.com/software/) 
    2. 打开**Raspberry Imager**
    3. 点击**CHOOSE DEVICE**
    4. 根据你的设备选择对应型号
    5. 点击**CHOOSE OS**
    6. 选择**Other specific-purpose OS**
    7. 选择**3D printing**
    8. 选择**Mainsail OS**
    9. 选择最新的版本。如果你的设置支持64位系统则选择**rpi64**
    10. 点击**CHOOSE STORAGE**
    11. 选择你的存储设备，比如SD卡
    12. 点击**NEXT**，等待安装完成

### 4. 驱动安装

1. 安装FLY-TFT-V2驱动
    ```bash
    git clone https://github.com/kluoyun/FLY-TFT.git
    cd FLY-TFT-V2
    sudo ./scripts/install.sh
    ```

### 5. 使用

* 请确保硬件连接正确
* 安装了驱动
* 在`/boot/config.txt`文件中添加了`dtoverlay=fly-tft-v2`或`dtoverlay=fly-tft-v2-r`的覆盖层支持
* 如果已完成上述所有步骤，请执行`sudo reboot`重启系统
* 部分系统可能存在默认的fb0设备，FLY-TFT会被分配到fb1设备，需要修改配置文件使能fb1设备
* 执行命令`ls /dev/fb*`查看设备，如果出现两个设备fb0和fb1，请执行下面的命令将fb1设备使能（默认是fb0）
* 执行下面的命令修改默认配置为fb1设备
    ```bash
    sudo sed -i 's/\/dev\/fb0/\/dev\/fb1/g' /etc/X11/xorg.conf.d/99-fbdev.conf
    ```
* 重启KlipperScreen即可

### 5. 反馈

> 我们在最新的MainsailOS系统上测试通过，如果有问题欢迎通过Github Issues反馈。

### 接线方法

![tft](../../images/boards/fly_g2t/TFTV2.png)

![tft](../../images/boards/fly_g2t/TFT.png)
