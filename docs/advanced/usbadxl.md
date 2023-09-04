# 加速度计

> [!NOTE]
> 购买ADXL345加速度计模块时请仔细辨别

> [!TIP]
> 建议使用Mellow的ADXL345加速度计模块

![usbadxl](../images/adv/accele/usbadxl.png)




* 接线线序简单，直接type-c接到上位机
* 固定方便，免去改结构件的麻烦

## 准备

1. ADXL345加速度计模块
2. 打印机
3. 连接线

## 固件编译

> [!TIP]
> 出厂自带固件无需在烧录

* USB连接如下图配置

![config](../images/adv/accele/config-usb.png)

## 固件烧录

1. 查看是否连接到USB加速度计的BOOT烧录模式

   按住USB加速度计的BOOT键，然后将usb连接到上位机

   ![boot](../images/adv/accele/usbadxl-boot.png)

   ```bash
   lsusb
   ```

   执行上面的命令查看是否有 ``ID 2e8a:0003 Raspberry Pi RP2 Boot``这行，如没有请检查USB线(连接前记得按住BOOT键)

![config](../images/boards/fly_sb2040/lsusb.png ":no-zooom")

2. 烧录

   ```bash
   cd ~/klipper/
   make flash FLASH_DEVICE=2e8a:0003
   ```

   执行上面的命令可能会提示输入密码，输入当前用户的密码就好，输密码的时候是不可见的。输完之接按回车

   出现下图则烧录成功

![flash](../images/boards/fly_sb2040/flash.png ":no-zooom")





## 测试

> [!TIP]
> 装加速度计依赖包安装方法如下

> [!TIP]
> 建议使用**MobaXterm_Personal**等**SSH**工具操作

> [!TIP]
> 此步骤使用于 `非FLY上位机`，如果您为`Fly-π`或者`Gemini`系列则无需执行！！！

依次执行以下三条命令以安装加速度计依赖包。

```bash
sudo apt update
```

```bash
sudo apt install python3-numpy python3-matplotlib libatlas-base-dev
```

```bash
~/klippy-env/bin/pip install -v numpy
```

请注意，根据 CPU 的性能，可能需要*很多*时间，最多 10-20 分钟。请耐心等待完成 安装。在某些情况下，如果主板的 RAM 太少 安装可能会失败。
* 打开printer.cfg加入加速度计配置

```ini
[mcu adxl]
serial: /dev/serial/by-id/usb-Klipper_rp2040_XXXXXXXXXXXXXXXXXXXXX
### 查询usb固件id是：ls -l /dev/serial/by-id/
### 把/dev/serial/by-id/usb-Klipper_rp2040_XXXXXXXXXXXXXXXXXXXXX替换查询到的id

##ADXL345加速度计
[adxl345]
cs_pin: adxl:gpio9
spi_software_sclk_pin: adxl:gpio10
spi_software_mosi_pin: adxl:gpio11
spi_software_miso_pin: adxl:gpio12

[resonance_tester]
accel_chip: adxl345
probe_points:
    100, 100, 20  # 此坐标为你需要测量的位置，一般为热床中间

```

* 修改配置后保存并重启
* 在控制台执行`ACCELEROMETER_QUERY`
* 多加速度计可指定测试某个`ACCELEROMETER_QUERY CHIP=bed`
* 如果出现报错请检查接线及配置
* 正常的输出如下图

![ACCE](../images/adv/accele/acc4.png ":no-zooom")

* 这样就可以来测量共振了
* 记得全部归位
* 测试X轴`TEST_RESONANCES AXIS=X`,Y轴也一样改为Y即可

> [!TIP]
> 注意！如果测试过程中打印机振动太剧烈请及时按紧急停止或发送`M112`来停止

* 过高的`accel_per_hz`会让振动变得剧烈，可以适当降低

```ini
[resonance_tester]
accel_chip: adxl345
accel_per_hz: 50  # 默认值为75
probe_points: ...
```

## 自动校准

* klipper支持自动校准
* 记得全部归位
* `SHAPER_CALIBRATE`执行这个命令后打印机将开始自动校准X,Y
* 在校准完成后执行`SAVE_CONFIG`来保存数据
* 也可以使用`SHAPER_CALIBRATE AXIS=X`来自动校准一个轴，
* 在每个轴校准结束后都要先保存数据在校准下一个

![ACCE](../images/adv/accele/acc5.png ":no-zooom")

* 校准过程可能会比较长，请耐心等待

# USBadxl 3d模型

>[!WARNING]
>
>本地浏览器渲染模型较慢，建议将模型下载到本地计算机查看

```3dmodel
https://cdn.mellow.klipper.cn/STEP/Fly-usb_adxl.step
```
