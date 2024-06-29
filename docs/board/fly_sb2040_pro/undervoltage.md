# 欠压疑似解决方法

* 更换电源
* 添加电源滤波器
* 更换挤出机电机判断
* 在挤出机驱动配置添加`driver_TPFD: 0`
* 在SSH执行下方指令尝试解决欠压问题

```
sed -i 's/"uv_cp":                    0x01 << 2/#&/' ~/klipper/klippy/extras/tmc2240.py
```

