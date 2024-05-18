# 读取ID

## 注意事项

* SSH连接连接到上位机后输入`lsusb`并且回车，将可能出现下面几种设备
* 请确保下位机连接上位机的数据线具有数据传输功能
* 如果系统不支持`lsusb`可以执行下方指令进行安装
* 如果`lsusb`后没有设备，请更换上位机！

```
sudo apt-get install usbutils
```

![lsusb](../../images/guides/klippererro/lsusb.png)

`1d50:614e`属于USB固件是你的下位机刷了正确的USB固件才会显示，如果刷错固件或者未刷固件则不会显示设或者显示其他设备。

`1d50:606f` 属于CAN固件是你的下位机刷了CAN桥接固件或者接了UTOC才会显示，如果刷错固件或者未刷固件则不会显示设备或者显示其他设备。

* 如果有多个CAN设备建议都接到UTOC上否则会多个CAN设备，这会导致连接和配置容易出问题

如果没有这两个设备有以下几种可能

* 下位机没刷固件或者刷错固件
* 使用的数据线可能没有数据传输功能
* 上位机USB口故障
* FLY主板，例如：双子座系列,C8系列需要打开拨码才可以连接到上位机
* 接错线导致下位机进入短路保护模式，请注意建议将下位机的全部外设拆除限位，风扇，驱动等等！！！
* 如果是STM32主控下位机处于DFU模式，请将DFU跳线去除后重新给下位机通电
* 如果是RP2040主控下位机处于RP2 BOOT模式，请将BOOT跳线去除后重新给下位机通电
* **系统问题导致显示不全，如果有`1d50:606f`则为can设备，如果有`1d50:614e`则为STM32主控设备**

<!-- tabs:start -->

### **USB ID读取方法**

1.[连接到SSH](/board/fly_C8/ssh "点击即可跳转")，然后输入 ``ls /dev/serial/by-id/*`` 回车。如果一切正常，则会出现下面一行蓝色的ID。

<img src="../../images/boards/fly_super8/id.png" alt="id" style="zoom:80%;" />

2.在左侧边栏的配置选项里找到：fluidd为：``{…}`` ；mainsail为：``机器``，点击进去，即可找到``printer.cfg``

![fluidd](../../images/boards/fly_super8/fluidd.png)

3.将蓝色的ID复制，填写到``printer.cfg``里。保存重启后即可连上主板。若Klipper提示 ``ADC out of range``为正常现象，将热床和热敏连接好，配置好喷头、热床的热敏引脚和输出引脚，再保存重启即可。

<img src="../../images/boards/fly_super8/id2.png" alt="id2" style="zoom:80%;" />

### **CAN ID读取方法**

> [!TIP]
> 已经识别到的CAN ID是不会被查找到的（即已经写入配置文件printer.cfg中的ID，连接成功并正常运行的，是不会被查找到的）



> [!Tip]
>
> 请确保上位机的can0、桥接主板的CAN速率、CAN工具板的速率完全一致

```bash
[mcu]
canbus_uuid: b7c79ec3f948     #将读取到的uuid填写到此处
```

也可以在SSH中输入下面的命令查找uuid

```bash
~/klippy-env/bin/python ~/klipper/scripts/canbus_query.py can0
```

![uuid](../../images/boards/fly_sht36_42/uuid.png)

出现``Found canbus_uuid=b7c79ec3f948``则查找到设备ID，其中``b7c79ec3f948``为设备UUID。

> [!TIP]
> 如果找不到CAN ID，请检查：

* 是否正确供电
* 您的镜像内核是否支持CAN
* 固件编译是否正确

<!-- tabs:end -->
