# 固件烧录

?> SHTV2预装了CanBoot，只支持CAN烧录，烧录前请使用CAN连接到上位机

## 1. 编译固件

编译固件前请确保 [连接到SSH](/board/fly_pi/FLY_π_description5 "点击即可跳转")

这里只简要介绍固件编译参数，详细固件编译步骤请查看：[编译klipper固件](/board/fly_super8/firmware?id=_1-编译klipper固件 "点击即可跳转")。 看到第 **13** 步即可！！！

1. 确保使用最新的klipper

    ```bash
    # 进入klipper目录并拉取最新的klipper
    cd ~/klipper && git pull
    ```

2. 修改klipper编译配置

    ```bash
    make menuconfig
    ```

?> 注意，在2022-10-18**前**购买的主控芯片为GD32F103；在2022-10-18**后**购买的主控芯片为APM32F07。

    GD32F103版本配置如下图
![config](../../images/boards/fly_sht_v2/config.png ":no-zooom")
    
    APM32F072版本配置如下图
![config](../../images/boards/fly_sht_v2/config_072.png ":no-zooom")

3. 编译

    ```bash
    make -j4
    ```

     最后出现**Creating hex file out/klipper.bin**则编译成功

## 2. 查找uuid

?> 请使用UTOC或者其他支持klipper USB桥接CAN的主板将SHTV2与上位机通过CAN总线连接

?> 如果已经烧录过klipper并且在正常运行，可跳过查找uuid，使用配置文件中的uuid进行烧录

> 由于SHTV2预装了CanBoot，只支持CAN烧录，因此在固件烧录前需要读取uuid后才能烧录固件

首先进入ssh，然后依次输入以下指令

```
git clone https://github.com/Arksine/CanBoot
```

![1](../../images/boards/fly_sht_v2/1.png)

```
cd CanBoot
```

```bash
python3 ~/klipper/lib/canboot/flash_can.py -q
```

下图中高亮部分``365f54003b9d``就是这块SHTv2板的uuid，这个uuid每块板子都不一样。同一块SHTv2板烧录固件后uuid是不会变的

![config](../../images/boards/fly_sht_v2/uuid.png ":no-zooom")

?>如果找不到CAN ID，请检查：

* 接线是否正确，例如CANH 和 CANL是否接反或者接触不良
* SHT36 V2板上的120Ω跳线帽是否插上
<<<<<<< HEAD
=======
<<<<<<< HEAD
* 是否正确供电，在刷固件时可以只使用TypeC接口供电
=======
>>>>>>> 5c05aa80531525af768e0e85464d928adf35d270
>>>>>>> fff00a83fd528b37dfb986d3181b75d834e508ec
* 您的镜像内核是否支持CAN

如果确认没有上述问题，则可以尝试在**通电状态**下强制进入CanBoot来解决。此方法也可以在刷错固件连不上工具板之后尝试。进入CanBoot的方法如下，请小心使用！！！以免损坏SHT工具板！！！

<img src="../../images/boards/fly_sht_v2/强制canboot.png" alt="强制canboot" style="zoom:80%;" />

如果成功进入Canboot，下图中的LED灯会以一定的频率闪烁

![config](../../images/boards/fly_sht_v2/statusled.png ":no-zooom")

## 3. 烧录固件

将下面命令中的``365f54003b9d``替换为[查找uuid](#_2-查找uuid "点击即可跳转")中查找到的uuid

```bash
python3 ~/klipper/lib/canboot/flash_can.py -u 365f54003b9d
```

如下图，出现``CAN Flash Success``则烧录成功

![config](../../images/boards/fly_sht_v2/flash.png ":no-zooom")

3. 检查

    如果正确配置编译并烧录成功，则SHTv2板的这个灯会常亮

![config](../../images/boards/fly_sht_v2/statusled.png ":no-zooom")