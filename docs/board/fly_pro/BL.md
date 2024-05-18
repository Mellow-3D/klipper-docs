## 本教程提供刷写BL方式

* **PROX10有两个BL，一个katapult可以使用上位机直接更新固件，一个内存卡BL固件可以使用TF卡更新固件**

拉取最新BL

```
cd && git clone https://github.com/FengHua741/FLY_Katapult.git
```

* 进入DFU烧录

* 按着主板的BT0后按右边的RST即可进去DFU模式（需要配图）

<!-- tabs:start -->

### **Klipper上位机烧录**

1. 安装烧录工具

```bash
sudo apt install dfu-util -y
```

3. 执行下面的命令查看是否连接成功,复制蓝色框中的USB ID

```bash
lsusb
```

* 因系统版本问题可能显示其他名字，如果有`0483:df11`则代表进入烧录模式

![6](../../images/boards/fly_sht36_42/6.png ":no-zooom")

4. 烧录固件(烧录前确保已经编译过固件),将下面命令中的**0483:df11**替换为前面复制的USB ID

* **需要烧录katapult固件**

```bash
sudo dfu-util -a 0 -D ~/FLY_Katapult/BL/ProX10/ProX10_USB_katapult.bin --dfuse-address 0x08000000:force:mass-erase -d 0483:df11
```
* **需要烧录内存卡BL固件**

```bash
sudo dfu-util -a 0 -D ~/FLY_Katapult/BL/ProX10/BL.bin --dfuse-address 0x08000000:force:mass-erase -d 0483:df11
```

5. 没有报错则烧录成功,如果出现报错请重新检查每个步骤操作

![7](../../images/boards/fly_super8_pro/dfu.png ":no-zooom")

6. 出现上图内容则烧录成功

> [!TIP]
> 注意：烧录成功后一定要断电重启

### **使用电脑USB烧录**

1. 下载烧录工具[STM32CubeProgrammer](https://cdn.mellow.klipper.cn/Utils/STM32CubeProgrammer.zip)
2. 解压烧录工具到任意目录，进入`STM32CubeProgrammer/bin`目录，双击打开`STM32CubeProgrammer.exe`
3. 下载需要更新的[FLY_Katapult/BL/ProX10](https://github.com/FengHua741/FLY_Katapult/tree/main/BL/ProX10)的BL
4. 使用Type-C数据线将ProX10板连接到电脑，请确保连接前已将拨码往上波（需要配图）
5. STM32CubeProgrammer中选择USB模式，并刷新，连接

![2](../../images/boards/fly_sht36_42/2.png ":no-zooom")

6. 如果没有出现错误弹窗则连接成功
7. 打开固件文件，在弹窗中选择需要烧录的固件

![3](../../images/boards/fly_sht36_42/3.png ":no-zooom")

8. 确认页面有内容，不是00000。然后点击**Download**

![4](../../images/boards/fly_sht36_42/4.png ":no-zooom")

9. 出现图中就是烧录成功

![5](../../images/boards/fly_sht36_42/5.png ":no-zooom")

<!-- tabs:end -->

>[!TIP]
>注意：烧录成功后一定要在断电情况下将拨码改回去否则无法正常使用