# 3. 上位机配置

## 3.1 非FLY上位机检测

> [!TIP]
> 此操作针对非FLY上位机，FLY上位机无需执行这一步操作

非FLY上位机的，请注意检查自己烧录的镜像内核是否支持CAN，如果不支持则无法使用CAN。检测方法如下。

在SSH输入：

```
sudo modprobe can && echo "您的内核支持CAN" || echo "您的内核不支持CAN"
```

输入以上指令后，如果您的内核支持CAN就会返回：``您的内核支持CAN``；如果不支持就会返回：``您的内核不支持CAN``。

> [!TIP]
> FLY上位机，FLY已为您完成所有配置工作，您只需确保镜像烧录正确即可。镜像烧录请查看：[系统镜像烧录](/board/fly_pi/mirror/FLY_π_mirror "点击即可跳转")

## 3.2 非FLY上位机配置

> 当前文档不仅适用于树莓派，香橙派等等其他设备同理

> [!TIP]
> 注意：目前收到很多反馈，都是CAN缓冲区设置太小，导致数据无法及时交换。从而导致Klipper报错。请将CAN缓冲区设置为1024

### 3.2.1 准备

1. 启动树莓派并确保其连接到网络
2. 使用你熟悉的SSH终端工具连接到树莓派
3. 如果登录到了root账户请切换到普通用户

### 3.2.2 系统配置

> [!TIP]
> 注意：使用SPI转CAN(MCP215)等设备时建议设置bitrate为250000

1. 执行下面的命令安装当前文档所需软件包

```bash
sudo apt update && sudo apt install nano wget -y
```

2. 创建配置文件,复制粘贴到终端并回车

```bash
sudo /bin/sh -c "cat > /etc/network/interfaces.d/can0" << EOF
allow-hotplug can0
iface can0 can static
    bitrate 500000
    up ifconfig \$IFACE txqueuelen 1024
EOF
```

> [!TIP]
> 测试发现在部分设备中无法开机自动启用CAN，所以建议都执行下面操作

1. 开机自动启用CAN

```bash
sudo wget https://cdn.mellow.klipper.cn/shell/can-enable -O /usr/bin/can-enable > /dev/null 2>&1 && sudo chmod +x /usr/bin/can-enable || echo "The operation failed"
```

```
sudo cat /etc/rc.local | grep "exit 0" > /dev/null || sudo sed -i '$a\exit 0' /etc/rc.local
```

```
sudo sed -i '/^exit\ 0$/i \can-enable -d can0 -b 500000 -t 1024' /etc/rc.local
```

4. 重启设备

```bash
sudo reboot
```

5. USB转CAN模块在树莓派中无法即插即用

* 如果树莓派设备插拔过USB转CAN设备请重启设备或者执行下面的命令
* 确保已完成步骤3

```bash
sudo can-enable -d can0 -b 500000 -t 1024
```

### 3.2.3 连接UTOC

* 使用Type-c数据线连接树莓派和**FLY-UTOC**
* 具体接线可查看文档 [连接UTOC](/board/fly_sb2040/sb2040line?id=_110-sb2040连接utoc "点击即可跳转")

### 3.2.4 查看uuid

* 执行下面的命令来查找所有已连接的CAN设备

```bash
~/klippy-env/bin/python ~/klipper/scripts/canbus_query.py can0
```

* 出现``Found canbus_uuid=11aa22bb33cc``则查找到设备ID
* 其中``11aa22bb33cc``为设备UUID，可直接填入klipper配置文件
* 如果没有出现ID或报错请认真阅读文档并检查接线
