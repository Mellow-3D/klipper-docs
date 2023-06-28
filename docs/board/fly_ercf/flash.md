# 固件烧录

?>ERCF自带**CANBOOT**无需在编译烧录**CANBOOT**

编译固件前请确保 [连接到SSH](/board/fly_pi/FLY_π_description5 "点击即可跳转")

确保使用最新的klipper！！！

1. 进入klipper目录并拉取最新的klipper
   
   ```bash
    cd ~/klipper && git pull
   ```
   
2. 修改klipper编译配置

    ```bash
    make menuconfig
    ```

## 配置固件

1. ERCF的Klipper固件配置
   * 推荐·使用CAN连接如下图配置
   * 注意·如果使用Canboot烧录请将``Bootloader offset``选项选择为``16KiB bootloader``
   ![config](../../images/boards/fly_ercf/config-can.png ":no-zooom")
   ----
   * USB连接如下图配置
   * 注意·如果使用Canboot烧录请将``Bootloader offset``选项选择为``16KiB bootloader``![config](../../images/boards/fly_ercf/config-usb.png ":no-zooom")


* 如何编译固件参考[固件烧录](/introduction/firmware)

## 编译并烧录固件

* 编译

  ```bash
  make -j4
  ```

   使用**CanBoot**烧录时最后出现**Creating hex file out/klipper.uf2**则编译成功

   使用**USB**烧录时最后出现**Creating hex file out/klipper.bin**则编译成功

## 使用CanBoot烧录固件

将下面命令中的``365f54003b9d``替换为[查找uuid](#_2-查找uuid "点击即可跳转")中查找到的uuid

```bash
python3 ~/klipper/lib/canboot/flash_can.py -u 365f54003b9d
```

如下图，出现``CAN Flash Success``则烧录成功

![config](../../images/boards/fly_sht_v2/flash.png ":no-zooom")