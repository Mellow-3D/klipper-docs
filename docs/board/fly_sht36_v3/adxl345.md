## 配置

配置如下：

```cfg
#####################################################################
# 	 Accelerometer
#####################################################################
## https://www.klipper3d.org/Measuring_Resonances.html?h=adxl#adxl345
[lis2dw]
cs_pin: SHT36V3:gpio12
spi_software_sclk_pin: SHT36V3:gpio2
spi_software_mosi_pin: SHT36V3:gpio3
spi_software_miso_pin: SHT36V3:gpio4
#--------------------------------------------------------------------
[resonance_tester]
accel_chip: lis2dw
probe_points: 150, 150, 20
# Somewhere slightly above the middle of your print bed
# 在打印床的中间稍微偏上的位置
min_freq: 5
max_freq: 133
accel_per_hz: 75
hz_per_sec: 1 
```

> [!TIP]
> 装加速度计依赖包安装方法如下

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
~/klippy-env/bin/pip install matplotlib numpy
```

请注意，根据 CPU 的性能，可能需要*很多*时间，最多 10-20 分钟。请耐心等待完成 安装。在某些情况下，如果主板的 RAM 太少 安装可能会失败。

## 测试

修改配置并保存重启后，在控制台输入指令：

```bash
ACCELEROMETER_QUERY
```

如果出现报错请检查接线及配置，正常的输出如下图。出现下图中的输出后，便可以进行共振测量了。

<img src="../../images/adv/accele/acc4.png" alt="ACCE" title=":no-zooom" style="zoom:90%;" />

测试前需要将X，Y，Z全部归位。

测试X轴的命令如下：

```bash
TEST_RESONANCES AXIS=X
```

测试Y轴的命令如下：

```bash
TEST_RESONANCES AXIS=Y
```

> [!TIP]
> 如果测试过程中打印机震动太剧烈请及时按紧急停止或发送``M112``来停止。过高的``accel_per_hz``会让振动变得剧烈，可以适当降低。

```bash
[resonance_tester]
accel_chip: adxl345
accel_per_hz: 50  # 默认值为75
probe_points: ...
```

## 使用

> [!TIP]
> klipper支持自动校准，在校准开始前记得全部归位

* `SHAPER_CALIBRATE`执行这个命令后打印机将开始自动校准X,Y
* 在校准完成后执行`SAVE_CONFIG`来保存数据
* 也可以使用`SHAPER_CALIBRATE AXIS=X`来自动校准一个轴，
* 在每个轴校准结束后都要先保存数据在校准下一个

![ACCE](../../images/adv/accele/acc5.png ":no-zooom")

* 校准过程可能会比较长，请耐心等待

## 噪音问题

>[!Warning]
>
>klipper版本从v0.12.0-47-g3f845019开始，2d加速度计噪声测量值变大

* 修改前

![2d](../../images/adv/accele/LIS2DW/2.png)

* 修改后

![2d](../../images/adv/accele/LIS2DW/1.png)

* 可以修改Klipper版本解决此问题，请注意执行后需要等5分钟后重启Klipper
* 因为版本差异过大需要重新主板固件

```
git checkout 43ce7c0b9ad4f30277c10b086b86a0937dbfebbc
```

* 测试完成后可以则可以将Klipper改回去
* 因版本差异过大，更改完klipper后需要重新编译并且烧录固件
* 可以使用下方命令在将版本改回去

```
git checkout master
```
