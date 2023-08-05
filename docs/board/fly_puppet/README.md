# 配置信息

* MCU: RPI RP2040
* 通信: UART,USB
* 驱动: 5轴（不支持SPI驱动）
* 接口：可控风扇\*3，RGB\*1，限位\*3
* 外设：USB\*4, GPIO-40Pin(兼容RPI), ETH\*1, Micro-HDMI\*1, DSI\*1, CSI\*1
* 供电：为RPI供电提供5.1v 3A，保证其稳定运行，不会出现警告

> [!TIP]
> Puppet的DSI和CSI端口与树莓派的相反，请使用同向FPC线材连接

> [!TIP]
> FAN2,FAN3,RGB,SERVO使用RPI引脚，只有配合RPI才能使用

## FLY-PUPPET

![FLY-PUPPET](../../images/boards/fly_puppet/fly_puppet.png ":no-zooom")
