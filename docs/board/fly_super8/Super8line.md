# 2. Super8 接线

?> 此教程以Voron Trident为例介绍接线方法，请结合自己的实际使用情况接线

## 2.1 Super8接口图

![interface](../../images/boards/fly_super8/interface.png)

## 2.1 电源接线

**保险丝：**拿到主板后，首先按图接好四个保险丝。接好保险丝后才能接线，否则主板不通电。保险丝需要稍微用力才能按进去

![fuse](../../images/boards/fly_super8/fuse.png)

**供电：**Super8的供电分为四个部分，分别是0-2号驱动供电、3-7号驱动供电、主板（加热棒、风扇、主控）供电、热床供电。

?>注：Super8 1.0版本只有0-2号驱动位支持12-48V供电，3-7号驱动位仅支持12-24V供电 

<img src="../../images/boards/fly_super8/power.png" alt="power" style="zoom:80%;" />

## 2.2  步进电机接线

### 2.2.1 主板驱动跳线

**STEP/DIR模式。**在这个模式下，通过使用跳线帽来设置细分，通过调节电位器来调整电流。最常见的是A4988驱动，使用这类驱动需要查询厂家提供的细分配置表，然后通过跳线帽来设置细分。

**UART模式。**最常见的使用这种模式的驱动有：TMC2208、TMC2209、TMC2226等。这类驱动芯片可以与主控进行UART异步串行通信，可以通过修改配置文件来设置驱动的细分、运行电流、静音模式等。

**SPI模式。**最常见的使用这种模式的驱动有：TMC5160、TMC2230等。这类驱动芯片通过spi与主控同步串行通信，同样的也可以通过修改配置文件来设置驱动的细分、运行电流、静音模式等。

<img src="../../images/boards/fly_super8/drive_dip.png" alt="drive_dip" style="zoom:75%;" />

**注：使用A4988驱动或者外接驱动，跳线模式选择：正常跳线模式。并在配置中将驱动配置删除即可。**

### 2.2.2主板驱动IO电压选择

Super8可以通过修改电阻的位置来调整EN、DIR、STEP、UART这几个信号引脚的输出电压（默认5v，无需修改，最常见）。

![drive_voltage](../../images/boards/fly_super8/drive_voltage.png)

### 2.2.3 驱动的安装

驱动在安装前需要进行相应的检查，以免对驱动或主板造成损坏。

**FLY驱动：**如果不使用无限位归零功能，请将拨码开关拨到1的位置；相反如果要使用无限位归零功能，请将拨码开关拨到ON的位置。

![fly2209](../../images/boards/fly_super8/fly2209.png)

**非FLY驱动：**如果是非FLY的驱动（下图为mks 2209），在安装之前需要剪掉图中两个引脚（这两个引脚为无限位归零引脚，不使用无限位归零功能则需要剪掉）。不同厂家的设计可能会有所区别，使用前请咨询相应厂家。

![mks2209](../../images/boards/fly_super8/mks2209.png)

**注意！！！ 安装驱动模块时，一定要保证插入的方向正确，即EN引脚在左上角，否则会损坏驱动甚至主板！！！注意给驱动贴好散热片！！！**

![drive_install](../../images/boards/fly_super8/drive_install.png)

### 2.2.4 步进电机接线

在3D打印机中，最常用的是两相四线步进电机，其原理如图所示。鉴别步进电机线序有两种方法：

1. 短接步进电机四根线中任意两根线，用手转动电机轴，如果转动阻力很大，则这两根线为同一组线圈，即1A和1B或者2A和2B。如果和没有短接一样转起来很轻松，说明这两根线不是同一组线圈。

2. 使用万用表的蜂鸣器档，测量四根线中任意两根，如果蜂鸣器响，则说明这两根线为同一组。反之，则不是同一组，需要更换其中一根线再次测量。

![motorSCH](../../images/boards/fly_super8/motorSCH.png)

**Voron Trident：**将X、Y、E0、Z 、Z1、 Z2 共六个电机依次接到主板上的Driver0 - Driver5

![motor_trident](../../images/boards/fly_super8/motor_trident.png)

**Voron 2.4：**将X、Y、E0、Z 、Z1、 Z2、Z3 共七个电机依次接到主板上的Driver0 - Driver6

![motor_2.4](../../images/boards/fly_super8/motor_2.4.png)

## 2.3  加热棒接线

![heat](../../images/boards/fly_super8/heat.png)

## 2.4  热床接线

**交流热床：**固态继电器在接线时，请注意输入和输出别接错了。

<img src="../../images/boards/fly_super8/relay.png" alt="relay" style="zoom:75%;" />


![ACbed](../../images/boards/fly_super8/ACbed.png)

**直流热床：**板载MOS接直流热床时请注意使用功率，直流热床最大电流不能超过10A。如果超过10A，建议使用外接MOS模块来使用热床，否则可能会对Super8主板造成不可逆的损伤。

![DCbed](../../images/boards/fly_super8/DCbed.png)

## 2.5  热敏电阻接线

Super8提供了六路ADC接口，即可以接入六路热敏。热敏的接线方法如下图。热敏电阻的类型请咨询购买商家。

如果为fly购买的（如下图所示），请将sensor_type 配置为：**ATC Semitec 104GT-2**。

