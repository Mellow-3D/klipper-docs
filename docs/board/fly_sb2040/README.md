# 配置信息

* **全新的Klipper工具头板**

1. 采用Raspberry Pi RP2040作为主控
2. 支持CAN总线连接，数据传输更稳定，延时更小，距离更远
3. 板载一个TMC2209驱动可用于挤出机
4. 板载ADXL345加速度计
5. can接口连接器支持15A电流，峰值30A
6. 板载NTC100k电阻，用于测仓温
7. PT1000/NTC100K上拉电阻切换
8. 高压输入限位
9. 支持2/3/4线风扇
10. 分体设计，Stealthburner方便拆卸
11. 兼容hartk的Stealthburner Toolhead Board （风扇小板可以不用更换）

* MCU: RPI RP2040
* 通信: CAN, USB
* 驱动: TMC2209*1
* 板载一个TMC2209驱动，可用于挤出机
* 接口：可控风扇\*3，RGB\*1，限位\*3，加热管\*1，热敏\*1

----

?> 重要

* 非FLY上位机请按[CAN使用](/advanced/can_rpi.md)文档配置好CAN
* 使用CanBoot请查看[CanBoot使用](/advanced/canboot.md)

----

## SB2040

![CAN](../../images/boards/fly_sb2040/sb2040.png ":no-zooom")

