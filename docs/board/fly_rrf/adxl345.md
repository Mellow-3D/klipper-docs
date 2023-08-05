# 9. 加速度计的使用

## 9.1 配置

配置如下：

```
#####################################################################
#                       adxl345加速度计配置（需要时启用即可）
#####################################################################
## 此版本用不了ADXL345加速度计
[adxl345]
cs_pin: RRF36:gpio9
spi_software_sclk_pin: RRF36:gpio10
spi_software_mosi_pin: RRF36:gpio11
spi_software_miso_pin: RRF36:gpio12
#--------------------------------------------------------------------
[resonance_tester]
accel_chip: adxl345         # 加速度芯片型号
probe_points: 150,150,10    # 坐标配置为热床的中间
```

> [!TIP]
> 装加速度计依赖包安装方法如下

> [!TIP]
> 此步骤使用于 `非FLY上位机`，如果您为`Fly-π`或者`Gemini`系列则无需执行！！！

依次执行以下三条命令以安装加速度计依赖包。

```
sudo apt update
```

```
sudo apt install python3-numpy python3-matplotlib libatlas-base-dev
```

```
~/klippy-env/bin/pip install -v numpy
```

请注意，根据 CPU 的性能，可能需要*很多*时间，最多 10-20 分钟。请耐心等待完成 安装。在某些情况下，如果主板的 RAM 太少 安装可能会失败。

## 9.2 测试

修改配置并保存重启后，在控制台输入指令：

```
ACCELEROMETER_QUERY
```

如果出现报错请检查接线及配置，正常的输出如下图。出现下图中的输出后，便可以进行共振测量了。

<img src="../../images/adv/accele/acc4.png" alt="ACCE" title=":no-zooom" style="zoom:90%;" />

测试前需要将X，Y，Z全部归位。

测试X轴的命令如下：

```
TEST_RESONANCES AXIS=X
```

测试Y轴的命令如下：

```
TEST_RESONANCES AXIS=Y
```

> [!TIP]
> 如果测试过程中打印机震动太剧烈请及时按紧急停止或发送``M112``来停止。过高的``accel_per_hz``会让振动变得剧烈，可以适当降低。

```
[resonance_tester]
accel_chip: adxl345
accel_per_hz: 50  # 默认值为75
probe_points: ...
```

## 9.3 使用

> [!TIP]
> klipper支持自动校准，在校准开始前记得全部归位

* `SHAPER_CALIBRATE`执行这个命令后打印机将开始自动校准X,Y
* 在校准完成后执行`SAVE_CONFIG`来保存数据
* 也可以使用`SHAPER_CALIBRATE AXIS=X`来自动校准一个轴，
* 在每个轴校准结束后都要先保存数据在校准下一个

![ACCE](../../images/adv/accele/acc5.png ":no-zooom")

* 校准过程可能会比较长，请耐心等待
