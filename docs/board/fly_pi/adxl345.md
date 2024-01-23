# 14. 连接加速度计

## 1. 接线

加速度计的链接方式如下图所示

**接线图制作中，敬请期待**

## 2. 配置

```cfg
[mcu host]
serial: /tmp/klipper_host_mcu

[adxl345]
cs_pin: host:None
spi_bus: spidev1.0

[resonance_tester]
accel_chip: adxl345
#accel_chip_y: adxl345 bed
probe_points:
    100, 100, 20  # an example
```

## 3. 使用

测试请前往：[加速度计的使用](/advanced/Accelerometer?id=测试 "点击即可跳转")
