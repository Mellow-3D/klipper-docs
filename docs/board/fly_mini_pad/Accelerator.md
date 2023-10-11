>[!TIP] 
>
>**请注意线序是否正确，接错有可能损坏机器**

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

![ADXL](../../images/boards/fly_mini_pad/adxl.jpg)