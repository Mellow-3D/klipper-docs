# 12. CAN HAT使用

## 12.1 CAN速率查询

> [!WARNING]
>
> **系统默认速率为1M**

> [!NOTE]
>
> 查看方法

```
cat /etc/network/interfaces.d/can0
```

> [!NOTE]
>
> 修改方法

```
sudo sed -i 's/1000000/500000/g' /etc/network/interfaces.d/can0
```

保存重启即可

## 12.2 CANHAT安装

1. CANHat的红色排针对应FLY-π的蓝色排母，黑色对应黑色（插反会烧毁设备）
2. FLY-π的CAN接口丝印有误，请按照下图接线

![canhat](../../images/boards/fly_pi/canhat.png ":no-zooom")

## 12.3 使用

1. FLY CANhat自带120ohm终端电阻
2. FLY-π使用CANHat且使用FLYOS的话系统无需做任何修改，直接使用
3. 将FLY-π的CANH和CANL连接到FLY-SHT的CANH和CANL即可（多个CAN设备之间并联）