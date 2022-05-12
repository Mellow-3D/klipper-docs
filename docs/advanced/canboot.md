# CanBOOT使用

* Klipper已支持CanBOOT，通过CANBUS直接烧录固件
* 好处就是为SHT36/42板更新klipper固件无需再连接USB线
* 无需连接任何多余的线，保持现有的CAN连接的情况下可直接烧录固件

## 构建CanBoot引导固件

1. 进入SSH终端
2. 执行以下命令

```bash
git clone https://github.com/Arksine/CanBoot
cd CanBoot
```

![git](../../images/adv/canboot/1.png ":no-zooom")


```bash
make menuconfig
```

* **Processor model** 选择 **STM32F072**
* **Clock Reference** 选择 **8 MHz crystal** ，默认即可
* **CAN pins** 选择 **Pins PB8(rx) and PB9(tx)**
* **CAN bus speed** CANBUS速率按照你的CAN配置及klipper固件配置，需保存一致。常见为**500000**和**250000**
* 其他配置保持默认即可，无需修改。具体配置见下图
* 这里只能键盘操作，上下键选择菜单，回车键进入菜单或确认，ESC返回上一页
* SHT36/42配置如图

![config](../../images/adv/canboot/2.png ":no-zooom")

* 配置完成后按“Q”键，然后再按“Y”键即可退出并保存

```bash
make
```

![make](../../images/adv/canboot/3.png ":no-zooom")

* 像上图一样出现**Creating hex file out/canboot.bin**即为编译成功

## 烧录CanBoot引导固件

* 为SHT36/42烧录固件详细文档请阅读[SHT固件烧录](/board/fly_sht36_42/flash?id=烧录固件)
* 烧录固件步骤一样，只需将klipper.bin文件替换为canboot.bin文件
* 这里烧录固件只做简要描述

1. 这里演示[SHT固件烧录](/board/fly_sht36_42/flash?id=烧录固件)文档中的方法二，使用klipper上位机烧录固件
2. 连接SHT板的boot跳线帽，并使用USB线连接到klipper上位机

```bash
lsusb | grep 0483:df11
```

* 出现**Bus 007 Device 002: ID 0483:df11 STMicroelectronics STM Device in DFU Mode**内容则表示SHT已进入DFU模式
  
3. 执行下面命令来烧录canboot.bin固件

```bash
sudo dfu-util -a 0 -d 0483:df11 --dfuse-address 0x08000000 -D ~/CanBoot/out/canboot.bin
```

* 出现下图中**File downloaded successfully**则表示烧录成功

![flash](../../images/adv/canboot/4.png ":no-zooom")



## 第一次烧录带有CanBoot的Klipper固件

* 确保你的SHT36/42已正确连接到UTOC或其他CAN设备

1. 拉取最新的klipper

```bash
cd ~/klipper
git pull
```

![git pull](../../images/adv/canboot/5.png ":no-zooom")

2. 为SHT36/42配置最新的klipper固件

```bash
make menuconfig
```

* 这里只能键盘操作，上下键选择菜单，回车键进入菜单或确认，ESC返回上一页
* 与[SHT固件烧录](/board/fly_sht36_42/flash?id=烧录固件)中固件配置只有一个区别，就是 **Bootloader offset** 必须选择 **8KiB bootloader**
* 配置为下图中一样即可

![config](../../images/adv/canboot/6.png ":no-zooom")

* 配置成上图那样后按“Q”键，然后再按“Y”键即可退出并保存

3. 编译klipper固件

```bash
make
```

![make2](../../images/adv/canboot/7.png ":no-zooom")

* 像上图一样出现**Creating hex file out/klipper.bin**即为编译成功

4. 第一次为SHT36/42烧录带有CanBoot的klipper固件不能使用canbus烧录，使用USB烧录

* 连接SHT板的boot跳线帽，并使用USB线连接到klipper上位机

```bash
lsusb | grep 0483:df11
```

* 出现**Bus 007 Device 002: ID 0483:df11 STMicroelectronics STM Device in DFU Mode**内容则表示SHT已进入DFU模式

5. USB烧录Klipper固件

```bash
cd ~/klipper/
sudo dfu-util -a 0 -d 0483:df11 --dfuse-address 0x08002000 -D out/klipper.bin
```

* 出现下图中**File downloaded successfully**则表示烧录成功
  
![flash2](../../images/adv/canboot/8.png ":no-zooom")

6. 取下SHT36/42的boot跳线帽，并断开USB连接
7. 将SHT36/42连接到UTOC或MCP2125等CAN设备
8. 查看SHT36/42的UUID

* 必须使用python3

```bash
python3 lib/canboot/flash_can.py -q
```

* 如下图中出现 **Detected UUID: fea6a45462e9, Application: Klipper** 则正常，(每一块SHT36/42的UUID都不相同)
* 如果没有出现UUID，请检查CAN接线及前面相关步骤是否成功

![uuid](../../images/adv/canboot/9.png ":no-zooom")

9. 通过CANBUS烧录Klipper固件

* 下面命令中的**fea6a45462e9**需要替换为你上一步中得到的UUID

```bash
python3 lib/canboot/flash_can.py -i can0 -f ./out/klipper.bin -u fea6a45462e9
```

![flash3](../../images/adv/canboot/10.png ":no-zooom")

* 像上图中出现**CAN Flash Success**则表示烧录成功

10. 以后如果需要更新klipper看下面操作即可

* 拉取最新的klipper

```bash
cd ~/klipper
git pull
```

* 编译最新的klipper

```bash
make menuconfig
make
```

* 为SHT36/42烧录klipper
* 下面命令中的**fea6a45462e9**需要替换为你查询到的UUID

```bash
python3 lib/canboot/flash_can.py -i can0 -q
python3 lib/canboot/flash_can.py -i can0 -f ./out/klipper.bin -u fea6a45462e9
```