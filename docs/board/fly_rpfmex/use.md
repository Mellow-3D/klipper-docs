# RPFMEX使用教程

* 使用之前请确保已完成[固件烧录](/board/fly_rpfmex/flash.md)

## 连接到上位机

* 使用Type-c线将RPFMEX连接到上位机的USB接口

## 配置

1. 如果没有烧录固件请查看[固件烧录](/board/fly_rpfmex/flash.md)
2. 如果是FLY-Gemini主板可直接打开`http://ip:9999`或者[打开FLY-Tools](http://flygemini:9999/)
3. 树莓派等其他设备

* 进入SSH终端执行下面的命令

```bash
ls /dev/serial/by-id/*
```

![3](../../images/boards/fly_rht36_42/use/3.png ":no-zooom")

* 复制**\/dev\/serial\/by-id\/usb-Klipper_rp2040_E66138935F7B1728-if00** 并将其填写到**printer.cfg**中

4. 具体配置请参考[示例配置](/board/fly_rpfmex/cfg.md)
