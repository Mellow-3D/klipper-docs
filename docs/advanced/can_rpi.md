# 树莓派CAN使用

> [!NOTE]
> 当前文档不仅适用于树莓派，香橙派等等其他设备同理

> [!TIP]
> 注意：目前收到很多反馈，都是CAN缓冲区设置太小，导致数据无法及时交换。从而导致Klipper报错。请将CAN缓冲区设置为1024

> [!TIP]
> **FLY-UTOC**介绍等内容在文档[CAN使用](/advanced/can.md)中

## 准备

1. 启动树莓派并确保其连接到网络
2. 使用你熟悉的SSH终端工具连接到树莓派
3. 如果登录到了root账户请切换到普通用户

## 系统配置

> [!TIP]
> 注意：使用SPI转CAN(MCP215)等设备时建议设置bitrate为250000

1. 创建配置文件,复制粘贴到终端并回车

```bash
sudo /bin/sh -c "cat > /etc/network/interfaces.d/can0" << EOF
allow-hotplug can0
iface can0 can static
    bitrate 1000000
    up ifconfig $IFACE txqueuelen 1024
    pre-up ip link set can0 type can bitrate 1000000
    pre-up ip link set can0 txqueuelen 1024
EOF
```

2. 重启设备

```bash
sudo reboot
```

## 连接

* 使用Type-c数据线连接树莓派和**FLY-UTOC**
* 具体接线可查看文档[CAN使用](/advanced/can.md)

## 查看UUID

> [!TIP]
> 网页查看ID只适用于Gemini系列主板，且系统版本≥V2.9

* 执行下面的命令来查找所有已连接的CAN设备

```bash
~/klippy-env/bin/python ~/klipper/scripts/canbus_query.py can0
```

* 出现**Found canbus_uuid=11aa22bb33cc**则查找到设备ID
* 其中**11aa22bb33cc**为设备UUID，可直接填入klipper配置文件
* 如果没有出现ID或报错请认真阅读文档并检查接线

## 其他

* 更多内容请查看文档[CAN使用](/advanced/can.md)
