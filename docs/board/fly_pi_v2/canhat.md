# 10. 板载UTOC使用

## 10.1 板载UTOC安装

1. 将拨码开关向上拨至打开状态，linux-usb1 直连 板载UTOC
2. FLY-πV2的CAN接口R如下图接线



## 10.2 使用

1. 板载UTOC自带120ohm终端电阻跳线，如果需要可自行接上
2. FLY-π-V2使用板载UTOC且使用FLYOS的话系统无需做任何修改，直接使用
3. 将FLY-π-V2的CANH和CANL连接到FLY-SHT的CANH和CANL即可（多个CAN设备之间并联）