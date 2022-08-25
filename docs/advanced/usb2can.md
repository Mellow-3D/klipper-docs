# Klipper的USB桥接CAN

?> 此教程使用Fly-Super8做演示

## 为Super8编译USB桥接CAN固件

* Klipper配置

![config](../../images/adv/1.png ":no-zooom")

* 如何编译固件参考[固件编译](/introduction/firmware)
  

## 烧录固件

* 参考[固件烧录](/board/fly_super8_pro/flash)

## 接线

* Fly-SHT工具板无需修改固件，依然是CAN PB8,9

* 将SHT板的CANH,CANL两线接到Super8的CANH,CANL
* SHT板需要连接两个终端电阻跳线帽