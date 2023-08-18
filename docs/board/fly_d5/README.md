# 1. 产品简介

我们很高兴地发布全新的FLY-C8主板。此板可替代树莓派作为上位机运行，它拥有有1GB的板载DDR3内存，允许运行完整的LINUX桌面（基于 Armbian定制优化）。该板可与Klipper和RRF固件一起使用，甚至可以在使用SHT工具板时运行Klipper屏幕。

由于FLY-C8在一个软件包中同时具有控制板（STM32）和linux板，因此不需要树莓派（目前非价格仍然昂贵）。增强5v电源保护，降低芯片损坏的可能性。取消了MCU芯片的存储卡设置，更容易安装固件。无需使用Can Hat即可与工具板通信。EMMc+SDIO扩展支持主板的wifi和16G存储功能。

设计这款上位机的目的是让客户更容易使用Klipper固件或RRF固件。我们对LINUX系统镜像进行优化，更适合3D打印机使用，操作安装也更简单，小白稍有基础也能很快的学习使用。相对于其他上位机板子节省了学习成本，让你可以更专注于享受3D打印带来的快乐(购买带SD卡的套餐预装Klipper固件，上电就能用省时又省事)。



![c8](../../images/boards/fly_c8/c8.png)

## **1.1 产品特点**

* 采用 32 位主频 168MHz 的 ARM Cortex-M0+系列 STM32F407VGT6 主控芯片
* 板载 TMC 驱动的 SPI 和 UART 工作模式
* 板载 DIAG 功能引脚，只需通过简单的拔插跳线帽即可使用无限位归位
* 数控风扇 24V、12V、5V 电压可选，省去购买降压模块麻烦。
* 全新Flash刷写方式，可通过FLY-Tools直接更新主板固件
* 多路电源管理，如果端口、限位、驱动等短路不会影响上位机运行
* 预留RGB接口支持（12V，5V）电压可选
* 预留SPI接口，可让客户外接加速度传感器进行加速度补偿
* TFT屏幕与HDMI屏幕支持一线通
* 系统预装klipper、moonraker、mainsail、fulidd、klipper-screen、Crowsmest、共振补偿插件 numpy与FLY-Tools，无需换源等复杂的操作，小白更容易上手

[Fly-C8-淘宝网还没上架 需要替换 (taobao.com)](https://item.taobao.com/item.htm?spm=a230r.1.14.1.1a4840a8a8t04w&id=661670024975&ns=1&abbucket=16#detail "点击即可跳转")

## 1.2 产品参数

> [!TIP]
>
> **上位机**

* CPU：高性能全志H5芯片，4核64位Cortex-A53
* GPU：高性能6核Mali 450，像素填充率大于2.7gpixel/s
* RAM：1GB DDR3（与GPU共享）
* ROM：支持最大128GB SDCARD
* 外设：Spi x1，TFT X1，USB x4（USB 2.0 x3，OTG x1），Micro HDMI x1，Eth x1（100M），CAN x1，3.5mm audio interface X1
* 接口：板载M.2接口，可扩展WIFI，eMMC等。（私有协议，切勿连接非FLY π专用的M.2设备）
* 预留了一个ZH1.5可控5V风扇接口，可用于上位机散热
* 支持TFT屏幕与HDMI屏幕FPC一线通
* 预留CAN桥接接口
* 系统预装klipper、moonraker、mainsail、fulidd、klipper-screen、Crowsmest、共振补偿插件 numpy与FLY-Tools，无需换源等复杂的操作，小白更容易上手

>[!TIP]
>
>**下位机**

* 系统与FLY-Gemini互相兼容
* MCU: STM32F407VGT6
* 固件:  KLIPPER
* 支持12-24V直流供电，供电更稳定，省去降压模块
* 热床端口最大输出电流:  15A
* 加热棒端口最大输出电流:  6A
* 风扇端口最大输出电流:  1A
* 驱动工作模式支持：SPI、UART、STEP/DIR
* 支持驱动：支持TMC5160Pro、TMC5160、TMC2209、TMC2225、TMC2226、TMC2208、TMC2130、A4988等
* 拓展接口：BLTouch（Servos、Probe）、RGB X2、UART X1、12864 X1
* 风扇: 两线数控风扇 X6 (支持24V、12V、5V)可选
* 温度传感器：3路 NTC 100K
* 支持机器结构：Cartesian、Delta、Kossel、Ultimaker、CoreXY



## 1.2 C8尺寸

 ![](../../images/boards/fly_c8/size.png)

