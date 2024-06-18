# 欠压疑似解决方法

* 更换电源
* 添加电源滤波器
* 更换挤出机电机判断
* 在挤出机驱动配置添加`driver_TPFD: 0`
* 执行下方指令尝试解决欠压问题

```
sudo systemctl stop klipper && mv ~/klipper/klippy/extras/tmc2240.py ~/tmc2240.py && curl -kfsSL https://cdn.mellow.klipper.cn/firmware/tmc2240.py -o ~/klipper/klippy/extras/tmc2240.py && sudo systemctl restart klipper
```

