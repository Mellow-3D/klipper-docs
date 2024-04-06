# 上位机配置

> [!TIP]
>
> 当前文档不仅适用于树莓派，X86上位机等等其他设备同理

> [!TIP]
> 此操作针对非FLY上位机，FLY上位机无需执行这一步操作

## 非FLY上位机检测

* 非FLY上位机的，请注意检查自己烧录的镜像内核是否支持CAN，如果不支持则无法使用CAN。检测方法如下。

在SSH输入：

```bash
sudo modprobe can && echo "您的内核支持CAN" || echo "您的内核不支持CAN"
```

输入以上指令后，如果您的内核支持CAN就会返回：``您的内核支持CAN``；如果不支持就会返回：``您的内核不支持CAN``。

## 非FLY上位机配置

> [!TIP]
> 注意：目前收到很多反馈，都是CAN缓冲区设置太小，导致数据无法及时交换。从而导致Klipper报错。请将CAN缓冲区设置为1024

### 准备

1. 启动树莓派并确保其连接到网络
2. 使用你熟悉的SSH终端工具连接到树莓派
3. 如果登录到了root账户请切换到普通用户

### 系统配置

1. 执行下面的命令安装当前文档所需软件包

```bash
sudo apt update && sudo apt install nano wget -y
```

2. 创建配置文件,复制粘贴到终端并回车

> [!WARNING] 
>
> 如果您的CAN速率为1M，请将：`` bitrate 500000`` 中的``500000``修改为``1000000``

```bash
sudo /bin/sh -c "cat > /etc/network/interfaces.d/can0" << EOF
allow-hotplug can0
iface can0 can static
    bitrate 500000
    up ifconfig \$IFACE txqueuelen 1024
EOF
```

* 重启设备

```bash
sudo reboot
```

### 连接UTOC

* 使用Type-c数据线连接树莓派和**FLY-UTOC**
* 具体接线可查看文档 [连接UTOC](/board/fly_sb2040/sb2040line?id=_110-sb2040连接utoc "点击即可跳转")

### 查看uuid

* 执行下面的命令来查找所有已连接的CAN设备

```bash
~/klippy-env/bin/python ~/klipper/scripts/canbus_query.py can0
```

* 出现``Found canbus_uuid=11aa22bb33cc``则查找到设备ID
* 其中``11aa22bb33cc``为设备UUID，可直接填入klipper配置文件
* 如果没有出现ID或报错请认真阅读文档并检查接线
