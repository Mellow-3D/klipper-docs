## 如何查找USB固件设备

查找 USB 串行端口的一般方法是从主机上的SSH终端运行`lsusb`，它会产生类似于以下内容的输出

![lsusb](../../images/guides/klippererro/lsusb.png)

`OpenMoko, Inc. stm32h743xx`属于**USB固件**是你的下位机刷了正确的**USB**固件才会显示，如果**刷错固件**或者**未刷固件**则**不会显示设备**或者**显示其他设备**。

`OpenMoko, Inc. Geschwister Schneider CAN adapter` 属于**CAN固件**是你的下位机刷了**CAN固件或者CAN桥接固件和接了UTOC**才会显示

如果系统没有lsusb可以执行下方指令进行安装

```bash
sudo apt-get install usbutils
```



### 搜索USB固件ID

查找 USB固件ID 的一般方法是从主机上的 ssh 终端运行此指令

```bash
ls /dev/serial/by-id/*
```

它会输出以下类似于内容：

![usbid](../../images/guides/klippererro/usbid.png)

在上述命令中找到的名称是稳定的，可以在配置文件中使用它

更新后的配置如下所示：

```bash
[mcu]
serial: /dev/serial/by-id/usb-Klipper_stm32h743xx_1B0044000A51303435393237-if00
```



## 如何查找CAN固件设备

1. 非FLY上位机的，请注意检查自己烧录的镜像内核是否支持CAN，如果不支持则无法使用CAN。检测方法如下。

在SSH输入：

```bash
sudo modprobe can && echo "您的内核支持CAN" || echo "您的内核不支持CAN"
```

输入以上指令后，如果您的内核支持CAN就会返回：``您的内核支持CAN``；如果不支持就会返回：``您的内核不支持CAN``。

**如果系统不支持需要更换系统**

2. 创建配置文件,复制粘贴到终端并回车

```bash
sudo /bin/sh -c "cat > /etc/network/interfaces.d/can0" << EOF
allow-hotplug can0
iface can0 can static
    bitrate 1000000
    up ifconfig $IFACE txqueuelen 1024
    pre-up ip link set can0 type can bitrate 1000000
    pre-up ip link set can0 txqueuelen 1024

EOF
```

3. 重启上位机``sudo reboot``

### 确认CAN速率

>[!Tip]
>
>上位机与下位机的CAN速率需要一致否则无法搜索到ID



>[!Tip]
>
>如果Klipper之前连接过CAN设备则无法搜索到配置过的CANID

```bash
cat /etc/network/interfaces.d/can0
```

![cat](../../images/guides/klippererro/catcan.png)

图中的**1000000**是上位机设置的**can速率**，**1024**是**CAN的缓存**。

下方指令是将**1M**速率修改成**500K**修改后需要**重启系统**

```bash
sudo sed -i 's/1000000/500000/g' /etc/network/interfaces.d/can0
```

[树莓派配置CAN使用](/advanced/can_rpi.md)

### 查询CANID

查找 CANID的一般方法是从主机上的 ssh 终端运行此指令

```bash
~/klippy-env/bin/python ~/klipper/scripts/canbus_query.py can0
```

![canid](../../images/guides/klippererro/canid.png)