![semitec1](../../images/boards/fly_super8/semitec1.png)

如果为常规的NTC 100K（如下图所示），请将sensor_type 配置为：**Generic 3950**

<img src="../../images/boards/fly_super8/semitec2.png" alt="semitec2" style="zoom:70%;" />

<img src="../../images/boards/fly_super8/semitec3.png" alt="semitec3" style="zoom:80%;" />

**喷头热敏：**

![nozzle_TH](../../images/boards/fly_super8/nozzle_TH.png)

**热床热敏：**

![bed_TH](../../images/boards/fly_super8/bed_TH.png)

## 2.6 风扇接线

风扇电压选择。使用跳线帽短接对应电压的排针即可，选择方式如下图**。**注：图中黄色方框内的跳线方式均相同。

**注意！！！选择错误的风扇电压可能会损坏风扇或者MOS模块。**

![fan_voltage](../../images/boards/fly_super8/fan_voltage.png)

**MOS模块的安装（不分正反）。**如下图

<img src="../../images/boards/fly_super8/fanmos.png" alt="fanmos" style="zoom:60%;" />

**风扇接线。**如下图。

![fan](../../images/boards/fly_super8/fan.png)

## 2.7  限位开关接线

限位开关有常开（NO）和常闭（NC）两种。一般在3D打印机上，建议使用**常闭（NC）**，这样在限位开关线路出现问题时，系统会及时报错，可以避免一些不必要的撞车，避免损坏打印机。

**Super8的限位电压是可以通过更改短接电阻来更改电压的，可选3.3v、5v、12v，默认5V。默认电压已经能够满足大多数使用场景，无需修改，如需修改，请谨慎使用。**

![endstop_voltage](../../images/boards/fly_super8/endstop_voltage.png)

![endstop](../../images/boards/fly_super8/endstop.png)

## 2.8 调平传感器接线

### 2.8.1 PL08N接线

VORON官方建议是使用欧姆龙Omron TL-Q5MC（之前官方推荐的是PL08N，两者原理一样，只是探测距离不一样）传感器来进行热床调平。Super8主板上红色3P端子支持高压输入，板载了二极管，无需外接。接线方式如下图所示。

![pl08n](../../images/boards/fly_super8/pl08n.png)

欧姆龙接近开关支持10-30V供电。由于super8的高压接口默认电压为5V，不能驱动接近开关，需要更改输出电压至12V才能正常使用。更改方式如下图所示。

![HV_endstop_dip](../../images/boards/fly_super8/HV_endstop_dip.png)

如果没有烙铁等工具，或者对自己的技术没有信心，建议将接近开关的电源线接到主板供电口。接线方法如下图所示。

![pl08n2](../../images/boards/fly_super8/pl08n2.png)

### 2.8.2 BL-Touch接线

BL-touch一共有五根线，三根为第一组，负责传感器的供电和探针的收放，第二组为地线和信号线，输出限位信号。BL-touch接线时请仔细核对线序，错误的接线可能会永久性损坏传感器和主板！！！接线方法如下图所示。

![bltouch](../../images/boards/fly_super8/bltouch.png)

### 2.8.3 Klicky接线

Klicky为第三方的调平传感器，能够用极低的成本自己在家制作，且性能稳定，性价比高，非常推荐使用。接线方法如下图所示。

项目地址：[jlas1/Klicky-Probe: ](https://github.com/jlas1/Klicky-Probe "项目地址，点击即可跳转")

![klicky](../../images/boards/fly_super8/klicky.png)

### 2.8.4 Voron Tap接线

Tap是一种基于喷嘴的z探针，适用于V2和Trident打印机设计。整个工具头移动以触发光开关，精度比常规限位开关更好，可以使用几乎市面上所有的打印平台。

?> Voron Tap不建议接 **24V** ，某些版本使用 **24V** 有一定概率会导致Tap传感器烧坏，这并非Fly产品的问题，是Voron Tap的设计缺陷，请悉知！！！

**注意！！！5V和GND不能接反，否则会损坏Tap传感器甚至主板！！！**

![tap](../../images/boards/fly_super8/tap.png)

## 2.9 RGB接线

由于super8大部分的IO口都做了防烧的保护机制，如果要使用RGB灯带，只能接到主板的EXP口上，或者其他没有保护的IO口。5V和GND不一定要EXP接口上的，但是S一定要是EXP口上的。（也可以使用fly π上的IO）

**注意！！！5V和GND不能接反，否则会损坏LED灯板甚至主板！！！**

![rgb](../../images/boards/fly_super8/rgb.png)

## 2.10 FLY-Mini12864接线

下图为FLY的mini12864的接线方式，其他厂家的屏幕请咨询相应厂家。Mini12864屏幕接接反，接错可能会导致上位机连不上MCU。如果使用mini12864屏幕之前可以正常连上主板的MCU，而使用mini12864后就连不上MCU了，请尝试拔出mini12864的接线！！！

![flymini12864](../../images/boards/fly_super8/flymini12864.png)

## 2.11 连接到上位机

主板通过TypeC接口连接到上位机的USB口，也可以用过串口连接到上位机。这里只对前者做介绍。

![toπ](../../images/boards/fly_super8/toπ.png)

![usbpower](../../images/boards/fly_super8/usbpower.png)



