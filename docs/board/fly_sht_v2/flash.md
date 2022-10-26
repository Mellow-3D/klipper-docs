# 固件烧录

?> SHTV2预装了CanBoot，只支持CAN烧录，烧录前请使用CAN连接到上位机

## 编译固件

1. 确保使用最新的klipper

    ```bash
    # 进入klipper目录并拉取最新的klipper
    cd ~/klipper && git pull
    ```

2. 修改klipper编译配置

    ```bash
    make menuconfig
    ```

?> 注意，自2022-10-18后购买的请注意观察主控芯片，首批是GD32F103,后面出货为APM32F072

    GD32F103版本配置如下图
![config](../../images/boards/fly_sht_v2/config.png ":no-zooom")
    
    APM32F072版本配置如下图
![config](../../images/boards/fly_sht_v2/config_072.png ":no-zooom")

3. 编译

    ```bash
    make -j4
    ```

     最后出现**Creating hex file out/klipper.bin**则编译成功

## 烧录固件

?> 请使用UTOC或者其他支持klipper USB桥接CAN的主板将SHTV2与上位机通过CAN总线连接

上位机配置CAN及UTOC使用请查看[CAN使用](/advanced/can.md)

1. 查找SHTV2的uuid

?> 如果已经烧录过klipper并且在正常运行，可跳过查找uuid，使用配置文件中的uuid之间烧录

```bash
python3 ~/klipper/lib/canboot/flash_can.py -q
```

下图中高亮部分就是这块SHTv2板的uuid，这个uuid每块板子都不一样。同一块SHTv2板烧录固件后uuid是不会变的

![config](../../images/boards/fly_sht_v2/uuid.png ":no-zooom")

2. 烧录

    将下面命令中的**365f54003b9d**替换为第一步中查找到的uuid

    ```bash
    python3 ~/klipper/lib/canboot/flash_can.py -u 365f54003b9d
    ```

    如下图，**CAN Flash Success**则烧录成功

![config](../../images/boards/fly_sht_v2/flash.png ":no-zooom")

3. 检查

    如果正确配置编译并烧录成功，则SHTv2板的这个灯会常亮

![config](../../images/boards/fly_sht_v2/statusled.png ":no-zooom")