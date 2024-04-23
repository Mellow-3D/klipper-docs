# 5160spi问题

如果使用5160显示下方报错，因上位机差异可能导致驱动无法使用

```
Unable to write tmc spi 'extruder' register IHOLD_IRUN
```

解决方法

* 刷写提供正常的固件
* 更换上位机

固件下载与烧录，请注意需要工具板可以正常连接can并且拥有CANBOOT

* 下载

```
cd && git clone https://github.com/FengHua741/FLY_Katapult.git
```

* 烧录

```
python3 ~/klipper/lib/canboot/flash_can.py -f ~/FLY_Katapult/SHT36/SHT36PRO_KLIPPER_CAN-1M.bin -u c8a53261de65
```

