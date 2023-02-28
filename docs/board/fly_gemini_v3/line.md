# Gemini 接线

?> 此教程以 Voron V0 为例介绍接线方法，请结合自己的实际使用情况接线

## 1.1 Gemini接口图

![Interface](../../images/boards/fly_gemini_v3/Interface.png)

## 1.1 电源接线

**保险丝：**拿到主板后，首先按图接好四个保险丝。接好保险丝后才能接线，否则主板不通电。保险丝需要稍微用力才能按进去

![fuse](../../images/boards/fly_gemini_v3/fuse.png)

**供电：**Gemini的供电分为两个部分，分别是驱动供电（12-48V）、主板供电（加热棒、风扇、主控）（12-24V）。

<img src="../../images/boards/fly_gemini_v3/power.png" alt="power" style="zoom:80%;" />

## 1.2  步进电机接线

### 1.2.1 主板驱动跳线

**STEP/DIR模式。**在这个模式下，通过使用跳线帽来设置细分，通过调节电位器来调整电流。最常见的是A4988驱动，使用这类驱动需要查询厂家提供的细分配置表，然后通过跳线帽来设置细分。

**UART模式。**最常见的使用这种模式的驱动有：TMC2208、TMC2209、TMC2226等。这类驱动芯片可以与主控进行UART异步串行通信，可以通过修改配置文件来设置驱动的细分、运行电流、静音模式等。

**SPI模式。**最常见的使用这种模式的驱动有：TMC5160、TMC2230等。这类驱动芯片通过spi与主控同步串行通信，同样的也可以通过修改配置文件来设置驱动的细分、运行电流、静音模式等。

<img src="../../images/boards/fly_gemini_v3/drive_dip.jpg" alt="drive_dip" style="zoom:80%;" />

**注：使用A4988驱动或者外接驱动，跳线模式选择：正常跳线模式。并在配置中将驱动配置删除即可。**

### 1.2.2 驱动的安装

驱动在安装前需要进行相应的检查，以免对驱动或主板造成损坏。

**FLY驱动：**如果不使用无限位归零功能，请将拨码开关拨到1的位置；相反如果要使用无限位归零功能，请将拨码开关拨到ON的位置。

![fly2209](../../images/boards/fly_super8/fly2209.png)

**非FLY驱动：**如果是非FLY的驱动（下图为mks 2209），在安装之前需要剪掉图中两个引脚（这两个引脚为无限位归零引脚，不使用无限位归零功能则需要剪掉）。不同厂家的设计可能会有所区别，使用前请咨询相应厂家。

![mks2209](../../images/boards/fly_super8/mks2209.png)

> 注意！！！ 安装驱动模块时，一定要保证插入的方向正确，即EN引脚在左上角，否则会损坏驱动甚至主板！！！注意给驱动贴好散热片！！！

![drive](../../images/boards/fly_gemini_v3/drive.png)

### 1.2.3  步进电机接线

在3D打印机中，最常用的是两相四线步进电机，其原理如图所示。鉴别步进电机线序有两种方法：

1. 短接步进电机四根线中任意两根线，用手转动电机轴，如果转动阻力很大，则这两根线为同一组线圈，即1A和1B或者2A和2B。如果和没有短接一样转起来很轻松，说明这两根线不是同一组线圈。

2. 使用万用表的蜂鸣器档，测量四根线中任意两根，如果蜂鸣器响，则说明这两根线为同一组。反之，则不是同一组，需要更换其中一根线再次测量。

![motorSCH](../../images/boards/fly_super8/motorSCH.png)

**Voron V0**：将X、Y、Z 、E0 共四个电机依次接到主板上

![motor](../../images/boards/fly_gemini_v3/motor.png)



## 1.3  加热棒接线

![heat](../../images/boards/fly_gemini_v3/heat.png)

## 1.4  热床接线

**交流热床：**固态继电器在接线时，请注意别接错了。

?> 请注意输入为DC直流和输出为AC交流，别买错继电器了！！！否则会导致热床一通电就加热！！！

![relay](../../images/boards/fly_gemini_v3/relay.png)


![ACbed](../../images/boards/fly_gemini_v3/ACbed.png)

**直流热床：**板载MOS接直流热床时请注意使用功率，直流热床最大电流不能超过10A。如果超过10A，建议使用外接MOS模块来使用热床，否则可能会对 Gemini 主板造成不可逆的损伤。

![DCbed](../../images/boards/fly_gemini_v3/DCbed.png)

## 1.5  热敏电阻接线

Gemini提供了两路ADC接口。热敏的接线方法如下图。热敏电阻的类型请咨询购买商家。

如果为fly购买的（如下图所示），请将sensor_type 配置为：**ATC Semitec 104GT-2**。

![semitec1](../../images/boards/fly_super8/semitec1.png)

如果为常规的NTC 100K（如下图所示），请将sensor_type 配置为：**Generic 3950**

