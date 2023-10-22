#  2.固件编译烧录

> [!TIP]
> FLY-D5 需在断电状态下按住 **BOOT键** 后，使用Type-C数据线连接上位机，才能烧录固件

# 1. 固件编译

<!-- tabs:start -->

### **使用SSH编译烧录固件**

编译固件前请确保 [连接到SSH](/board/fly_gemini/host/FLY_π_ssh.md "点击即可跳转")

> [!TIP]
> 固件配置方法请按主板提供的来配置

**固件配置方法**

![MAKE](../../images/adv/make.gif)



```
cd klipper
rm -rf .config
make menuconfig
```

**USB固件配置**

![usb](../../images/boards/fly_d5/usb.png)

**USB桥接CAN固件配置**

* 此方法是桥接工具板的配置，请确保工具板CAN速率与上位机的CAN配置

![usb](../../images/boards/fly_d5/can.png)

* 执行命令下方命令来编译固件

```
make clean
make -j4
```



### **使用FLY-Tools编译烧录固件**

![flash](../../images/boards/fly_tools/flash.gif)

* 支持FLY主板固件编译
* CAN速率可选
* 支持在线烧录，支持DFU,HID,CAN等烧录方式
* 支持Katapult烧录,(原CanBoot)
* 支持下载所有已编译的固件文件

**USB固件配置**

<img src="../../images/boards/fly_d5/tools-usb.png" alt="usb" style="zoom:90%;" />

**USB桥接CAN固件配置**

* 此方法是桥接工具板的配置，请确保工具板CAN速率与上位机的CAN配置

> [!TIP] 
>
>  **CANBUS速率**请根据你的实际使用情况配置为**500000**或**1000000**

<img src="../../images/boards/fly_d5/tools-canbridge.png" alt="usb" style="zoom:90%;" />



<!-- tabs:end -->

# 2. 进入烧录模式

>[!TIP]
>
>方法一：按住boot，给D5主板供电，然后松开BOOT，进入DFU烧录模式
>
>方法二：按住boot，再按下reset按键，松开reset按键，最后松开boot按键

**下图中红色框为boot按键，其右侧为reset按键**

![boot](../../images/boards/fly_d5/boot.png)

# 3.  固件烧录

<!-- tabs:start -->

### **使用上位机烧录**

1. 安装烧录工具

```bash
sudo apt install dfu-util -y
```

2. 使用Type-C数据线将D5主板连接到Linux设备
3. 执行下面的命令查看是否连接成功。

```bash
lsusb
```

![6](../../images/boards/fly_sht36_42/6.png ":no-zooom")

4. 烧录固件(烧录前确保已经编译过固件)

```bash
dfu-util -a 0 -d 0483:df11 --dfuse-address 0x08000000 -D ~/klipper/out/klipper.bin
```

5. 没有报错则烧录成功,如果出现报错请重新检查每个步骤操作

6. 出现下图内容则烧录成功

>[!WARNING]
>
>烧录完成后，需要给D5主板彻底断电一次

![7](../../images/boards/fly_sht36_42/7.png ":no-zooom")

### **使用FLY-Tools烧录**

**图片制作中**

> [!WARNING]
>
> 烧录完成后，需要给D5主板彻底断电一次

<!-- tabs:end -->

