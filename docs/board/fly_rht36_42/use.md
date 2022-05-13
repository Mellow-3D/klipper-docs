# RHT36/42使用教程

* 使用之前请确保已完成[固件烧录](/board/fly_rht36_42/flash.md)

## 接线

?> USB中DP(D+)与DM(D-)两根线建议单独使用2芯双绞屏蔽线，0.2平方或更高。

1. 使用压线钳制作线材，RHT板附赠了端子

* 线材两端线序一致
* 也可以只压接电源两根线，USB使用TYPE-c接口

![1](../../images/boards/fly_rht36_42/use/1.png ":no-zooom")

制作好线材后直接连接扩展板即可

![2](../../images/boards/fly_rht36_42/use/2.png ":no-zooom")

## 配置

1. 如果没有烧录固件请查看[固件烧录](/board/fly_rht36_42/flash.md)
2. 如果是FLY-Gemini主板可直接打开`http://ip:9999`或者[打开FLY-Tools](http://flygemini.lan:9999/)
3. 树莓派等其他设备

* 进入SSH终端执行下面的命令

```bash
ls /dev/serial/by-id/*
```

![3](../../images/boards/fly_rht36_42/use/3.png ":no-zooom")

* 复制**\/dev\/serial\/by-id\/usb-Klipper_rp2040_E66138935F7B1728-if00** 并将其填写到**printer.cfg**中

4. 具体配置请参考[示例配置](/board/fly_rht36_42/cfg.md)
