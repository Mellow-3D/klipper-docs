# 产品特点

* 采用 32 位主频 550 MHz 的 ARM Cortex-M7 系列 STM32H723ZGT6 主控芯片
* 主板与核心板使用 BTB 的连接方式，可以使用香橙派CM4与树莓派CM4等核心板
* 主板预留 BOOT 按键，用户可以通过 DFU 方式更新主板引导程序
* 十路拔插式TP驱动，无需任何跳线即可使用切换驱动模式
* 板载 DIAG 功能引脚，只需通过简单的拔插跳线帽即可使用无限位归位
* 驱动电源支持HVIN与VIN电源选择
* 可通过 MicroSD 卡升级 MCU 固件，也可通过 Klipper 的 make flash 命令通过DFU更新MCU 固件
* 六路两线可控风扇，并且支持可插拔MOS，两路四线风扇，一路VCC风扇
* 数控风扇 24V、12V、5V 电压可选，省去客户外接变压模块的操作，从而减少主板损坏几率
* 采用可更换的保险丝，方便更换；

# 产品参数

* MCU: STM32H723ZGT6
* 驱动电源:  VIN(12V-24V),HVIN(12V-48V)
* 主板电源:  VIN(12V-24V)
* 热床电源:  BED IN(12V-24V)
* 加热接口:  热床(BED OUT)、加热棒（HETA0，HETA1，HETA2，HETA3）
* 热床端口最大输出电流: 15A
* 加热棒端口最大输出电流: 6A
* 风扇端口最大输出电流: 1A
* 驱动工作模式支持：SPI、UART、STEP/DIR
* 拓展接口：BLTouch（Servos、Probe）、UART X1、高压限位口 X1

----

# FLY PRO_X10

![](../../images/boards/fly_pro/pro.png)