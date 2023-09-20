# 10. 固件编译烧录

> [!TIP]
> FLY-C8 无需使用任何跳线即可烧录固件



## 1. 拨码开关设置

> [!Warning]
> 请注意拨码开关不是跳线，如果想正常使用还是需要拨动拨码
* 拨码开关``1``,``2``打开将下位机与上位机通过内置USB连接

  ![dip1](../../images/boards/fly_c8/dip1.png)

* 拨码``3``,``4``打开将下位机USB连接到板载Type-C端口

  ![dip2](../../images/boards/fly_c8/dip2.png)

* ``1``,``2``为一组，``3``,``4``为一组。两组不可同时打开

## 2. 固件编译

编译固件前请确保 [连接到SSH](/board/fly_gemini/host/FLY_π_ssh.md "点击即可跳转")

> [!TIP]
> 固件配置方法请按主板提供的来配置

**固件配置方法**

![MAKE](../../images/adv/make.gif)

**USB固件配置**

* 普通USB固件配置

![usb2can](../../images/boards/fly_c8/usb.png ":no-zooom")

* USB桥接CAN固件配置
* FLY-C8建议使用Klipper的USB桥接CAN固件，可以省去一个UTOC来通过CAN连接工具板

![usb2can](../../images/boards/fly_c8/usb2can.png ":no-zooom")

* 执行命令```make -j4```来编译固件

## 3. 固件烧录

* 执行下面的命令来添加一键烧录工具，这个命令只执行一次，后续烧录不用

```
curl -kfsSL https://cdn.mellow.klipper.cn/Utils/fly-flash/fly-flash_install.sh | sudo bash -s -- "c8"
```

  > [!TIP]
> 执行下面的命令来自动烧录固件

```bash
sudo fly-flash -d c8 -h -f ~/klipper/out/klipper.bin
```

* 注意：以上命令烧录固件会将``~/klipper/out/klipper.bin``烧录到下位机，请在烧录前编译好固件

> [!Warning]
> 请注意烧录完固件无需执行下方指令

* 进入烧录模式

```bash
sudo fly-flash -d c8 -h
```


* 正常启动MCU

```bash
sudo fly-flash -d c8 -s
```

* 重置MCU

```bash
sudo fly-flash -d c8 -r
```

* 进入DFU

```bash
sudo fly-flash -d c8 -u
```

> [!TIP]
> 烧录完成后无需将插入任何跳线

> [!warning]
> 读取主板ID时，请使用12/24V供电，否则会导致读不到ID！！！

