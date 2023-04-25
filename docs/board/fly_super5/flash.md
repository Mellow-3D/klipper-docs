# 固件烧录

## 编译固件

Super5-PRO的Klipper固件配置

* H723

  <img src="../../images/boards/fly_super8_pro/H723_config.png" alt="H723_config" style="zoom:130%;" />

  > 如果找不到`H723`芯片选型，请执行如下命令后重新进入固件编译界面

  ```
  cd ~/klipper
  ```

  ```
  git pull
  ```

* 如何编译固件参考[固件烧录](/introduction/firmware)

## 烧录固件

### USB烧录

?> Super5需要插跳线帽来进入DFU模式，进行USB烧录

![](C:\Users\fenghua\Documents\GitHub\klipper-docs\docs\images\boards\fly_super5\fly_super5-boot.jpg)

### 方式一：电脑USB烧录

1. 下载烧录工具[STM32CubeProgrammer](https://cdn.mellow.klipper.cn/Utils/STM32CubeProgrammer.zip)
2. 解压烧录工具到任意目录，进入`STM32CubeProgrammer/bin`目录，双击打开`STM32CubeProgrammer.exe`
3. 将前面编译好的固件(klipper.bin)复制到电脑任意目录
4. 使用Type-C数据线将Super5板连接到电脑，请确保连接前已安装短接跳线
5. STM32CubeProgrammer中选择USB模式，并刷新，连接

![2](../../images/boards/fly_sht36_42/2.png ":no-zooom")

6. 如果没有出现错误弹窗则连接成功
7. 打开固件文件，在弹窗中选择前面编译完成的固件文件(klipper.bin)

![3](../../images/boards/fly_sht36_42/3.png ":no-zooom")

8. 确认页面有内容，不是00000。然后点击**Download**

![4](../../images/boards/fly_sht36_42/4.png ":no-zooom")

9. 出现图中就是烧录成功

![5](../../images/boards/fly_sht36_42/5.png ":no-zooom")

### 方式二：Klipper上位机烧录

1. 安装烧录工具

```bash
sudo apt install dfu-util -y
```

2. 使用Type-C数据线将Super5板连接到Linux设备，请确保连接前已安装短接跳线
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

?> 注意：烧录成功后一定记得拔下来跳线帽