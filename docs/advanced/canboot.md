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

* 请注意自己使用的主板型号

<!-- tabs:start -->

#### **FLY-SHT & FLY-SHTV2**

?> ShtV2用户请注意，如果您板的主控型号是GD32F103请将 **Processor model (STM32F072)** 选择更换为 **STM32F103**

![config](../../images/adv/canboot/sht.png ":no-zooom")

#### **SB2040**

?> 如果您的CanBoot选项中没有RP2040请拉取最新的CanBoot

![config](../../images/adv/canboot/sb2040.png ":no-zooom")

<!-- tabs:end -->

* 配置完成后按“Q”键，然后再按“Y”键即可退出并保存

```bash
make
```

![make](../../images/adv/canboot/3.png ":no-zooom")

* 像上图一样出现**Creating hex file out/canboot.bin** 或 **Creating uf2 file out/canboot.uf2** 即为编译成功

## 烧录CanBoot引导固件

?> SB2040烧录最为简单，阅读[SB2040固件烧录](/board/fly_sb2040/flash?id=烧录固件), 烧录固件步骤一样，只需将klipper.uf2文件替换为canboot.uf2文件

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

?> 目前Klipper主分支还未支持RP2040的CanBoot，如果Klipper提交[#5874](https://github.com/Klipper3d/klipper/pull/5874)正式合并到了主分支，请跳过下面的第**2**步

2. 切换rp2040canboot分支

```bash
git checkout work-rp2040canboot-20221103
```

![git pull](../../images/adv/canboot/5.png ":no-zooom")

3. 配置最新的klipper固件

```bash
make menuconfig
```

* 请注意自己使用的主板型号

<!-- tabs:start -->

#### **FLY-SHT & FLY-SHTV2**

?> ShtV2用户请注意，如果您板的主控型号是GD32F103请将 **Processor model (STM32F072)** 选择更换为 **STM32F103**

* 这里只能键盘操作，上下键选择菜单，回车键进入菜单或确认，ESC返回上一页
* 与[SHT固件烧录](/board/fly_sht36_42/flash?id=烧录固件)中固件配置只有一个区别，就是 **Bootloader offset** 必须选择 **8KiB bootloader**
* 配置为下图中一样即可

![config](../../images/adv/canboot/sht-k.png ":no-zooom")

#### **SB2040**

![config](../../images/adv/canboot/sb2040-k.png ":no-zooom")

<!-- tabs:end -->

* 配置成上图那样后按“Q”键，然后再按“Y”键即可退出并保存

4. 编译klipper固件

```bash
make
```

![make2](../../images/adv/canboot/7.png ":no-zooom")

* 像上图一样出现**Creating hex file out/klipper.bin**即为编译成功

?> 如果是SB2040请直接跳过下面的第**5** **6** **7**步，直接从第**9**步接着看

5. 第一次为SHT36/42烧录带有CanBoot的klipper固件不能使用canbus烧录，使用USB烧录

* 连接SHT板的boot跳线帽，并使用USB线连接到klipper上位机

```bash
lsusb | grep 0483:df11
```

* 出现**Bus 007 Device 002: ID 0483:df11 STMicroelectronics STM Device in DFU Mode**内容则表示SHT已进入DFU模式

6. USB烧录Klipper固件

```bash
cd ~/klipper/
sudo dfu-util -a 0 -d 0483:df11 --dfuse-address 0x08002000 -D out/klipper.bin
```

* 出现下图中**File downloaded successfully**则表示烧录成功
  
![flash2](../../images/adv/canboot/8.png ":no-zooom")

7. 取下SHT36/42的boot跳线帽，并断开USB连接
8. 将板连接到UTOC或MCP2125等CAN设备
9. 查看板的UUID

* 必须使用python3

```bash
python3 lib/canboot/flash_can.py -q
```

* 如下图中出现 **Detected UUID: fea6a45462e9, Application: Klipper** 则正常，(每一块SHT36/42的UUID都不相同)
* 如果没有出现UUID，请检查CAN接线及前面相关步骤是否成功

![uuid](../../images/adv/canboot/9.png ":no-zooom")

10. 通过CANBUS烧录Klipper固件

* 下面命令中的**fea6a45462e9**需要替换为你上一步中得到的UUID

```bash
python3 lib/canboot/flash_can.py -i can0 -f ./out/klipper.bin -u fea6a45462e9
```

![flash3](../../images/adv/canboot/10.png ":no-zooom")

* 像上图中出现**CAN Flash Success**则表示烧录成功

11. 以后如果需要更新klipper看下面操作即可

* 切换至主分支并拉取最新的klipper

```bash
cd ~/klipper
git checkout master
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