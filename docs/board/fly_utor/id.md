# **搜索id**

```
ls /dev/serial/by-path/*
```

![id](../../images/boards/fly_utor/id.png)

* 请注意使用FLY UTOR会输出三个id，但是如果你过另外一个UTOR系统会记录下来导致搜索时候出现多个id
* 请确保id后面带有`-port0`否则无法使用

# 参考配置

```
[mcu SB2040V3]  # 工具主板序列号
## RS232 ID
## 请根据固件配置填写波特率
serial: /dev/serial/by-path/platform-xhci-hcd.0.auto-usb-0:1.4.2:1.0-port0
baud: 250000
restart_method:command
```

