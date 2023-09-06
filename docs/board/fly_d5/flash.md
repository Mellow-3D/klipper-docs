# 3. 固件编译烧录

> [!TIP]
> FLY-D5 不需使用任何跳线但是需要按着**BOOT键**并且将type-c接入上位机才可以烧录固件

## 1. 固件编译

编译固件前请确保 [连接到SSH](/board/fly_gemini/host/FLY_π_ssh.md "点击即可跳转")

这里只进行简要说明，完整编译步骤请查看：[编译klipper固件](/board/fly_super8/firmware?id=_1-编译klipper固件 "点击即可跳转")。

* 普通USB固件配置

![usb](../../images/boards/fly_d5/usb.png)

* USB桥接CAN固件配置

![usb](../../images/boards/fly_d5/can.png)

* 执行命令```make -j4```来编译固件



## 2. BOOT按键

![boot](../../images/boards/fly_d5/boot.png)

## 3. Klipper上位机烧录

1. 安装烧录工具

```bash
sudo apt install dfu-util -y
```

2. 使用Type-C数据线将Super8 Pro板连接到Linux设备，请确保连接前已安装短接跳线
3. 执行下面的命令查看是否连接成功,复制蓝色框中的USB ID

```bash
lsusb
```

![6](../../images/boards/fly_sht36_42/6.png ":no-zooom")

4. 烧录固件(烧录前确保已经编译过固件),将下面命令中的**0483:df11**替换为前面复制的USB ID

```bash
dfu-util -a 0 -d 0483:df11 --dfuse-address 0x08000000 -D ~/klipper/out/klipper.bin
```

5. 没有报错则烧录成功,如果出现报错请重新检查每个步骤操作

![7](../../images/boards/fly_sht36_42/7.png ":no-zooom")

6. 出现上图内容则烧录成功
