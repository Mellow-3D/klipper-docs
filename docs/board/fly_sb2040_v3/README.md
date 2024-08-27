## 1. 产品简介

FLY SB2040 V3是广州镁伦电子科技有限公司针对VORON Stealthburber打印头推出的一款工具板，使用该工具板，可以用四根线来替代原来主板与打印头之间繁杂的接线，优化布局。SB2040适用于stealthburner与afterburner，其集成了CAN收发器、RS232收发器、USB口、TMC2209驱动、LIS2DW加速度传感器，三个可控风扇等其他功能的工具板。此工具板适用于Klipper与RRF固件。

![v3](../../images/boards/fly_sb2040_v3/sb2040.png)

## 2. 产品特点

* 预留Boot按钮，用户可通过TypeC进入Boot模式更新固件
* 支持Klipper固件、RRF固件
* 支持CAN模式、RS232模式、RRF CAN模式，
* 在RS232模式下，拥有更高的传输速率、更强的稳定性。在CAN模式下，，支持CAN扩展，预留CAN扩展接口
* 温度传感器支持： 板载MAX31865芯片，兼容PT100和PT1000温度传感器。
* 支持两路2/3/4线风扇、1路2线风扇，5V/VCC电压可选
* 板载LIS2DW加速度传感器与LDC1612传感器
* 预留RGB接口、板载2209驱动，支持多种调平传感器，例如klicky、Voron Tap、PL08n等
* 支持12-24V电压、15A电流输入，增大加热棒端口，额定电流10A

## 3. 新增功能

* 支持Klipper CAN模式、RS232模式、RRFCAN模式互相切换
* 新增RS232模式，拥有更高的传输速率、更强的稳定性，调试使用也更为简单
* 新增RRF CAN模式，可切换为RRF工具板，增强适用性
* 新增CAN扩展接口，方便扩展CAN设备
* 新增终端电阻拨码开关，其终端电阻120R可通过拨码选择，无需跳线
* 新增3米电源/信号连接线，连接线使用双绞设计，抗干扰性能更强

## 4. 产品参数

● MCU：Raspberry Pi rp2040，Dual core ARM Cortex-M0+@133MHz

● 连接接口使用XT30(2+2)连接器支持15A电流，峰值30A

● 固件：Reprap/Klipper

● 输入电压：DC12V-24V

● 逻辑电压：DC3.3V

● 板载传感器：LIS2DW与可选 ldc1612和max31865

● 加热棒接口: 加热棒（HEAT0）

● 扩展接口: RGB，EndStop，PT100/PT1000，XH2.54-2P CAN口

● 风扇接口：一路DC风扇，两路DC风扇或者PWM风扇

● 电机驱动：板载TMC2209

● 温度传感器：一路100K NTC或PT1000（TH0），一路PT100/PT1000可选

## 5. 产品分类

RRF教程链接[RRF](https://teamgloomy.github.io/fly_sb2040_pro_max_v3_general.html)

| SB2040         |          V3          |       Plus V3        |        Max V3        |        Pro V3        |     Pro Plus V3      |      Pro Max V3      |
| :------------- | :------------------: | :------------------: | :------------------: | :------------------: | :------------------: | :------------------: |
| Drive          | ![alt text][TMC2209] | ![alt text][TMC2209] | ![alt text][TMC2209] | ![alt text][TMC2240] | ![alt text][TMC2240] | ![alt text][TMC2240] |
| Klipper CANBus |  :white_check_mark:  |  :white_check_mark:  |  :white_check_mark:  |  :white_check_mark:  |  :white_check_mark:  |  :white_check_mark:  |
| Klipper RS232  |  :white_check_mark:  |  :white_check_mark:  |  :white_check_mark:  |  :white_check_mark:  |  :white_check_mark:  |  :white_check_mark:  |
| RRF CANBus     |         :x:          |         :x:          |  :white_check_mark:  |         :x:          |         :x:          |  :white_check_mark:  |
| LIS2DW         |  :white_check_mark:  |  :white_check_mark:  |  :white_check_mark:  |  :white_check_mark:  |  :white_check_mark:  |  :white_check_mark:  |
| MAX31865       |         :x:          |  :white_check_mark:  |  :white_check_mark:  |         :x:          |  :white_check_mark:  |  :white_check_mark:  |
| LDC1612        |         :x:          |         :x:          |  :white_check_mark:  |         :x:          |         :x:          |  :white_check_mark:  |


[TMC2209]: https://img.shields.io/badge/-TMC2209-green "TMC2209"
[TMC2240]: https://img.shields.io/badge/-TMC2240-blue "TMC2240"