<img src="../../images/boards/fly_super8/semitec2.png" alt="semitec2" style="zoom:70%;" />

<img src="../../images/boards/fly_super8/semitec3.png" alt="semitec3" style="zoom:80%;" />

**喷头热敏：**

![nozzle](../../images/boards/fly_gemini_v3/nozzle.png)

**热床热敏：**

![bed](../../images/boards/fly_gemini_v3/bed.png)

## 1.6 风扇接线

风扇电压选择。使用跳线帽短接对应电压的排针即可，选择方式如下图**。**注：图中黄色方框内的跳线方式均相同。

**注意！！！选择错误的风扇电压可能会损坏风扇或者MOS模块。**

![fan_voltage](../../images/boards/fly_gemini_v3/fan_voltage.png)

**MOS模块的安装（不分正反）。**如下图

<img src="../../images/boards/fly_super8/fanmos.png" alt="fanmos" style="zoom:60%;" />

**风扇接线。**如下图。

![fan](../../images/boards/fly_gemini_v3/fan.png)

## 1.7  限位开关接线

限位开关有常开（NO）和常闭（NC）两种。一般在3D打印机上，建议使用**常闭（NC）**，这样在限位开关线路出现问题时，系统会及时报错，可以避免一些不必要的撞车，避免损坏打印机。

![endstop](../../images/boards/fly_gemini_v3/endstop.png)

## 1.8 调平传感器接线

V0没有调平传感器，这里针对其他机型做调平传感器接线介绍

### 1.8.1 接近开关

欧姆龙接近开关支持10-30V供电。

![pl08n](../../images/boards/fly_gemini_v3/pl08n.png)

### 1.8.2 BL-Touch接线

BL-touch一共有五根线，三根为第一组，负责传感器的供电和探针的收放，第二组为地线和信号线，输出限位信号。BL-touch接线时请仔细核对线序，错误的接线可能会永久性损坏传感器和主板！！！接线方法如下图所示。

![3dtouch](../../images/boards/fly_gemini_v3/3dtouch.png)

### 1.8.3 Klicky接线

Klicky为第三方的调平传感器，能够用极低的成本自己在家制作，且性能稳定，性价比高，非常推荐使用。接线方法如下图所示。

项目地址：[jlas1/Klicky-Probe: ](https://github.com/jlas1/Klicky-Probe "项目地址，点击即可跳转")

![klicky](../../images/boards/fly_gemini_v3/klicky.png)

### 1.8.4 Voron Tap接线

Tap是一种基于喷嘴的z探针，适用于V2和Trident打印机设计。整个工具头移动以触发光开关，精度比常规限位开关更好，可以使用几乎市面上所有的打印平台。

**注意！！！5V和GND不能接反，否则会损坏Tap传感器甚至主板！！！**

![tap](../../images/boards/fly_gemini_v3/tap.png)

## 1.9 FLY-Mini12864接线

下图为FLY的mini12864的接线方式，其他厂家的屏幕请咨询相应厂家。Mini12864屏幕接接反，接错可能会导致上位机连不上MCU。如果使用mini12864屏幕之前可以正常连上主板的MCU，而使用mini12864后就连不上MCU了，请尝试拔出mini12864的接线！！！

![mini12864](../../images/boards/fly_gemini_v3/mini12864.png)

## 1.10 Gemini拨码开关说明

Gemini开创性的将上位机与主板集成在一块PCB上，因此上位机连接到主板无需额外的数据线，使用拨码开关配置即可

### 1.10.1 4P拨码开关使用说明

* 如图所示，需要将第 **1**、**2** 个拨码开关向上拨至打开状态，**3**、**4** 保持关闭状态。linux-usb1 直连 stm32-usb 

  ?> 这是最常用的，也是出厂的默认模式，可以理解为使用 USB 线 连接上位机到主板，这个拨码扮演的角色是 USB 线 

![dip1](../../images/boards/fly_gemini_v3/dip1.png)

?>在这个模式下，图中所示的USB口会被占用，不能再插入其他USB设备

![dip2](../../images/boards/fly_gemini_v3/dip2.png)

* 如果将 **1**、**2** 拨码开关拨到关闭状态，**3**、**4** 拨码开关拨到打开状态，则将STM32 连接到下方的Type-C口

  ?>这种方式几乎用不到

  ![dip3](../../images/boards/fly_gemini_v3/dip3.png)

### 1.10.2 5P拨码开关使用说明

全部打开将用于 RRF 的 SBC 模式，STM32 的 SPI 连接到 linux mcu 的 spi0

?> 使用 **Klipper** ，无需改动！！！

![dip4](../../images/boards/fly_gemini_v3/dip4.png)

## 1.11 加速度计接线

接线如图所示

![adxl345](../../images/boards/fly_gemini_v3/adxl345.png)

