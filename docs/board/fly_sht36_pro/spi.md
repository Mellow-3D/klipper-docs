# 5160spi问题

如果使用5160显示下方报错，因上位机差异可能导致驱动无法使用

```
Unable to write tmc spi 'extruder' register IHOLD_IRUN
```

解决方法

* 刷写提供正常的固件，CAN速率1M[下载链接](https://cdn.mellow.klipper.cn/BL/SHT36PRO/SHT36PRO_KLIPPER_CAN_1M.uf2)
* 更换上位机