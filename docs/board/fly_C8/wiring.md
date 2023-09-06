# 3. C8接线

> [!TIP]
> 此教程以Voron Trident为例介绍接线方法，请结合自己的实际使用情况接线

## 3.1 C8接口图

<img src="../../images/boards/fly_c8/interface.jpg" alt="interface" style="zoom:80%;" />

## 3.2 电源接线

**供电：**C8的供电分为2个部分，分别是主板（主控、驱动）供电，加热棒、风扇、热床供电。

> [!warning]
> 注：C8主板只支持12-24V供电，不支持高压驱动

> [!warning]
> 注：主板供电和加热棒、风扇、热床供电都要接上（直接并联在一起即可），否则主板不能正常工作！！！

<img src="../../images/boards/fly_c8/power.png" alt="power" style="zoom:80%;" />

## 3.3 驱动跳线

**STEP/DIR模式。**在这个模式下，通过使用跳线帽来设置细分，通过调节电位器来调整电流。最常见的是A4988驱动，使用这类驱动需要查询厂家提供的细分配置表，然后通过跳线帽来设置细分。

**UART模式。**最常见的使用这种模式的驱动有：TMC2208、TMC2209、TMC2226等。这类驱动芯片可以与主控进行UART异步串行通信，可以通过修改配置文件来设置驱动的细分、运行电流、静音模式等。

**SPI模式。**最常见的使用这种模式的驱动有：TMC5160、TMC2230等。这类驱动芯片通过spi与主控同步串行通信，同样的也可以通过修改配置文件来设置驱动的细分、运行电流、静音模式等。

<img src="../../images/boards/fly_c8/dirve_dip.png" alt="dirve_dip" style="zoom:70%;" />

**注：使用A4988驱动或者外接驱动，跳线模式选择：正常跳线模式。并在配置中将驱动配置删除即可。**

<img src="../../images/boards/fly_c8/homeless.png" alt="homeless" style="zoom:80%;" />

## 3.4 驱动安装

驱动在安装前需要进行相应的检查，以免对驱动或主板造成损坏。

**FLY驱动：**如果不使用无限位归零功能，请将拨码开关拨到1的位置；相反如果要使用无限位归零功能，请将拨码开关拨到ON的位置。

![fly2209](../../images/boards/fly_super8/fly2209.png)

**非FLY驱动：**如果是非FLY的驱动（下图为mks 2209），在安装之前需要剪掉图中两个引脚（这两个引脚为无限位归零引脚，不使用无限位归零功能则需要剪掉）。不同厂家的设计可能会有所区别，使用前请咨询相应厂家。

![mks2209](../../images/boards/fly_super8/mks2209.png)

**注意！！！ 安装驱动模块时，一定要保证插入的方向正确，即EN引脚在左上角，否则会损坏驱动甚至主板！！！注意给驱动贴好散热片！！！**

<img src="../../images/boards/fly_c8/tmc_install.png" alt="tmc_install" style="zoom:80%;" />

## 3.5 步进电机接线

在3D打印机中，最常用的是两相四线步进电机，其原理如图所示。鉴别步进电机线序有两种方法：

1. 短接步进电机四根线中任意两根线，用手转动电机轴，如果转动阻力很大，则这两根线为同一组线圈，即1A和1B或者2A和2B。如果和没有短接一样转起来很轻松，说明这两根线不是同一组线圈。

2. 使用万用表的蜂鸣器档，测量四根线中任意两根，如果蜂鸣器响，则说明这两根线为同一组。反之，则不是同一组，需要更换其中一根线再次测量。

![motorSCH](../../images/boards/fly_super8/motorSCH.png)

**Voron Trident：**

![voron_tirdent](../../images/boards/fly_c8/voron_tirdent.png)

**Voron 2.4：**

![voron2.4](../../images/boards/fly_c8/voron2.4.png)

## 3.6  加热棒接线

<img src="../../images/boards/fly_c8/heater.png" alt="heater" style="zoom:80%;" />

## 3.7  热床接线

**交流热床：**固态继电器在接线时，请注意输入和输出别接错了。

<img src="../../images/boards/fly_super8/relay.png" alt="relay" style="zoom:75%;" />

<img src="../../images/boards/fly_c8/ACbed.png" alt="ACbed" style="zoom:80%;" />

**直流热床：**板载MOS接直流热床时请注意使用功率，直流热床最大电流不能超过10A。如果超过10A，建议使用外接MOS模块来使用热床，否则可能会对主板造成不可逆的损伤。

<img src="../../images/boards/fly_c8/DCbed.png" alt="DCbed" style="zoom:80%;" />

## 3.8  热敏电阻接线

C8提供了4路ADC接口，即可以接入4路热敏。热敏的接线方法如下图。热敏电阻的类型请咨询购买商家。

如果为fly购买的（如下图所示），请将sensor_type 配置为：**ATC Semitec 104GT-2**。

