# 5160SPI问题

如果使用5160显示下方报错，因上位机Arm工具链版本问题`arm-none-eabi-gcc`

```
Unable to write tmc spi 'extruder' register IHOLD_IRUN
```

解决方法有以下三种

* 编译工具链arm-none-eabi-gcc从gcc10换到gcc8就可以
* 更换上位机
* 刷写提供正常的固件

固件下载与烧录，请注意需要工具板可以正常连接can并且拥有CANBOOT

* 下载

```
cd ~/ && git clone https://github.com/FengHua741/FLY_Katapult.git && cd /FLY_Katapult && git pull
```

* 烧录

```
python3 ~/klipper/lib/canboot/flash_can.py -f ~/FLY_Katapult/Klipper/SHT36PRO/SHT36PRO_KLIPPER_CAN-1M_v0.12.0-229-g589bd64c.bin -u <SHT36PRO_canid>
```