![semitec1](../../images/boards/fly_super8/semitec1.png)

如果为常规的NTC 100K（如下图所示），请将sensor_type 配置为：**Generic 3950**

<img src="../../images/boards/fly_super8/semitec3.png" alt="semitec2" style="zoom:70%;" />

<img src="../../images/boards/fly_super8/semitec3.png" alt="semitec3" style="zoom:80%;" />

**喷头热敏、热床热敏：**

<img src="../../images/boards/fly_c8/thermistor.png" alt="thermistor" style="zoom:80%;" />

## 3.9 风扇接线

风扇电压选择。使用跳线帽短接对应电压的排针即可，选择方式如下图**。**注：图中黄色方框内的跳线方式均相同。

**注意！！！选择错误的风扇电压可能会损坏风扇或者MOS模块。**

![fan_voltage](../../images/boards/fly_c8/fan_voltage.png)

**风扇接线。**如下图。

<img src="../../images/boards/fly_c8/fan.png" alt="fan" style="zoom:70%;" />

## 3.10  限位开关接线

限位开关有常开（NO）和常闭（NC）两种。一般在3D打印机上，建议使用**常闭（NC）**，这样在限位开关线路出现问题时，系统会及时报错，可以避免一些不必要的撞车，避免损坏打印机。

****

<img src="../../images/boards/fly_c8/endstop.png" alt="endstop" style="zoom:80%;" />

## 3.11 调平传感器接线

### 3.11.1 PL08N接线

VORON官方建议是使用欧姆龙Omron TL-Q5MC（之前官方推荐的是PL08N，两者原理一样，只是探测距离不一样）传感器来进行热床调平。接线方式如下图所示。

<img src="../../images/boards/fly_c8/pl08n.png" alt="pl08n" style="zoom:65%;" />

### 3.11.2 BL-Touch接线

BL-touch一共有五根线，三根为第一组，负责传感器的供电和探针的收放，第二组为地线和信号线，输出限位信号。BL-touch接线时请仔细核对线序，错误的接线可能会永久性损坏传感器和主板！！！接线方法如下图所示。

<img src="../../images/boards/fly_c8/bltouch.png" alt="bltouch" style="zoom:80%;" />

### 3.11.3 Klicky接线

Klicky为第三方的调平传感器，能够用极低的成本自己在家制作，且性能稳定，性价比高，非常推荐使用。接线方法如下图所示。

项目地址：[jlas1/Klicky-Probe: ](https://github.com/jlas1/Klicky-Probe "项目地址，点击即可跳转")

<img src="../../images/boards/fly_c8/klicky.png" alt="klicky" style="zoom:65%;" />

### 3.11.4 Voron Tap接线

Tap是一种基于喷嘴的z探针，适用于 voron 2.4和Trident打印机。整个工具头移动以触发光开关，精度比常规限位开关更好，可以使用几乎市面上所有的打印平台。

> [!TIP]
> Voron Tap不建议接 **24V** ，某些版本使用 **24V** 有一定概率会导致Tap传感器烧坏，这并非Fly产品的问题，是Voron Tap的设计缺陷，请悉知！！！

**注意！！！5V和GND不能接反，否则会损坏Tap传感器甚至主板！！！**

<img src="../../images/boards/fly_c8/tap.png" alt="tap" style="zoom:80%;" />

## 3.12 RGB接线

**注意！！！5V和GND不能接反，否则会损坏LED灯板甚至主板！！！**

<img src="../../images/boards/fly_c8/RGB.png" alt="RGB" style="zoom:80%;" />

## 3.13 加速度计接线

<img src="../../images/boards/fly_c8/adxl345.png" alt="adxl345" style="zoom:80%;" />

## 3.14 FLY-Mini12864接线

下图为FLY的mini12864的接线方式，其他厂家的屏幕请咨询相应厂家。Mini12864屏幕接接反，接错可能会导致上位机连不上MCU。如果使用mini12864屏幕之前可以正常连上主板的MCU，而使用mini12864后就连不上MCU了，请尝试拔出mini12864的接线！！！

<img src="../../images/boards/fly_c8/mini12864.png" alt="mini12864" style="zoom:80%;" />

## 3.15 拨码开关的使用

> [!Warning]
> 请注意拨码开关不是跳线，如果想正常使用还是需要拨动拨码

> [!Warning]
>  ``1``,``2``为一组，``3``,``4``为一组。两组不可同时打开

* 拨码开关``1``,``2``向右拨动至打开状态，将下位机与上位机通过内置USB连接

  <img src="../../images/boards/fly_c8/dip1.png" alt="dip1" style="zoom:90%;" />

* 拨码``3``,``4``向右拨动至打开状态，将下位机USB连接到板载Type-C端口

  <img src="../../images/boards/fly_c8/dip2.png" alt="dip2" style="zoom:90%;" />





